/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  CreditCard,
  DollarSign,
  Download,
  ShoppingBag,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockOrders } from "@/lib/mock-data";
import { mockCustomers } from "@/lib/mock-data";
import { branches } from "@/components/restaurant-menu";
import { products } from "@/lib/mock-data";

// Helper function to format currency
const formatCurrency = (value: number) => {
  return `$${value.toFixed(2)}`;
};

// Helper function to generate dates for the past n days
const getPastDays = (days: number) => {
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    result.push(date.toISOString().split("T")[0]);
  }
  return result;
};

export default function AnalyticsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState(mockOrders);
  const [customers, setCustomers] = useState(mockCustomers);
  const [timeRange, setTimeRange] = useState("7days");

  // Derived data for charts
  const [salesData, setSalesData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [paymentMethodData, setPaymentMethodData] = useState<any[]>([]);
  const [branchPerformanceData, setBranchPerformanceData] = useState<any[]>([]);
  const [hourlyOrdersData, setHourlyOrdersData] = useState<any[]>([]);
  const [customerStatusData, setCustomerStatusData] = useState<any[]>([]);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }

    // Load orders from localStorage if available
    const savedOrders = localStorage.getItem("restaurantOrders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error("Error parsing saved orders:", error);
      }
    }

    // Load customers from localStorage if available
    const savedCustomers = localStorage.getItem("restaurantCustomers");
    if (savedCustomers) {
      try {
        setCustomers(JSON.parse(savedCustomers));
      } catch (error) {
        console.error("Error parsing saved customers:", error);
      }
    }

    setIsLoading(false);
  }, [router]);

  // Generate chart data based on time range
  useEffect(() => {
    if (orders.length === 0) return;

    // Determine date range
    let days = 7;
    if (timeRange === "30days") days = 30;
    if (timeRange === "90days") days = 90;
    if (timeRange === "year") days = 365;

    const dateRange = getPastDays(days);

    // Sales data over time
    const salesByDate = dateRange.map((date) => {
      const dayOrders = orders.filter(
        (order) =>
          new Date(order.createdAt).toISOString().split("T")[0] === date
      );
      return {
        date,
        sales: dayOrders.reduce((sum, order) => sum + order.total, 0),
        orders: dayOrders.length,
      };
    });
    setSalesData(salesByDate);

    // Category data
    const categorySales: Record<string, number> = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const product = products.find((p) => p.name === item.productName);
        if (product) {
          const category = product.categoryId;
          categorySales[category] =
            (categorySales[category] || 0) + item.price * item.quantity;
        }
      });
    });

    const categoryDataArray = Object.entries(categorySales).map(
      ([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      })
    );
    setCategoryData(categoryDataArray);

    // Payment method data
    const paymentMethods = orders.reduce(
      (acc: Record<string, number>, order) => {
        const method = order.paymentMethod;
        acc[method] = (acc[method] || 0) + 1;
        return acc;
      },
      {}
    );

    const paymentMethodArray = Object.entries(paymentMethods).map(
      ([name, value]) => ({
        name: name === "card" ? "Credit Card" : "Cash",
        value,
      })
    );
    setPaymentMethodData(paymentMethodArray);

    // Branch performance data
    const branchSales = branches.map((branch) => {
      const branchOrders = orders.filter(
        (order) => order.branchId === branch.id
      );
      return {
        name: branch.name,
        sales: branchOrders.reduce((sum, order) => sum + order.total, 0),
        orders: branchOrders.length,
      };
    });
    setBranchPerformanceData(branchSales);

    // Hourly orders distribution
    const hourlyOrders = Array(24)
      .fill(0)
      .map((_, hour) => ({
        hour: `${hour}:00`,
        orders: orders.filter(
          (order) => new Date(order.createdAt).getHours() === hour
        ).length,
      }));
    setHourlyOrdersData(hourlyOrders);

    // Customer status distribution
    const customerStatus = customers.reduce(
      (acc: Record<string, number>, customer) => {
        acc[customer.status] = (acc[customer.status] || 0) + 1;
        return acc;
      },
      {}
    );

    const customerStatusArray = Object.entries(customerStatus).map(
      ([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
      })
    );
    setCustomerStatusData(customerStatusArray);
  }, [orders, customers, timeRange]);

  // Calculate summary metrics
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  const totalCustomers = customers.length;
  const vipCustomers = customers.filter(
    (customer) => customer.status === "vip"
  ).length;

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

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
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Track your restaurant&apos;s performance and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalSales)}
            </div>
            <p className="text-xs text-muted-foreground">
              +
              {(
                (salesData[salesData.length - 1]?.sales /
                  (totalSales / salesData.length)) *
                  100 -
                100
              ).toFixed(1)}
              % from average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {salesData[salesData.length - 1]?.orders} orders today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(averageOrderValue)}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalOrders} total orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {vipCustomers} VIP customers
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Daily sales and order volume for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toFixed(2)}`,
                        "Sales",
                      ]}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString();
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sales"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Sales ($)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      stroke="#82ca9d"
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>
                  Revenue distribution across menu categories
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toFixed(2)}`,
                        "Sales",
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Branch Performance</CardTitle>
                <CardDescription>
                  Sales and order comparison across branches
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={branchPerformanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number, name) => [
                        name === "sales" ? `$${value.toFixed(2)}` : value,
                        name === "sales" ? "Sales" : "Orders",
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="sales" name="Sales ($)" fill="#8884d8" />
                    <Bar dataKey="orders" name="Orders" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Distribution of payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Customer Status</CardTitle>
                <CardDescription>
                  Distribution of customer statuses
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Hourly Order Distribution</CardTitle>
              <CardDescription>Number of orders by hour of day</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={hourlyOrdersData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(":")[0]}
                  />
                  <YAxis />
                  <Tooltip labelFormatter={(label) => `Hour: ${label}`} />
                  <Bar dataKey="orders" name="Orders" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Trends</CardTitle>
              <CardDescription>
                Detailed sales analysis over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toFixed(2)}`,
                      "Sales",
                    ]}
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString();
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Sales ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Volume</CardTitle>
                <CardDescription>Number of orders over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString();
                      }}
                    />
                    <Legend />
                    <Bar dataKey="orders" name="Orders" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Order Value</CardTitle>
                <CardDescription>Average order value over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData.map((day) => ({
                      ...day,
                      avg: day.orders > 0 ? day.sales / day.orders : 0,
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toFixed(2)}`,
                        "Avg. Order Value",
                      ]}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return date.toLocaleDateString();
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="avg"
                      stroke="#ff7300"
                      name="Avg. Order Value ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <CardDescription>
                  Revenue distribution across menu categories
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toFixed(2)}`,
                        "Sales",
                      ]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
                <CardDescription>
                  Most popular menu items by order count
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={products.slice(0, 5).map((product) => ({
                      name: product.name,
                      orders: Math.floor(Math.random() * 100) + 20, // Mock data
                    }))}
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" name="Orders" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
              <CardDescription>
                Sales and order metrics for top products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Product</th>
                      <th className="p-2 text-left font-medium">Category</th>
                      <th className="p-2 text-right font-medium">Orders</th>
                      <th className="p-2 text-right font-medium">Revenue</th>
                      <th className="p-2 text-right font-medium">Avg. Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 10).map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.categoryId}</td>
                        <td className="p-2 text-right">
                          {Math.floor(Math.random() * 100) + 10}
                        </td>
                        <td className="p-2 text-right">
                          $
                          {(
                            product.price *
                            (Math.floor(Math.random() * 100) + 10)
                          ).toFixed(2)}
                        </td>
                        <td className="p-2 text-right">
                          ${product.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Status Distribution</CardTitle>
                <CardDescription>
                  Breakdown of customer statuses
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {customerStatusData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Spending</CardTitle>
                <CardDescription>
                  Average spending per customer type
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        name: "Regular",
                        value:
                          customers
                            .filter((c) => c.status === "active")
                            .reduce((sum, c) => sum + c.totalSpent, 0) /
                          customers.filter((c) => c.status === "active").length,
                      },
                      {
                        name: "VIP",
                        value:
                          customers
                            .filter((c) => c.status === "vip")
                            .reduce((sum, c) => sum + c.totalSpent, 0) /
                          customers.filter((c) => c.status === "vip").length,
                      },
                      {
                        name: "Inactive",
                        value:
                          customers
                            .filter((c) => c.status === "inactive")
                            .reduce((sum, c) => sum + c.totalSpent, 0) /
                          customers.filter((c) => c.status === "inactive")
                            .length,
                      },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value.toFixed(2)}`,
                        "Avg. Spending",
                      ]}
                    />
                    <Legend />
                    <Bar
                      dataKey="value"
                      name="Avg. Spending ($)"
                      fill="#8884d8"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Growth</CardTitle>
              <CardDescription>
                New customer acquisition over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getPastDays(
                    timeRange === "7days" ? 7 : timeRange === "30days" ? 30 : 90
                  ).map((date) => {
                    // Mock data for customer growth
                    const newCustomers = Math.floor(Math.random() * 5) + 1;
                    return {
                      date,
                      customers: newCustomers,
                      cumulative: newCustomers, // This would be calculated properly in a real app
                    };
                  })}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) => {
                      const date = new Date(label);
                      return date.toLocaleDateString();
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="#8884d8"
                    name="New Customers"
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#82ca9d"
                    name="Cumulative Growth"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>Customers with highest spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">Customer</th>
                      <th className="p-2 text-left font-medium">Status</th>
                      <th className="p-2 text-right font-medium">Orders</th>
                      <th className="p-2 text-right font-medium">
                        Total Spent
                      </th>
                      <th className="p-2 text-right font-medium">Avg. Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers
                      .sort((a, b) => b.totalSpent - a.totalSpent)
                      .slice(0, 10)
                      .map((customer) => (
                        <tr key={customer.id} className="border-b">
                          <td className="p-2">{customer.name}</td>
                          <td className="p-2">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                customer.status === "vip"
                                  ? "bg-purple-100 text-purple-800"
                                  : customer.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {customer.status.charAt(0).toUpperCase() +
                                customer.status.slice(1)}
                            </span>
                          </td>
                          <td className="p-2 text-right">
                            {customer.totalOrders}
                          </td>
                          <td className="p-2 text-right">
                            ${customer.totalSpent.toFixed(2)}
                          </td>
                          <td className="p-2 text-right">
                            $
                            {customer.totalOrders > 0
                              ? (
                                  customer.totalSpent / customer.totalOrders
                                ).toFixed(2)
                              : "0.00"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
