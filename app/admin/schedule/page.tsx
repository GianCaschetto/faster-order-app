"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
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
import { defaultSchedule } from "@/components/restaurant-schedule";

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const formSchema = z.object({
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schedule: [],
    },
  });

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }

    // Load saved schedule or use default
    const savedSchedule = localStorage.getItem("restaurantSchedule");
    if (savedSchedule) {
      try {
        const parsedSchedule = JSON.parse(savedSchedule);
        form.reset({ schedule: parsedSchedule });
      } catch (error) {
        console.error("Error parsing saved schedule:", error);
        form.reset({ schedule: defaultSchedule });
      }
    } else {
      form.reset({ schedule: defaultSchedule });
    }

    setIsLoading(false);
  }, [router, form.reset]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Save schedule to localStorage (in a real app, this would be an API call)
    localStorage.setItem("restaurantSchedule", JSON.stringify(values.schedule));

    toast({
      title: "Schedule updated",
      description: "The restaurant schedule has been updated successfully.",
    });

    setIsLoading(false);
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
        <Button
          onClick={() => form.handleSubmit(onSubmit)()}
          disabled={isLoading}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hours of Operation</CardTitle>
              <CardDescription>
                Set your restaurant&apos;s opening hours for each day of the
                week.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
    </div>
  );
}
