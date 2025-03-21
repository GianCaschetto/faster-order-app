/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Check,
  Clock,
  CreditCard,
  FileText,
  Filter,
  Package,
  Search,
  ShoppingBag,
  Truck,
  X,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { branches } from "@/components/restaurant-menu";
import { mockOrders } from "@/lib/mock-data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Order types
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  extras?: string[];
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  branchId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "card" | "cash";
  paymentStatus: "pending" | "paid";
  createdAt: string;
  updatedAt: string;
  isNew?: boolean;
};

export default function OrdersPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [branchFilter, setBranchFilter] = useState("all");
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check for new orders periodically
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (!token || !user) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }

    // Load orders from localStorage or use mock data
    const loadOrders = () => {
      const savedOrders = localStorage.getItem("restaurantOrders");
      let loadedOrders: Order[] = [];

      if (savedOrders) {
        try {
          loadedOrders = JSON.parse(savedOrders);
        } catch (error) {
          console.error("Error parsing saved orders:", error);
          loadedOrders = mockOrders;
        }
      } else {
        loadedOrders = mockOrders;
      }

      // Check for new orders
      const currentOrderIds = new Set(orders.map((order) => order.id));
      const newOrders = loadedOrders.filter(
        (order) => !currentOrderIds.has(order.id)
      );

      if (newOrders.length > 0 && orders.length > 0) {
        // Mark new orders
        loadedOrders = loadedOrders.map((order) =>
          newOrders.some((newOrder) => newOrder.id === order.id)
            ? { ...order, isNew: true }
            : order
        );

        setNewOrdersCount((prev) => prev + newOrders.length);

        // Play notification sound
        if (audioRef.current) {
          audioRef.current
            .play()
            .catch((e) => console.error("Error playing sound:", e));
        }

        toast({
          title: `${newOrders.length} Nuevo${
            newOrders.length > 1 ? "s" : ""
          } pedido${newOrders.length > 1 ? "s" : ""}!`,
          description: "Has recibido nuevos pedidos que requieren atención.",
        });
      }

      setOrders(loadedOrders);
    };

    loadOrders();
    setIsLoading(false);

    // Set up interval to check for new orders
    const intervalId = setInterval(loadOrders, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [router]);

  // Filter orders based on search term, status, and branch
  useEffect(() => {
    let filtered = [...orders];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(term) ||
          order.customerName.toLowerCase().includes(term) ||
          order.customerEmail.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (branchFilter && branchFilter !== "all") {
      filtered = filtered.filter((order) => order.branchId === branchFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, branchFilter]);

  const handleViewOrder = (order: Order) => {
    // If the order was new, mark it as seen
    if (order.isNew) {
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === order.id ? { ...o, isNew: false } : o))
      );
      setNewOrdersCount((prev) => Math.max(0, prev - 1));
    }

    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            isNew: false,
          }
        : order
    );

    setOrders(updatedOrders);

    // Update in localStorage
    localStorage.setItem("restaurantOrders", JSON.stringify(updatedOrders));

    // If the order is currently selected, update it
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        status: newStatus,
        updatedAt: new Date().toISOString(),
        isNew: false,
      });
    }

    toast({
      title: "Estado del pedido actualizado",
      description: `El pedido #${orderId} se ha actualizado a ${newStatus}`,
    });
  };

  const handleUpdatePaymentStatus = (
    orderId: string,
    newStatus: "pending" | "paid"
  ) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            paymentStatus: newStatus,
            updatedAt: new Date().toISOString(),
          }
        : order
    );

    setOrders(updatedOrders);

    // Update in localStorage
    localStorage.setItem("restaurantOrders", JSON.stringify(updatedOrders));

    // If the order is currently selected, update it
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({
        ...selectedOrder,
        paymentStatus: newStatus,
        updatedAt: new Date().toISOString(),
      });
    }

    toast({
      title: "Estado de pago actualizado",
      description: `El pago del pedido #${orderId} se ha actualizado a ${newStatus}`,
    });
  };

  const clearNewOrdersNotification = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({ ...order, isNew: false }))
    );
    setNewOrdersCount(0);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="default" className="bg-yellow-500">
            Pendiente
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="default" className="bg-blue-500">
            Confirmado
          </Badge>
        );
      case "preparing":
        return (
          <Badge variant="default" className="bg-purple-500">
            Preparando
          </Badge>
        );
      case "ready":
        return (
          <Badge variant="default" className="bg-green-500">
            Listo
          </Badge>
        );
      case "delivered":
        return <Badge variant="default">Entregado</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: "pending" | "paid") => {
    return status === "paid" ? (
      <Badge variant="default">Pagado</Badge>
    ) : (
      <Badge variant="default" className="bg-yellow-500">
        Pendiente
      </Badge>
    );
  };

  // const getStatusIcon = (status: OrderStatus) => {
  //   switch (status) {
  //     case "pending":
  //       return <Clock className="h-5 w-5 text-yellow-500" />
  //     case "confirmed":
  //       return <Check className="h-5 w-5 text-blue-500" />
  //     case "preparing":
  //       return <Package className="h-5 w-5 text-purple-500" />
  //     case "ready":
  //       return <ShoppingBag className="h-5 w-5 text-green-500" />
  //     case "delivered":
  //       return <Truck className="h-5 w-5 text-green-700" />
  //     case "cancelled":
  //       return <X className="h-5 w-5 text-red-500" />
  //   }
  // }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Hidden audio element for notifications */}
      {/* <audio ref={audioRef} src="/notification.mp3" /> */}

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Gestión de pedidos
          </h2>
          {newOrdersCount > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative animate-pulse"
                    onClick={clearNewOrdersNotification}
                  >
                    <Bell className="h-4 w-4 text-yellow-500" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {newOrdersCount}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    You have {newOrdersCount} new order
                    {newOrdersCount > 1 ? "s" : ""}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button onClick={() => router.refresh()}>Actualizar</Button>
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
            placeholder="Buscar pedidos..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as OrderStatus | "all")
          }
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="confirmed">Confirmado</SelectItem>
            <SelectItem value="preparing">Preparando</SelectItem>
            <SelectItem value="ready">Listo</SelectItem>
            <SelectItem value="delivered">Entregado</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={branchFilter} onValueChange={setBranchFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Todas las sucursales" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las sucursales</SelectItem>
            {branches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="flex overflow-x-auto pb-px">
          <TabsTrigger value="all">Todos los pedidos</TabsTrigger>
          <TabsTrigger value="pending" className="relative">
            Pendiente
            {orders.filter((o) => o.status === "pending" && o.isNew).length >
              0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {orders.filter((o) => o.status === "pending" && o.isNew).length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="confirmed">Confirmado</TabsTrigger>
          <TabsTrigger value="preparing">Preparando</TabsTrigger>
          <TabsTrigger value="ready">Listo</TabsTrigger>
          <TabsTrigger value="delivered">Entregado</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelado</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <OrdersTable
            orders={filteredOrders}
            onViewOrder={handleViewOrder}
            onUpdateStatus={handleUpdateStatus}
            getStatusBadge={getStatusBadge}
            getPaymentStatusBadge={getPaymentStatusBadge}
          />
        </TabsContent>

        {[
          "pending",
          "confirmed",
          "preparing",
          "ready",
          "delivered",
          "cancelled",
        ].map((status) => (
          <TabsContent key={status} value={status} className="mt-4">
            <OrdersTable
              orders={orders.filter((order) => order.status === status)}
              onViewOrder={handleViewOrder}
              onUpdateStatus={handleUpdateStatus}
              getStatusBadge={getStatusBadge}
              getPaymentStatusBadge={getPaymentStatusBadge}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Pedido #{selectedOrder.id}
                {getStatusBadge(selectedOrder.status)}
                {selectedOrder.isNew && (
                  <Badge variant="default" className="bg-red-500 text-white">
                    Nuevo
                  </Badge>
                )}
              </DialogTitle>
              <DialogDescription>
                Colocado el {formatDate(selectedOrder.createdAt)}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Información del cliente</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Nombre:</span>{" "}
                    {selectedOrder.customerName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedOrder.customerEmail}
                  </p>
                  <p>
                    <span className="font-medium">Teléfono:</span>{" "}
                    {selectedOrder.customerPhone}
                  </p>
                  <p>
                    <span className="font-medium">Dirección:</span>{" "}
                    {selectedOrder.customerAddress}
                  </p>
                </div>

                <h3 className="font-semibold mt-4 mb-2">Información de pago</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Método:</span>
                    {selectedOrder.paymentMethod === "card" ? (
                      <span className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1" /> Tarjeta de
                        crédito
                      </span>
                    ) : (
                      <span>Efectivo en entrega</span>
                    )}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Estado:</span>
                    {getPaymentStatusBadge(selectedOrder.paymentStatus)}
                  </p>
                </div>

                <h3 className="font-semibold mt-4 mb-2">Sucursal</h3>
                <p className="text-sm">
                  {branches.find(
                    (branch) => branch.id === selectedOrder.branchId
                  )?.name || "Sucursal desconocida"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Artículos del pedido</h3>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Artículo</TableHead>
                        <TableHead className="text-right">Cantidad</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={`${item.id}-${index}`}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              {item.extras && item.extras.length > 0 && (
                                <ul className="text-xs text-muted-foreground">
                                  {item.extras.map((extra, i) => (
                                    <li key={`${item.id}-${i}`}>+ {extra}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Costo de entrega</span>
                    <span>${selectedOrder.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <h3 className="font-semibold mb-2">
                  Actualizar estado del pedido
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedOrder.id, "pending")
                    }
                    disabled={selectedOrder.status === "pending"}
                    className={
                      selectedOrder.status === "pending" ? "bg-yellow-100" : ""
                    }
                  >
                    <Clock className="h-4 w-4 mr-1" /> Pendiente
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedOrder.id, "confirmed")
                    }
                    disabled={selectedOrder.status === "confirmed"}
                    className={
                      selectedOrder.status === "confirmed" ? "bg-blue-100" : ""
                    }
                  >
                    <Check className="h-4 w-4 mr-1" /> Confirmado
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedOrder.id, "preparing")
                    }
                    disabled={selectedOrder.status === "preparing"}
                    className={
                      selectedOrder.status === "preparing"
                        ? "bg-purple-100"
                        : ""
                    }
                  >
                    <Package className="h-4 w-4 mr-1" /> Preparando
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedOrder.id, "ready")
                    }
                    disabled={selectedOrder.status === "ready"}
                    className={
                      selectedOrder.status === "ready" ? "bg-green-100" : ""
                    }
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" /> Listo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedOrder.id, "delivered")
                    }
                    disabled={selectedOrder.status === "delivered"}
                    className={
                      selectedOrder.status === "delivered" ? "bg-green-100" : ""
                    }
                  >
                    <Truck className="h-4 w-4 mr-1" /> Entregado
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateStatus(selectedOrder.id, "cancelled")
                    }
                    disabled={selectedOrder.status === "cancelled"}
                    className={
                      selectedOrder.status === "cancelled" ? "bg-red-100" : ""
                    }
                  >
                    <X className="h-4 w-4 mr-1" /> Cancelado
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Estado de pago</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdatePaymentStatus(selectedOrder.id, "pending")
                    }
                    disabled={selectedOrder.paymentStatus === "pending"}
                    className={
                      selectedOrder.paymentStatus === "pending"
                        ? "bg-yellow-100"
                        : ""
                    }
                  >
                    <Clock className="h-4 w-4 mr-1" /> Pendiente
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdatePaymentStatus(selectedOrder.id, "paid")
                    }
                    disabled={selectedOrder.paymentStatus === "paid"}
                    className={
                      selectedOrder.paymentStatus === "paid"
                        ? "bg-green-100"
                        : ""
                    }
                  >
                    <CreditCard className="h-4 w-4 mr-1" /> Pagado
                  </Button>
                </div>
              </div>
            </DialogFooter>

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => setIsOrderDetailsOpen(false)}
              >
                Cerrar
              </Button>
              <Button variant="default" onClick={() => window.print()}>
                <FileText className="h-4 w-4 mr-1" /> Imprimir factura
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Orders Table Component
function OrdersTable({
  orders,
  onViewOrder,
  onUpdateStatus,
  getStatusBadge,
  getPaymentStatusBadge,
}: {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  getStatusBadge: (status: OrderStatus) => React.ReactNode;
  getPaymentStatusBadge: (status: "pending" | "paid") => React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pedidos</CardTitle>
        <CardDescription>
          Gestiona los pedidos de los clientes y actualiza su estado
        </CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <ShoppingBag className="h-8 w-8 mx-auto mb-2" />
            <p>No se encontraron pedidos</p>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID de pedido</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Cliente
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Fecha
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Sucursal
                    </TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="hidden md:table-cell">Pago</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order, index) => (
                    <TableRow
                      key={`${order.id}-${index}`}
                      className={
                        order.isNew ? "bg-yellow-50 animate-pulse" : ""
                      }
                    >
                      <TableCell>
                        <span className="flex items-center gap-1 font-medium">
                          {order.id}
                          {order.isNew && (
                            <Badge
                              variant="default"
                              className="bg-red-500 text-white"
                            >
                              Nuevo
                            </Badge>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {order.customerName}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {branches.find((branch) => branch.id === order.branchId)
                          ?.name || "Unknown"}
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onViewOrder(order)}
                          >
                            Ver
                          </Button>
                          <div className="md:hidden">
                            <Select
                              value={order.status}
                              onValueChange={(value) =>
                                onUpdateStatus(order.id, value as OrderStatus)
                              }
                            >
                              <SelectTrigger className="h-8 w-[100px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">
                                  Pendiente
                                </SelectItem>
                                <SelectItem value="confirmed">
                                  Confirmado
                                </SelectItem>
                                <SelectItem value="preparing">
                                  Preparando
                                </SelectItem>
                                <SelectItem value="ready">Listo</SelectItem>
                                <SelectItem value="delivered">
                                  Entregado
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelado
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
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
