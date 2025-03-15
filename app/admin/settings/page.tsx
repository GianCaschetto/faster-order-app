"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Save,
  Globe,
  Bell,
  Palette,
  CreditCard,
  Info,
  MessageSquare,
  Plus,
  Trash,
  Edit,
  Check,
  X,
} from "lucide-react";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  defaultBranches,
  getBranches,
  type Branch,
} from "@/components/restaurant-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// General Settings Schema
const generalFormSchema = z.object({
  restaurantName: z
    .string()
    .min(2, { message: "Restaurant name must be at least 2 characters" }),
  tagline: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Please enter your full address" }),
  website: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  defaultBranch: z.string(),
  currency: z.string(),
  taxRate: z.coerce.number().min(0).max(100),
  orderPrefix: z.string(),
});

// Branch Form Schema
const branchFormSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(2, { message: "Branch name must be at least 2 characters" }),
  address: z.string().min(5, { message: "Please enter a valid address" }),
});

// Appearance Settings Schema
const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  primaryColor: z.string(),
  accentColor: z.string(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  showBranchSelector: z.boolean(),
  showCurrencySymbol: z.boolean(),
  dateFormat: z.string(),
  timeFormat: z.enum(["12h", "24h"]),
});

// Notification Settings Schema
const notificationFormSchema = z.object({
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  newOrderNotification: z.boolean(),
  orderStatusChangeNotification: z.boolean(),
  lowStockNotification: z.boolean(),
  lowStockThreshold: z.coerce.number().min(1),
  customerFeedbackNotification: z.boolean(),
  marketingNotifications: z.boolean(),
  notificationSound: z.string(),
});

// Payment Settings Schema
const paymentFormSchema = z.object({
  acceptCash: z.boolean(),
  acceptCards: z.boolean(),
  stripeEnabled: z.boolean(),
  stripePublicKey: z.string().optional(),
  stripeSecretKey: z.string().optional(),
  paypalEnabled: z.boolean(),
  paypalClientId: z.string().optional(),
  paypalSecretKey: z.string().optional(),
  taxIncluded: z.boolean(),
  deliveryFee: z.coerce.number().min(0),
  minimumOrderAmount: z.coerce.number().min(0),
  // Add these new fields for Venezuelan currency exchange rates
  enableVenezuelanBs: z.boolean().default(false),
  bcvRate: z.coerce.number().min(0).optional(),
  parallelRate: z.coerce.number().min(0).optional(),
  customRate: z.coerce.number().min(0).optional(),
  preferredRateSource: z.enum(["bcv", "parallel", "custom"]).default("bcv"),
});

// WhatsApp Settings Schema
const whatsAppFormSchema = z.object({
  enabled: z.boolean(),
  defaultPhoneNumber: z
    .string()
    .min(10, { message: "Please enter a valid WhatsApp number" }),
  messageTemplate: z
    .string()
    .min(10, { message: "Template must be at least 10 characters" }),
  showWhatsAppButton: z.boolean(),
  branchPhoneNumbers: z
    .array(
      z.object({
        branchId: z.string(),
        phoneNumber: z
          .string()
          .min(10, { message: "Please enter a valid WhatsApp number" }),
      })
    )
    .optional(),
});

// Default values
const defaultGeneralSettings = {
  restaurantName: "Restaurant Name",
  tagline: "Delicious food delivered to your door",
  email: "contact@restaurant.com",
  phone: "(123) 456-7890",
  address: "123 Main St, City, Country",
  website: "https://restaurant.com",
  defaultBranch: "1",
  currency: "USD",
  taxRate: 8.5,
  orderPrefix: "ORD-",
};

const defaultAppearanceSettings = {
  theme: "system" as const,
  primaryColor: "#0f172a",
  accentColor: "#3b82f6",
  logo: "",
  favicon: "",
  showBranchSelector: true,
  showCurrencySymbol: true,
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h" as const,
};

const defaultNotificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  newOrderNotification: true,
  orderStatusChangeNotification: true,
  lowStockNotification: true,
  lowStockThreshold: 5,
  customerFeedbackNotification: true,
  marketingNotifications: false,
  notificationSound: "default",
};

