"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Copy } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  defaultSchedule,
  type BranchSchedule,
} from "@/components/restaurant-schedule";
import { branches } from "@/components/restaurant-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const formSchema = z.object({
  branchId: z.string(),
  schedule: z.array(
    z.object({
      day: z.string(),
      openTime: z
        .string()
        .regex(timeRegex, { message: "Must be in 24h format (HH:MM)" }),
      closeTime: z
        .string()
        .regex(timeRegex, { message: "Must be in 24h format (HH:MM)" }),
      isClosed: z.boolean().default(false),
    })
  ),
});

export default function ScheduleManagement() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [branchSchedules, setBranchSchedules] = useState<BranchSchedule[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("branch");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branchId: branches[0]?.id || "",
      schedule: [],
    },
  });

  const watchBranchId = form.watch("branchId");

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }

    // Load saved schedules or initialize with defaults
    const savedSchedules = localStorage.getItem("branchSchedules");
    let schedules: BranchSchedule[] = [];

    if (savedSchedules) {
      try {
        schedules = JSON.parse(savedSchedules);
      } catch (error) {
        console.error("Error parsing saved schedules:", error);
        // Initialize with default schedules for all branches
        schedules = branches.map((branch) => ({
          branchId: branch.id,
          schedule: [...defaultSchedule], // Create a copy of the default schedule
        }));
      }
    } else {
      // Initialize with default schedules for all branches
      schedules = branches.map((branch) => ({
        branchId: branch.id,
        schedule: [...defaultSchedule], // Create a copy of the default schedule
      }));
    }

    setBranchSchedules(schedules);

    // Set the form with the schedule for the first branch
    if (schedules.length > 0 && branches.length > 0) {
      const firstBranchId = branches[0].id;
      const firstBranchSchedule = schedules.find(
        (s) => s.branchId === firstBranchId
      );

      if (firstBranchSchedule) {
        form.reset({
          branchId: firstBranchId,
          schedule: firstBranchSchedule.schedule,
        });
      }
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, form.reset]);

  // When branch selection changes, update the form with that branch's schedule
  useEffect(() => {
    if (!watchBranchId || branchSchedules.length === 0) return;

    const selectedBranchSchedule = branchSchedules.find(
      (s) => s.branchId === watchBranchId
    );

    if (selectedBranchSchedule) {
      form.setValue("schedule", selectedBranchSchedule.schedule);
    } else {
      // If no schedule exists for this branch, create one with defaults
      form.setValue("schedule", [...defaultSchedule]);
    }
  }, [watchBranchId, branchSchedules, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Update the branch schedules array
    const updatedSchedules = [...branchSchedules];
    const existingIndex = updatedSchedules.findIndex(
      (s) => s.branchId === values.branchId
    );

    if (existingIndex >= 0) {
      updatedSchedules[existingIndex] = {
        branchId: values.branchId,
        schedule: values.schedule,
      };
    } else {
      updatedSchedules.push({
        branchId: values.branchId,
        schedule: values.schedule,
      });
    }

    // Save updated schedules to localStorage
    localStorage.setItem("branchSchedules", JSON.stringify(updatedSchedules));
    setBranchSchedules(updatedSchedules);

    toast({
      title: "Schedule updated",
      description: `The schedule for ${
        branches.find((b) => b.id === values.branchId)?.name
      } has been updated successfully.`,
    });

    setIsLoading(false);
  };

  const applyToAllBranches = () => {
    if (!watchBranchId) return;

    const currentSchedule = form.getValues("schedule");
    const updatedSchedules = branches.map((branch) => ({
      branchId: branch.id,
      schedule: [...currentSchedule], // Create a copy of the current schedule
    }));

    setBranchSchedules(updatedSchedules);
    localStorage.setItem("branchSchedules", JSON.stringify(updatedSchedules));

    toast({
      title: "Schedule applied to all branches",
      description: "The current schedule has been applied to all branches.",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Schedule Management
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={applyToAllBranches}
            disabled={isLoading}
          >
            <Copy className="mr-2 h-4 w-4" />
            Apply to All Branches
          </Button>
          <Button
            onClick={() => form.handleSubmit(onSubmit)()}
            disabled={isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="branch">Branch Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="branch">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Branch Hours of Operation</CardTitle>
                  <CardDescription>
                    Set your restaurant&apos;s opening hours for each branch.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="branchId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Branch</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a branch" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {branches.map((branch) => (
                              <SelectItem key={branch.id} value={branch.id}>
                                {branch.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the branch to edit its schedule
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  <Alert>
                    <AlertDescription>
                      You are editing the schedule for{" "}
                      {branches.find((b) => b.id === watchBranchId)?.name}. To
                      apply this schedule to all branches, click &quot;Apply to
                      All Branches&quot; after making your changes.
                    </AlertDescription>
                  </Alert>

                  {form.watch("schedule").map((day, index) => (
                    <div
                      key={day.day}
                      className="grid gap-4 md:grid-cols-4 items-center"
                    >
                      <div className="font-medium">{day.day}</div>

                      <FormField
                        control={form.control}
                        name={`schedule.${index}.isClosed`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Closed</FormLabel>
                              <FormDescription>
                                Restaurant is closed on this day
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div
                        className={
                          form.watch(`schedule.${index}.isClosed`)
                            ? "opacity-50"
                            : ""
                        }
                      >
                        <FormField
                          control={form.control}
                          name={`schedule.${index}.openTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Opening Time</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="09:00"
                                  disabled={form.watch(
                                    `schedule.${index}.isClosed`
                                  )}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div
                        className={
                          form.watch(`schedule.${index}.isClosed`)
                            ? "opacity-50"
                            : ""
                        }
                      >
                        <FormField
                          control={form.control}
                          name={`schedule.${index}.closeTime`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Closing Time</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="22:00"
                                  disabled={form.watch(
                                    `schedule.${index}.isClosed`
                                  )}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
