"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  UserPlus,
  Filter,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { mockCustomers } from "@/lib/mock-data";

// Customer types
export type CustomerStatus = "active" | "inactive" | "vip";

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: CustomerStatus;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  createdAt: string;
  notes?: string;
};

export default function CustomersPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatus | "all">(
    "all"
  );
  const [showFilters, setShowFilters] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }

    // Load customers from localStorage or use mock data
    const savedCustomers = localStorage.getItem("restaurantCustomers");

    if (savedCustomers) {
      try {
        setCustomers(JSON.parse(savedCustomers));
      } catch (error) {
        console.error("Error parsing saved customers:", error);
        setCustomers(mockCustomers);
      }
    } else {
      setCustomers(mockCustomers);
      // Save mock customers to localStorage for persistence
      localStorage.setItem(
        "restaurantCustomers",
        JSON.stringify(mockCustomers)
      );
    }

    setIsLoading(false);
  }, [router]);

  // Filter customers based on search term and status
  useEffect(() => {
    let filtered = [...customers];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(term) ||
          customer.email.toLowerCase().includes(term) ||
          customer.phone.includes(term)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (customer) => customer.status === statusFilter
      );
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, statusFilter]);

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsCustomerDetailsOpen(true);
  };

  const handleUpdateStatus = (
    customerId: string,
    newStatus: CustomerStatus
  ) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === customerId
        ? {
            ...customer,
            status: newStatus,
          }
        : customer
    );

    setCustomers(updatedCustomers);
    localStorage.setItem(
      "restaurantCustomers",
      JSON.stringify(updatedCustomers)
    );

    // If the customer is currently selected, update it
    if (selectedCustomer && selectedCustomer.id === customerId) {
      setSelectedCustomer({
        ...selectedCustomer,
        status: newStatus,
      });
    }

    toast({
      title: "Customer status updated",
      description: `Customer status changed to ${newStatus}`,
    });
  };

  const handleDeleteCustomer = (customerId: string) => {
    const updatedCustomers = customers.filter(
      (customer) => customer.id !== customerId
    );
    setCustomers(updatedCustomers);
    localStorage.setItem(
      "restaurantCustomers",
      JSON.stringify(updatedCustomers)
    );

    setIsDeleteDialogOpen(false);
    setIsCustomerDetailsOpen(false);

    toast({
      title: "Customer deleted",
      description: "The customer has been deleted successfully",
    });
  };

  const getStatusBadge = (status: CustomerStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="default" className="bg-gray-500">
            Inactive
          </Badge>
        );
      case "vip":
        return (
          <Badge variant="default" className="bg-purple-500">
            VIP
          </Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Customer Management
          </h2>
          <p className="text-muted-foreground">
            Manage your restaurant customers and their information
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <div
        className={`flex flex-col md:flex-row gap-4 ${
          showFilters || "md:flex hidden"
        }`}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as CustomerStatus | "all")
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="flex overflow-x-auto pb-px">
          <TabsTrigger value="all">All Customers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="vip">VIP</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <CustomersTable
            customers={filteredCustomers}
            onViewCustomer={handleViewCustomer}
            getStatusBadge={getStatusBadge}
            formatDate={formatDate}
          />
        </TabsContent>

        {["active", "vip", "inactive"].map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            <CustomersTable
              customers={customers.filter(
                (customer) => customer.status === status
              )}
              onViewCustomer={handleViewCustomer}
              getStatusBadge={getStatusBadge}
              formatDate={formatDate}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog
          open={isCustomerDetailsOpen}
          onOpenChange={setIsCustomerDetailsOpen}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Customer Details
                {getStatusBadge(selectedCustomer.status)}
              </DialogTitle>
              <DialogDescription>
                View and manage customer information
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-24">Name:</span>
                    <span>{selectedCustomer.name}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-24">Email:</span>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${selectedCustomer.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedCustomer.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-24">Phone:</span>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${selectedCustomer.phone}`}
                        className="hover:underline"
                      >
                        {selectedCustomer.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-24">Address:</span>
                    <div className="flex items-start gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{selectedCustomer.address}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-24">
                      Customer since:
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(selectedCustomer.createdAt)}</span>
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold mt-6 mb-2">Notes</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedCustomer.notes ||
                    "No notes available for this customer."}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Order History</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-24">Total Orders:</span>
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCustomer.totalOrders}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-24">Total Spent:</span>
                    <span className="font-medium">
                      ${selectedCustomer.totalSpent.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-24">Last Order:</span>
                    <span>{formatDate(selectedCustomer.lastOrderDate)}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium min-w-24">Average Order:</span>
                    <span>
                      $
                      {selectedCustomer.totalOrders > 0
                        ? (
                            selectedCustomer.totalSpent /
                            selectedCustomer.totalOrders
                          ).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border rounded-md p-4">
                  <h3 className="font-semibold mb-2">Recent Orders</h3>
                  {selectedCustomer.totalOrders > 0 ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Order #ORD-5123
                        </span>
                        <span>
                          {formatDate(selectedCustomer.lastOrderDate)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Order #ORD-5089
                        </span>
                        <span>
                          {formatDate(
                            new Date(
                              new Date(
                                selectedCustomer.lastOrderDate
                              ).getTime() -
                                7 * 24 * 60 * 60 * 1000
                            ).toISOString()
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Order #ORD-4967
                        </span>
                        <span>
                          {formatDate(
                            new Date(
                              new Date(
                                selectedCustomer.lastOrderDate
                              ).getTime() -
                                14 * 24 * 60 * 60 * 1000
                            ).toISOString()
                          )}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        View All Orders
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No order history available.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedCustomer.id, "active")
                    }
                    disabled={selectedCustomer.status === "active"}
                    className={
                      selectedCustomer.status === "active" ? "bg-green-100" : ""
                    }
                  >
                    Active
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedCustomer.id, "inactive")
                    }
                    disabled={selectedCustomer.status === "inactive"}
                    className={
                      selectedCustomer.status === "inactive"
                        ? "bg-gray-100"
                        : ""
                    }
                  >
                    Inactive
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedCustomer.id, "vip")
                    }
                    disabled={selectedCustomer.status === "vip"}
                    className={
                      selectedCustomer.status === "vip" ? "bg-purple-100" : ""
                    }
                  >
                    <Star className="h-4 w-4 mr-1" /> VIP
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter className="flex justify-between mt-4">
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" /> Delete Customer
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCustomerDetailsOpen(false)}
                >
                  Close
                </Button>
                <Button variant="default">
                  <Edit className="h-4 w-4 mr-1" /> Edit Customer
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedCustomer && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Customer</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this customer? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm font-medium">
                You are about to delete the customer:{" "}
                <span className="font-bold">{selectedCustomer.name}</span>
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteCustomer(selectedCustomer.id)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Customers Table Component
function CustomersTable({
  customers,
  onViewCustomer,
  getStatusBadge,
}: {
  customers: Customer[];
  onViewCustomer: (customer: Customer) => void;
  getStatusBadge: (status: CustomerStatus) => React.ReactNode;
  formatDate: (dateString: string) => string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>
          View and manage your restaurant customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        {customers.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <UserPlus className="h-8 w-8 mx-auto mb-2" />
            <p>No customers found</p>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Phone
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Orders
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Spent
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.name}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {customer.email}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {customer.phone}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {customer.totalOrders}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        ${customer.totalSpent.toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => onViewCustomer(customer)}
                            >
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem>Edit customer</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View orders</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Delete customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
