"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Database } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RestaurantSchedule, {
  defaultSchedule,
} from "@/components/restaurant-schedule";
import { branches } from "@/components/restaurant-menu";
import { defaultStock } from "@/components/stock-management";
import type { Order } from "@/app/admin/orders/page";
import AdminCurrencyDisplay from "@/components/admin-currency-display";

// Mock data for the dashboard
const recentOrders = [
  {
    id: "ORD-5123",
    customer: "John Doe",
    date: "2023-05-15",
    status: "Delivered",
    total: 42.99,
  },
  {
    id: "ORD-5122",
    customer: "Jane Smith",
    date: "2023-05-15",
    status: "Processing",
    total: 36.5,
  },
  {
    id: "ORD-5121",
    customer: "Robert Johnson",
    date: "2023-05-14",
    status: "Delivered",
    total: 28.75,
  },
  {
    id: "ORD-5120",
    customer: "Emily Davis",
    date: "2023-05-14",
    status: "Cancelled",
    total: 52.3,
  },
  {
    id: "ORD-5119",
    customer: "Michael Brown",
    date: "2023-05-13",
    status: "Delivered",
    total: 19.99,
  },
];

const popularItems = [
  {
    id: "3",
    name: "Margherita Pizza",
    category: "Mains",
    orders: 145,
    revenue: 1884.55,
  },
  {
    id: "6",
    name: "Chocolate Cake",
    category: "Desserts",
    orders: 132,
    revenue: 923.68,
  },
  {
    id: "1",
    name: "Garlic Bread",
    category: "Starters",
    orders: 120,
    revenue: 718.8,
  },
  {
    id: "4",
    name: "Spaghetti Bolognese",
    category: "Mains",
    orders: 98,
    revenue: 1469.02,
  },
  {
    id: "9",
    name: "Fresh Juice",
    category: "Drinks",
    orders: 87,
    revenue: 434.13,
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stockAlerts, setStockAlerts] = useState<
    { productName: string; branchName: string; quantity: number }[]
  >([]);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }

    // Load schedule from localStorage if available
    const savedSchedule = localStorage.getItem("restaurantSchedule");
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }

    // Load orders from localStorage if available
    const savedOrders = localStorage.getItem("restaurantOrders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    // Check for low stock items
    const savedStock = localStorage.getItem("restaurantStock");
    if (savedStock) {
      const stock = JSON.parse(savedStock);
      const lowStockItems = stock
        .filter((item: { quantity: number }) => item.quantity <= 5)
        .map(
          (item: {
            productName: string;
            branchId: string;
            quantity: number;
          }) => ({
            productName: item.productName,
            branchName:
              branches.find((b) => b.id === item.branchId)?.name || "Unknown",
            quantity: item.quantity,
          })
        );
      setStockAlerts(lowStockItems);
    } else {
      const lowStockItems = defaultStock
        .filter((item) => item.quantity <= 5)
        .map((item) => ({
          productName: item.productName,
          branchName:
            branches.find((b) => b.id === item.branchId)?.name || "Unknown",
          quantity: item.quantity,
        }));
      setStockAlerts(lowStockItems);
    }

    setIsLoading(false);
  }, [router]);

  // Calculate dashboard metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "confirmed"
  ).length;
  const lowStockCount = stockAlerts.length;

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
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AdminCurrencyDisplay amount={totalRevenue} />
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Items
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockCount}</div>
            <p className="text-xs text-muted-foreground">
              Items need restocking
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <RestaurantSchedule schedule={schedule} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {stockAlerts.length === 0 ? (
              <p className="text-center py-6 text-muted-foreground">
                No low stock alerts
              </p>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Branch</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stockAlerts.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {item.productName}
                        </TableCell>
                        <TableCell>{item.branchName}</TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`font-medium ${
                              item.quantity <= 2
                                ? "text-red-500"
                                : "text-yellow-500"
                            }`}
                          >
                            {item.quantity}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="products">Popular Items</TabsTrigger>
          <TabsTrigger value="branches">Branch Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="orders" className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/orders")}
            >
              View All
            </Button>
          </div>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <AdminCurrencyDisplay amount={order.total} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="products" className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Popular Items</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {popularItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.orders}</TableCell>
                    <TableCell className="text-right">
                      <AdminCurrencyDisplay amount={item.revenue} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="branches" className="border rounded-md p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Branch Performance</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Branch</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches.map((branch) => (
                  <TableRow key={branch.id}>
                    <TableCell className="font-medium">{branch.name}</TableCell>
                    <TableCell className="text-right">
                      {
                        orders.filter((order) => order.branchId === branch.id)
                          .length
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <AdminCurrencyDisplay
                        amount={orders
                          .filter((order) => order.branchId === branch.id)
                          .reduce((sum, order) => sum + order.total, 0)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
