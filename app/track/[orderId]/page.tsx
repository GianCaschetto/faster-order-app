"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { branches } from "@/components/restaurant-menu";
import type { Order, OrderStatus } from "@/app/admin/orders/page";
import { mockOrders } from "@/lib/mock-data";

export default function TrackOrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deliveryProgress, setDeliveryProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);

  useEffect(() => {
    // Fetch order data
    const fetchOrder = async () => {
      setIsLoading(true);

      // In a real app, this would be an API call
      // For demo, we'll use localStorage or mock data
      const savedOrders = localStorage.getItem("restaurantOrders");
      let orders = [];

      if (savedOrders) {
        try {
          orders = JSON.parse(savedOrders);
        } catch (error) {
          console.error("Error parsing saved orders:", error);
          orders = mockOrders;
        }
      } else {
        orders = mockOrders;
      }

      const foundOrder = orders.find((o: Order) => o.id === orderId);

      if (foundOrder) {
        setOrder(foundOrder);

        // Calculate progress based on status
        const progressMap: Record<OrderStatus, number> = {
          pending: 0,
          confirmed: 25,
          preparing: 50,
          ready: 75,
          delivered: 100,
          cancelled: 0,
        };

        setDeliveryProgress(progressMap[foundOrder.status as OrderStatus]);

        // Calculate estimated delivery time
        if (
          foundOrder.status !== "delivered" &&
          foundOrder.status !== "cancelled"
        ) {
          const createdAt = new Date(foundOrder.createdAt).getTime();
          const now = Date.now();
          const elapsed = Math.floor((now - createdAt) / (1000 * 60)); // minutes elapsed

          // Estimate 45 minutes total delivery time
          const remaining = Math.max(0, 45 - elapsed);
          setEstimatedTime(remaining);
        }
      } else {
        toast({
          title: "Order not found",
          description: "The order you're looking for doesn't exist",
          variant: "destructive",
        });
      }

      setIsLoading(false);
    };

    fetchOrder();

    // Set up a timer to update the progress
    const timer = setInterval(() => {
      if (
        order &&
        order.status !== "delivered" &&
        order.status !== "cancelled"
      ) {
        setDeliveryProgress((prev) => {
          const target = getProgressTarget(order.status);
          if (prev < target) {
            return Math.min(prev + 1, target);
          }
          return prev;
        });

        setEstimatedTime((prev) =>
          prev !== null ? Math.max(0, prev - 1 / 60) : null
        );
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [orderId]);

  useEffect(() => {
    if (order && order.status !== "delivered" && order.status !== "cancelled") {
      setDeliveryProgress((prev) => {
        const target = getProgressTarget(order.status);
        if (prev < target) {
          return Math.min(prev + 1, target);
        }
        return prev;
      });

      setEstimatedTime((prev) =>
        prev !== null ? Math.max(0, prev - 1 / 60) : null
      );
    }
  }, [order?.status]);

  const getProgressTarget = (status: OrderStatus): number => {
    switch (status) {
      case "pending":
        return 10;
      case "confirmed":
        return 30;
      case "preparing":
        return 60;
      case "ready":
        return 80;
      case "delivered":
        return 100;
      case "cancelled":
        return 0;
    }
  };

  const getStatusStep = (status: OrderStatus): number => {
    switch (status) {
      case "pending":
        return 1;
      case "confirmed":
        return 2;
      case "preparing":
        return 3;
      case "ready":
        return 4;
      case "delivered":
        return 5;
      case "cancelled":
        return -1;
    }
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 1) {
      return "Less than a minute";
    }

    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);

    if (hours > 0) {
      return `${hours} hr ${mins} min`;
    }

    return `${mins} min`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Skeleton className="h-8 w-48" />
        </div>

        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />

            <Skeleton className="h-8 w-full mb-6" />

            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-md">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Order Not Found</h1>
        </div>

        <Card>
          <CardContent className="p-6 text-center py-12">
            <X className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t find the order you&apos;re looking for. Please
              check the order ID and try again.
            </p>
            <Button asChild>
              <Link href="/">Return to Restaurant</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentStep = getStatusStep(order.status);
  const branch = branches.find((b) => b.id === order.branchId);

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Track Order</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-semibold text-lg">Order #{order.id}</h2>
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            {order.status === "cancelled" ? (
              <Badge variant="destructive">Cancelled</Badge>
            ) : (
              <Badge
                variant={
                  order.status === "delivered" ? "default" : "destructive"
                }
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            )}
          </div>

          {order.status !== "cancelled" && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Delivery Progress</span>
                {estimatedTime !== null && estimatedTime > 0 && (
                  <span className="font-medium">
                    ETA: {formatTime(estimatedTime)}
                  </span>
                )}
                {order.status === "delivered" && (
                  <span className="font-medium text-green-600">Delivered</span>
                )}
              </div>
              <Progress value={deliveryProgress} className="h-2" />
            </div>
          )}

          <div className="space-y-6">
            <div
              className={`flex items-center gap-4 ${
                currentStep >= 1 ? "" : "opacity-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 1
                    ? currentStep > 1
                      ? "bg-green-100 text-green-600"
                      : "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > 1 ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Order Received</h3>
                <p className="text-sm text-muted-foreground">
                  Your order has been received by the restaurant
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-4 ${
                currentStep >= 2 ? "" : "opacity-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 2
                    ? currentStep > 2
                      ? "bg-green-100 text-green-600"
                      : "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > 2 ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Check className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Order Confirmed</h3>
                <p className="text-sm text-muted-foreground">
                  Your order has been confirmed
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-4 ${
                currentStep >= 3 ? "" : "opacity-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 3
                    ? currentStep > 3
                      ? "bg-green-100 text-green-600"
                      : "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > 3 ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Package className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Preparing</h3>
                <p className="text-sm text-muted-foreground">
                  Your food is being prepared
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-4 ${
                currentStep >= 4 ? "" : "opacity-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 4
                    ? currentStep > 4
                      ? "bg-green-100 text-green-600"
                      : "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > 4 ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <ShoppingBag className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Ready for Pickup/Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Your order is ready and on its way
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-4 ${
                currentStep >= 5 ? "" : "opacity-50"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= 5
                    ? "bg-green-100 text-green-600"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep >= 5 ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Truck className="h-5 w-5" />
                )}
              </div>
              <div>
                <h3 className="font-medium">Delivered</h3>
                <p className="text-sm text-muted-foreground">
                  Your order has been delivered
                </p>
              </div>
            </div>
          </div>

          {order.status === "cancelled" && (
            <div className="mt-6 p-4 bg-red-50 rounded-md text-red-800 text-sm">
              <div className="flex items-start">
                <X className="h-5 w-5 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Order Cancelled</p>
                  <p>
                    This order has been cancelled. If you have any questions,
                    please contact the restaurant.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="font-semibold text-lg mb-4">Order Details</h2>

          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="font-medium">
                    {item.quantity}x {item.productName}
                  </p>
                  {item.extras && item.extras.length > 0 && (
                    <ul className="text-xs text-muted-foreground">
                      {item.extras.map((extra, i) => (
                        <li key={i}>+ {extra}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>${order.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="font-semibold text-lg mb-4">Delivery Information</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Delivery Address</p>
                <p className="text-sm text-muted-foreground">
                  {order.customerAddress}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-sm text-muted-foreground">
                  {order.customerPhone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShoppingBag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Restaurant</p>
                <p className="text-sm text-muted-foreground">
                  {branch
                    ? `${branch.name} - ${branch.address}`
                    : "Unknown Branch"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button className="flex-1" asChild>
          <Link href="/">Return to Restaurant</Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <a href={`tel:${order.customerPhone}`}>
            <Phone className="h-4 w-4 mr-2" />
            Contact
          </a>
        </Button>
      </div>
    </div>
  );
}
