"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Save, Globe, Bell, Palette, CreditCard, Mail, Smartphone, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { branches } from "@/components/restaurant-menu"

// General Settings Schema
const generalFormSchema = z.object({
  restaurantName: z.string().min(2, { message: "Restaurant name must be at least 2 characters" }),
  tagline: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Please enter your full address" }),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  defaultBranch: z.string(),
  currency: z.string(),
  taxRate: z.coerce.number().min(0).max(100),
  orderPrefix: z.string(),
})

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
})

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
})

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
})

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
}

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
}

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
}

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
}

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Initialize forms
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: defaultGeneralSettings,
  })

  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: defaultAppearanceSettings,
  })

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: defaultNotificationSettings,
  })

  const paymentForm = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: defaultPaymentSettings,
  })

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken")
    const user = localStorage.getItem("adminUser")

    if (!token || !user) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }

    // Load settings from localStorage if available
    const savedGeneralSettings = localStorage.getItem("restaurantGeneralSettings")
    if (savedGeneralSettings) {
      try {
        const parsedSettings = JSON.parse(savedGeneralSettings)
        generalForm.reset(parsedSettings)
      } catch (error) {
        console.error("Error parsing saved general settings:", error)
      }
    }

    const savedAppearanceSettings = localStorage.getItem("restaurantAppearanceSettings")
    if (savedAppearanceSettings) {
      try {
        const parsedSettings = JSON.parse(savedAppearanceSettings)
        appearanceForm.reset(parsedSettings)
      } catch (error) {
        console.error("Error parsing saved appearance settings:", error)
      }
    }

    const savedNotificationSettings = localStorage.getItem("restaurantNotificationSettings")
    if (savedNotificationSettings) {
      try {
        const parsedSettings = JSON.parse(savedNotificationSettings)
        notificationForm.reset(parsedSettings)
      } catch (error) {
        console.error("Error parsing saved notification settings:", error)
      }
    }

    const savedPaymentSettings = localStorage.getItem("restaurantPaymentSettings")
    if (savedPaymentSettings) {
      try {
        const parsedSettings = JSON.parse(savedPaymentSettings)
        paymentForm.reset(parsedSettings)
      } catch (error) {
        console.error("Error parsing saved payment settings:", error)
      }
    }

    setIsLoading(false)
  }, [router, generalForm, appearanceForm, notificationForm, paymentForm])

  const onGeneralSubmit = (data: z.infer<typeof generalFormSchema>) => {
    // Save to localStorage
    localStorage.setItem("restaurantGeneralSettings", JSON.stringify(data))

    toast({
      title: "General settings updated",
      description: "Your general settings have been saved successfully.",
    })
  }

  const onAppearanceSubmit = (data: z.infer<typeof appearanceFormSchema>) => {
    // Save to localStorage
    localStorage.setItem("restaurantAppearanceSettings", JSON.stringify(data))

    toast({
      title: "Appearance settings updated",
      description: "Your appearance settings have been saved successfully.",
    })
  }

  const onNotificationSubmit = (data: z.infer<typeof notificationFormSchema>) => {
    // Save to localStorage
    localStorage.setItem("restaurantNotificationSettings", JSON.stringify(data))

    toast({
      title: "Notification settings updated",
      description: "Your notification settings have been saved successfully.",
    })
  }

  const onPaymentSubmit = (data: z.infer<typeof paymentFormSchema>) => {
    // Save to localStorage
    localStorage.setItem("restaurantPaymentSettings", JSON.stringify(data))

    toast({
      title: "Payment settings updated",
      description: "Your payment settings have been saved successfully.",
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your restaurant settings and preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic information about your restaurant</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form id="general-form" onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-4">
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
                            <Input placeholder="Delicious food delivered to your door" {...field} />
                          </FormControl>
                          <FormDescription>A short slogan for your restaurant</FormDescription>
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
                            <Input placeholder="contact@restaurant.com" {...field} />
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
                          <Textarea placeholder="123 Main St, City, Country" {...field} />
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
                          <Input placeholder="https://restaurant.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={generalForm.control}
                      name="defaultBranch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Branch</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                          <FormDescription>Default branch for new orders</FormDescription>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <Input type="number" step="0.01" min="0" max="100" {...field} />
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
                          <FormDescription>Prefix for order numbers</FormDescription>
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
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how your restaurant app looks</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form
                  id="appearance-form"
                  onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={appearanceForm.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Theme</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="light" id="light" />
                              <Label htmlFor="light">Light</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dark" id="dark" />
                              <Label htmlFor="dark">Dark</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="system" id="system" />
                              <Label htmlFor="system">System</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>Select the theme for your restaurant app</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={appearanceForm.control}
                      name="primaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input type="color" {...field} className="w-12 h-10 p-1" />
                            </FormControl>
                            <Input
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appearanceForm.control}
                      name="accentColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Accent Color</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input type="color" {...field} className="w-12 h-10 p-1" />
                            </FormControl>
                            <Input
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={appearanceForm.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/logo.png" {...field} />
                          </FormControl>
                          <FormDescription>URL to your restaurant logo</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appearanceForm.control}
                      name="favicon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Favicon URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/favicon.ico" {...field} />
                          </FormControl>
                          <FormDescription>URL to your favicon</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={appearanceForm.control}
                      name="dateFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Format</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select date format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                              <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                              <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appearanceForm.control}
                      name="timeFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Format</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time format" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                              <SelectItem value="24h">24-hour</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={appearanceForm.control}
                      name="showBranchSelector"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Show Branch Selector</FormLabel>
                            <FormDescription>Allow customers to select a branch</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={appearanceForm.control}
                      name="showCurrencySymbol"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Show Currency Symbol</FormLabel>
                            <FormDescription>Display currency symbol with prices</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
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
              <Button type="submit" form="appearance-form">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form
                  id="notification-form"
                  onSubmit={notificationForm.handleSubmit(onNotificationSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="flex items-center">
                                <Mail className="mr-2 h-4 w-4" />
                                Email
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="smsNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="flex items-center">
                                <Smartphone className="mr-2 h-4 w-4" />
                                SMS
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="pushNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="flex items-center">
                                <Bell className="mr-2 h-4 w-4" />
                                Push
                              </FormLabel>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={notificationForm.control}
                        name="newOrderNotification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>New Order</FormLabel>
                              <FormDescription>Notify when a new order is placed</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="orderStatusChangeNotification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Order Status Change</FormLabel>
                              <FormDescription>Notify when an order status changes</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="lowStockNotification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Low Stock</FormLabel>
                              <FormDescription>Notify when inventory is running low</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="customerFeedbackNotification"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Customer Feedback</FormLabel>
                              <FormDescription>Notify when customers leave feedback</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={notificationForm.control}
                        name="marketingNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Marketing</FormLabel>
                              <FormDescription>Receive marketing and promotional updates</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={notificationForm.control}
                      name="lowStockThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Low Stock Threshold</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormDescription>Notify when stock falls below this number</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={notificationForm.control}
                      name="notificationSound"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification Sound</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select sound" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="default">Default</SelectItem>
                              <SelectItem value="chime">Chime</SelectItem>
                              <SelectItem value="bell">Bell</SelectItem>
                              <SelectItem value="alert">Alert</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
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
              <Button type="submit" form="notification-form">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and options</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...paymentForm}>
                <form id="payment-form" onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Payment Methods</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={paymentForm.control}
                        name="acceptCash"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Cash on Delivery</FormLabel>
                              <FormDescription>Allow customers to pay with cash</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={paymentForm.control}
                        name="acceptCards"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Credit/Debit Cards</FormLabel>
                              <FormDescription>Allow customers to pay with cards</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Stripe Integration</h3>
                    <FormField
                      control={paymentForm.control}
                      name="stripeEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Enable Stripe</FormLabel>
                            <FormDescription>Process payments through Stripe</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentForm.watch("stripeEnabled") && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={paymentForm.control}
                          name="stripePublicKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stripe Public Key</FormLabel>
                              <FormControl>
                                <Input placeholder="pk_test_..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={paymentForm.control}
                          name="stripeSecretKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stripe Secret Key</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="sk_test_..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">PayPal Integration</h3>
                    <FormField
                      control={paymentForm.control}
                      name="paypalEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Enable PayPal</FormLabel>
                            <FormDescription>Process payments through PayPal</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentForm.watch("paypalEnabled") && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={paymentForm.control}
                          name="paypalClientId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PayPal Client ID</FormLabel>
                              <FormControl>
                                <Input placeholder="Client ID..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={paymentForm.control}
                          name="paypalSecretKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>PayPal Secret Key</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Secret Key..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Order Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={paymentForm.control}
                        name="taxIncluded"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>Tax Included in Price</FormLabel>
                              <FormDescription>Prices shown include tax</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={paymentForm.control}
                        name="deliveryFee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delivery Fee</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" min="0" {...field} />
                            </FormControl>
                            <FormDescription>Standard delivery fee amount</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={paymentForm.control}
                        name="minimumOrderAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Order Amount</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" min="0" {...field} />
                            </FormControl>
                            <FormDescription>Minimum amount required for checkout</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Venezuelan Currency Exchange</h3>
                    <FormField
                      control={paymentForm.control}
                      name="enableVenezuelanBs"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Enable Bolivar (Bs) Pricing</FormLabel>
                            <FormDescription>Show prices in Venezuelan Bolivars (Bs)</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {paymentForm.watch("enableVenezuelanBs") && (
                      <>
                        <div className="rounded-lg border p-4 bg-blue-50">
                          <div className="flex items-start gap-2">
                            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div className="text-sm text-blue-700">
                              <p className="font-medium mb-1">Exchange Rate Information</p>
                              <p>
                                Enter the current exchange rates for USD to Venezuelan Bolivar (Bs). These rates will be
                                used to display prices in Bs alongside USD prices.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={paymentForm.control}
                            name="bcvRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>BCV Official Rate (Bs/$)</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" min="0" placeholder="35.50" {...field} />
                                </FormControl>
                                <FormDescription>Banco Central de Venezuela rate</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={paymentForm.control}
                            name="parallelRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Parallel Market Rate (Bs/$)</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" min="0" placeholder="38.20" {...field} />
                                </FormControl>
                                <FormDescription>Current parallel market rate</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={paymentForm.control}
                            name="customRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Custom Rate (Bs/$)</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" min="0" placeholder="36.00" {...field} />
                                </FormControl>
                                <FormDescription>Your custom exchange rate</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={paymentForm.control}
                          name="preferredRateSource"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Preferred Rate Source</FormLabel>
                              <FormDescription>
                                Select which exchange rate to use for price calculations
                              </FormDescription>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1 mt-2"
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="bcv" id="bcv" />
                                    <Label htmlFor="bcv">BCV Official Rate</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="parallel" id="parallel" />
                                    <Label htmlFor="parallel">Parallel Market Rate</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="custom" id="custom" />
                                    <Label htmlFor="custom">Custom Rate</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" form="payment-form">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