const defaultPaymentSettings = {
  acceptCash: true,
  acceptCards: true,
  stripeEnabled: false,
  stripePublicKey: "",
  stripeSecretKey: "",
  paypalEnabled: false,
  paypalClientId: "",
  paypalSecretKey: "",
  taxIncluded: false,
  deliveryFee: 3.99,
  minimumOrderAmount: 10,
  // Add default values for Venezuelan currency exchange rates
  enableVenezuelanBs: false,
  bcvRate: 35.5,
  parallelRate: 38.2,
  customRate: 36.0,
  preferredRateSource: "bcv" as const,
};

const defaultWhatsAppSettings = {
  enabled: true,
  defaultPhoneNumber: "5551234567",
  messageTemplate:
    "🍽️ *NUEVO PEDIDO* 🍽️\n\n*Número de Orden:* {order-number}\n*Cliente:* {customer-name}\n*Teléfono:* {customer-phone}\n*Dirección:* {customer-address}\n\n*DETALLES DEL PEDIDO:*\n{order-items}\n\n*Subtotal:* {subt  {customer-address}\n\n*DETALLES DEL PEDIDO:*\n{order-items}\n\n*Subtotal:* {subtotal}\n*Envío:* {delivery-fee}\n*Total:* {total}\n\n*Sucursal:* {branch-name}\n*Hora estimada de entrega:* {estimated-delivery}",
  showWhatsAppButton: true,
  branchPhoneNumbers: defaultBranches.map((branch) => ({
    branchId: branch.id,
    phoneNumber: "5551234567",
  })),
};

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [previewMessage, setPreviewMessage] = useState("");
  const [branches, setBranches] = useState<Branch[]>(getBranches());
  const [isAddBranchDialogOpen, setIsAddBranchDialogOpen] = useState(false);
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [editBranchName, setEditBranchName] = useState("");
  const [editBranchAddress, setEditBranchAddress] = useState("");

  // Initialize forms
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: defaultGeneralSettings,
  });

  const branchForm = useForm<z.infer<typeof branchFormSchema>>({
    resolver: zodResolver(branchFormSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: defaultAppearanceSettings,
  });

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: defaultNotificationSettings,
  });

  const paymentForm = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: defaultPaymentSettings,
  });

  const whatsAppForm = useForm<z.infer<typeof whatsAppFormSchema>>({
    resolver: zodResolver(whatsAppFormSchema),
    defaultValues: defaultWhatsAppSettings,
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

    // Load settings from localStorage if available
    const savedGeneralSettings = localStorage.getItem(
      "restaurantGeneralSettings"
    );
    if (savedGeneralSettings) {
      try {
        const parsedSettings = JSON.parse(savedGeneralSettings);
        generalForm.reset(parsedSettings);
      } catch (error) {
        console.error("Error parsing saved general settings:", error);
      }
    }

    const savedAppearanceSettings = localStorage.getItem(
      "restaurantAppearanceSettings"
    );
    if (savedAppearanceSettings) {
      try {
        const parsedSettings = JSON.parse(savedAppearanceSettings);
        appearanceForm.reset(parsedSettings);
      } catch (error) {
        console.error("Error parsing saved appearance settings:", error);
      }
    }

    const savedNotificationSettings = localStorage.getItem(
      "restaurantNotificationSettings"
    );
    if (savedNotificationSettings) {
      try {
        const parsedSettings = JSON.parse(savedNotificationSettings);
        notificationForm.reset(parsedSettings);
      } catch (error) {
        console.error("Error parsing saved notification settings:", error);
      }
    }

    const savedPaymentSettings = localStorage.getItem(
      "restaurantPaymentSettings"
    );
    if (savedPaymentSettings) {
      try {
        const parsedSettings = JSON.parse(savedPaymentSettings);
        paymentForm.reset(parsedSettings);
      } catch (error) {
        console.error("Error parsing saved payment settings:", error);
      }
    }

    const savedWhatsAppSettings = localStorage.getItem(
      "restaurantWhatsAppSettings"
    );
    if (savedWhatsAppSettings) {
      try {
        const parsedSettings = JSON.parse(savedWhatsAppSettings);
        whatsAppForm.reset(parsedSettings);
      } catch (error) {
        console.error("Error parsing saved WhatsApp settings:", error);
      }
    }

    // Load branches
    setBranches(getBranches());

    setIsLoading(false);
  }, [
    router,
    generalForm,
    appearanceForm,
    notificationForm,
    paymentForm,
    whatsAppForm,
  ]);

  // Generate preview message when template changes
  useEffect(() => {
    const template = whatsAppForm.watch("messageTemplate");
    if (template) {
      // Create sample data
      const sampleData = {
        orderNumber: "ORD-12345",
        customerName: "Juan Pérez",
        customerPhone: "+58 412 123 4567",
        customerEmail: "juan@example.com",
        customerAddress: "Calle Principal #123, Caracas",
        items: [
          {
            name: "Hamburguesa Clásica",
            quantity: 2,
            price: 8.99,
            extras: ["1x Queso extra", "1x Bacon"],
          },
          {
            name: "Papas Fritas Grandes",
            quantity: 1,
            price: 3.99,
            extras: [],
          },
        ],
        subtotal: 21.97,
        deliveryFee: 3.99,
        total: 25.96,
        branchName: "Sucursal Centro",
        branchAddress: "Av. Libertador #456",
        estimatedDelivery: "7:30 PM",
      };

      // Format order items
      const formattedItems = sampleData.items
        .map((item) => {
          const extrasText =
            item.extras.length > 0
              ? `\n   - Extras: ${item.extras.join(", ")}`
              : "";
          return `• ${item.quantity}x ${item.name} - ${new Intl.NumberFormat(
            "es-ES",
            { style: "currency", currency: "USD" }
          ).format(item.price * item.quantity)}${extrasText}`;
        })
        .join("\n");

      // Replace placeholders in the template
      const message = template
        .replace("{order-number}", sampleData.orderNumber)
        .replace("{customer-name}", sampleData.customerName)
        .replace("{customer-phone}", sampleData.customerPhone)
        .replace("{customer-email}", sampleData.customerEmail)
        .replace("{customer-address}", sampleData.customerAddress)
        .replace("{order-items}", formattedItems)
        .replace(
          "{subtotal}",
          new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "USD",
          }).format(sampleData.subtotal)
        )
        .replace(
          "{delivery-fee}",
          new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "USD",
          }).format(sampleData.deliveryFee)
        )
        .replace(
          "{total}",
          new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "USD",
          }).format(sampleData.total)
        )
        .replace("{branch-name}", sampleData.branchName)
        .replace("{branch-address}", sampleData.branchAddress)
        .replace("{estimated-delivery}", sampleData.estimatedDelivery);

      setPreviewMessage(message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whatsAppForm.watch("messageTemplate")]);

  const onGeneralSubmit = (data: z.infer<typeof generalFormSchema>) => {
    // Save to localStorage
    localStorage.setItem("restaurantGeneralSettings", JSON.stringify(data));

    toast({
      title: "General settings updated",
      description: "Your general settings have been saved successfully.",
    });
  };

  // const onAppearanceSubmit = (data: z.infer<typeof appearanceFormSchema>) => {
  //   // Save to localStorage
  //   localStorage.setItem("restaurantAppearanceSettings", JSON.stringify(data));

  //   toast({
  //     title: "Appearance settings updated",
  //     description: "Your appearance settings have been saved successfully.",
  //   });
  // };

  // const onNotificationSubmit = (
  //   data: z.infer<typeof notificationFormSchema>
  // ) => {
  //   // Save to localStorage
  //   localStorage.setItem(
  //     "restaurantNotificationSettings",
  //     JSON.stringify(data)
  //   );

  //   toast({
  //     title: "Notification settings updated",
  //     description: "Your notification settings have been saved successfully.",
  //   });
  // };

  // const onPaymentSubmit = (data: z.infer<typeof paymentFormSchema>) => {
  //   // Save to localStorage
  //   localStorage.setItem("restaurantPaymentSettings", JSON.stringify(data));

  //   toast({
  //     title: "Payment settings updated",
  //     description: "Your payment settings have been saved successfully.",
  //   });
  // };

  const onWhatsAppSubmit = (data: z.infer<typeof whatsAppFormSchema>) => {
    // Update branch phone numbers based on current branches
    const updatedBranchPhoneNumbers = branches.map((branch) => {
      const existingConfig = data.branchPhoneNumbers?.find(
        (b) => b.branchId === branch.id
      );
      return {
        branchId: branch.id,
        phoneNumber: existingConfig?.phoneNumber || data.defaultPhoneNumber,
      };
    });

    const updatedData = {
      ...data,
      branchPhoneNumbers: updatedBranchPhoneNumbers,
    };

    // Save to localStorage
    localStorage.setItem(
      "restaurantWhatsAppSettings",
      JSON.stringify(updatedData)
    );

    toast({
      title: "WhatsApp settings updated",
      description: "Your WhatsApp settings have been saved successfully.",
    });
  };

  const onAddBranchSubmit = (data: z.infer<typeof branchFormSchema>) => {
    const newBranch: Branch = {
      id: Date.now().toString(), // Generate a unique ID
      name: data.name,
      address: data.address,
    };

    const updatedBranches = [...branches, newBranch];

    // Save to localStorage
    localStorage.setItem("restaurantBranches", JSON.stringify(updatedBranches));

    // Update state
    setBranches(updatedBranches);

    // Reset form
    branchForm.reset({
      name: "",
      address: "",
    });

    // Close dialog
    setIsAddBranchDialogOpen(false);

    // Show success message
    toast({
      title: "Branch added",
      description: `Branch "${data.name}" has been added successfully.`,
    });

    // Trigger a storage event to notify other components
    window.dispatchEvent(new Event("storage"));
  };

  const startEditBranch = (branch: Branch) => {
    setEditingBranchId(branch.id);
    setEditBranchName(branch.name);
    setEditBranchAddress(branch.address);
  };

  const cancelEditBranch = () => {
    setEditingBranchId(null);
    setEditBranchName("");
    setEditBranchAddress("");
  };

  const saveEditBranch = (branchId: string) => {
    if (
      editBranchName.trim().length < 2 ||
      editBranchAddress.trim().length < 5
    ) {
      toast({
        title: "Invalid input",
        description:
          "Branch name must be at least 2 characters and address must be at least 5 characters.",
        variant: "destructive",
      });
      return;
    }

    const updatedBranches = branches.map((branch) =>
      branch.id === branchId
        ? { ...branch, name: editBranchName, address: editBranchAddress }
        : branch
    );

    // Save to localStorage
    localStorage.setItem("restaurantBranches", JSON.stringify(updatedBranches));

    // Update state
    setBranches(updatedBranches);

    // Reset editing state
    setEditingBranchId(null);
    setEditBranchName("");
    setEditBranchAddress("");

    // Show success message
    toast({
      title: "Branch updated",
      description: `Branch "${editBranchName}" has been updated successfully.`,
    });

    // Trigger a storage event to notify other components
    window.dispatchEvent(new Event("storage"));
  };

  const deleteBranch = (branchId: string) => {
    // Don't allow deleting if there's only one branch
    if (branches.length <= 1) {
      toast({
        title: "Cannot delete branch",
        description: "You must have at least one branch.",
        variant: "destructive",
      });
      return;
    }

    const branchToDelete = branches.find((b) => b.id === branchId);
    if (!branchToDelete) return;

    const updatedBranches = branches.filter((branch) => branch.id !== branchId);

    // Save to localStorage
    localStorage.setItem("restaurantBranches", JSON.stringify(updatedBranches));

    // Update state
    setBranches(updatedBranches);

    // Show success message
    toast({
      title: "Branch deleted",
      description: `Branch "${branchToDelete.name}" has been deleted.`,
    });

    // Trigger a storage event to notify other components
    window.dispatchEvent(new Event("storage"));
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
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your restaurant settings and preferences
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic information about your restaurant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form
                  id="general-form"
                  onSubmit={generalForm.handleSubmit(onGeneralSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="restaurantName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Restaurant Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Restaurant Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="tagline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tagline</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Delicious food delivered to your door"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            A short slogan for your restaurant
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="contact@restaurant.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={generalForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="123 Main St, City, Country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generalForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://restaurant.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Branches</h3>
                      <Dialog
                        open={isAddBranchDialogOpen}
                        onOpenChange={setIsAddBranchDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex items-center gap-1">
                            <Plus className="h-4 w-4" />
                            <span>Add Branch</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Branch</DialogTitle>
                            <DialogDescription>
                              Add a new branch location for your restaurant.
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...branchForm}>
                            <form
                              id="branch-form"
                              onSubmit={branchForm.handleSubmit(
                                onAddBranchSubmit
                              )}
                              className="space-y-4"
                            >
                              <FormField
                                control={branchForm.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Branch Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="Downtown"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={branchForm.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Branch Address</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="123 Main St, Downtown"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsAddBranchDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" form="branch-form">
                              Add Branch
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="border rounded-md">
                      <div className="grid grid-cols-12 gap-2 p-3 font-medium border-b bg-muted/50">
                        <div className="col-span-4">Name</div>
                        <div className="col-span-6">Address</div>
                        <div className="col-span-2 text-right">Actions</div>
                      </div>
                      <div className="divide-y">
                        {branches.map((branch) => (
                          <div
                            key={branch.id}
                            className="grid grid-cols-12 gap-2 p-3 items-center"
                          >
                            {editingBranchId === branch.id ? (
                              <>
                                <div className="col-span-4">
                                  <Input
                                    value={editBranchName}
                                    onChange={(e) =>
                                      setEditBranchName(e.target.value)
                                    }
                                    placeholder="Branch name"
                                  />
                                </div>
                                <div className="col-span-6">
                                  <Input
                                    value={editBranchAddress}
                                    onChange={(e) =>
                                      setEditBranchAddress(e.target.value)
                                    }
                                    placeholder="Branch address"
                                  />
                                </div>
                                <div className="col-span-2 flex justify-end gap-1">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => saveEditBranch(branch.id)}
                                    className="h-8 w-8"
                                  >
                                    <Check className="h-4 w-4 text-green-600" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={cancelEditBranch}
                                    className="h-8 w-8"
                                  >
                                    <X className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="col-span-4">{branch.name}</div>
                                <div className="col-span-6 text-muted-foreground">
                                  {branch.address}
                                </div>
                                <div className="col-span-2 flex justify-end gap-1">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => startEditBranch(branch)}
                                    className="h-8 w-8"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => deleteBranch(branch.id)}
                                    className="h-8 w-8"
                                    disabled={branches.length <= 1}
                                  >
                                    <Trash className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="defaultBranch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Branch</FormLabel>
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
                            Default branch for new orders
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USD">USD ($)</SelectItem>
                              <SelectItem value="EUR">EUR (€)</SelectItem>
                              <SelectItem value="GBP">GBP (£)</SelectItem>
                              <SelectItem value="CAD">CAD (C$)</SelectItem>
                              <SelectItem value="AUD">AUD (A$)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="taxRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Rate (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              min="0"
                              max="100"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="orderPrefix"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order ID Prefix</FormLabel>
                          <FormControl>
                            <Input placeholder="ORD-" {...field} />
                          </FormControl>
                          <FormDescription>
                            Prefix for order numbers
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" form="general-form">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4 mt-4">
          {/* Appearance settings content - omitted for brevity */}
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          {/* Notification settings content - omitted for brevity */}
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4 mt-4">
          {/* Payment settings content - omitted for brevity */}
        </TabsContent>

        {/* WhatsApp Settings */}
        <TabsContent value="whatsapp" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Integration</CardTitle>
              <CardDescription>
                Configure WhatsApp messaging for order sharing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...whatsAppForm}>
                <form
                  id="whatsapp-form"
                  onSubmit={whatsAppForm.handleSubmit(onWhatsAppSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={whatsAppForm.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Enable WhatsApp Integration</FormLabel>
                          <FormDescription>
                            Allow customers to share orders via WhatsApp
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {whatsAppForm.watch("enabled") && (
                    <>
                      <FormField
                        control={whatsAppForm.control}
                        name="defaultPhoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default WhatsApp Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="5551234567" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter your default WhatsApp number with country
                              code, without + or spaces (e.g., 5551234567)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">
                          Branch-Specific Phone Numbers
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Configure different WhatsApp numbers for each branch
                        </p>

                        <div className="space-y-4 mt-2">
                          {branches.map((branch) => {
                            // Find the branch phone number in the form data
                            const branchPhoneNumbers =
                              whatsAppForm.watch("branchPhoneNumbers") || [];
                            const branchConfig = branchPhoneNumbers.find(
                              (b) => b.branchId === branch.id
                            );
                            const phoneNumber = branchConfig?.phoneNumber || "";

                            return (
                              <div
                                key={branch.id}
                                className="flex flex-col sm:flex-row gap-2 items-start sm:items-center p-3 border rounded-md"
                              >
                                <div className="font-medium min-w-[150px]">
                                  {branch.name}
                                </div>
                                <Input
                                  placeholder="WhatsApp number"
                                  value={phoneNumber}
                                  onChange={(e) => {
                                    const newBranchPhoneNumbers = [
                                      ...branchPhoneNumbers,
                                    ];
                                    const existingIndex =
                                      newBranchPhoneNumbers.findIndex(
                                        (b) => b.branchId === branch.id
                                      );

                                    if (existingIndex >= 0) {
                                      newBranchPhoneNumbers[
                                        existingIndex
                                      ].phoneNumber = e.target.value;
                                    } else {
                                      newBranchPhoneNumbers.push({
                                        branchId: branch.id,
                                        phoneNumber: e.target.value,
                                      });
                                    }

                                    whatsAppForm.setValue(
                                      "branchPhoneNumbers",
                                      newBranchPhoneNumbers
                                    );
                                  }}
                                  className="flex-1"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <FormField
                        control={whatsAppForm.control}
                        name="showWhatsAppButton"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Show WhatsApp Button</FormLabel>
                              <FormDescription>
                                Display WhatsApp sharing button on order
                                confirmation
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">
                          Message Template
                        </h3>
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertTitle>Available Placeholders</AlertTitle>
                          <AlertDescription>
                            <p className="mb-2">
                              Use these placeholders in your template:
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                              <div>
                                <code>{"{order-number}"}</code> - Order ID
                              </div>
                              <div>
                                <code>{"{customer-name}"}</code> - Customer name
                              </div>
                              <div>
                                <code>{"{customer-phone}"}</code> - Customer
                                phone
                              </div>
                              <div>
                                <code>{"{customer-email}"}</code> - Customer
                                email
                              </div>
                              <div>
                                <code>{"{customer-address}"}</code> - Delivery
                                address
                              </div>
                              <div>
                                <code>{"{order-items}"}</code> - List of ordered
                                items
                              </div>
                              <div>
                                <code>{"{subtotal}"}</code> - Order subtotal
                              </div>
                              <div>
                                <code>{"{delivery-fee}"}</code> - Delivery fee
                              </div>
                              <div>
                                <code>{"{total}"}</code> - Total amount
                              </div>
                              <div>
                                <code>{"{branch-name}"}</code> - Restaurant
                                branch
                              </div>
                              <div>
                                <code>{"{branch-address}"}</code> - Branch
                                address
                              </div>
                              <div>
                                <code>{"{estimated-delivery}"}</code> - Delivery
                                time
                              </div>
                            </div>
                          </AlertDescription>
                        </Alert>

                        <FormField
                          control={whatsAppForm.control}
                          name="messageTemplate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message Template</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter your WhatsApp message template"
                                  className="font-mono text-sm h-40"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Customize the message that will be sent to
                                WhatsApp
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            Message Preview
                          </h4>
                          <div className="bg-green-50 p-4 rounded-md border border-green-200 whitespace-pre-wrap font-mono text-sm max-h-60 overflow-y-auto">
                            {previewMessage}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" form="whatsapp-form">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
