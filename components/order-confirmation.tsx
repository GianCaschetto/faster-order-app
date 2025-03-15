"use client";

import { useEffect } from "react";
import { Check, Send } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CartItem, Branch } from "./restaurant-menu";
import CurrencyDisplay from "./currency-display";

interface OrderConfirmationProps {
  orderDetails: {
    orderId?: string;
    items: CartItem[];
    total: number;
    userInfo: {
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    branch: Branch | undefined;
  };
  showConfetti: boolean;
  onConfettiComplete: () => void;
}

export default function OrderConfirmation({
  orderDetails,
  showConfetti,
  onConfettiComplete,
}: OrderConfirmationProps) {
  const { items, total, userInfo, branch } = orderDetails;
  const orderNumber =
    orderDetails.orderId || `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const estimatedDelivery = new Date(Date.now() + 45 * 60000); // 45 minutes from now
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        onConfettiComplete();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showConfetti, onConfettiComplete]);

  // Save order to localStorage for tracking
  useEffect(() => {
    if (orderNumber) {
      const savedOrders = localStorage.getItem("restaurantOrders");
      let orders = [];

      if (savedOrders) {
        try {
          orders = JSON.parse(savedOrders);
        } catch (error) {
          console.error("Error parsing saved orders:", error);
        }
      }

      // Create a new order object
      const newOrder = {
        id: orderNumber,
        customerName: userInfo.name,
        customerEmail: userInfo.email,
        customerPhone: userInfo.phone,
        customerAddress: userInfo.address,
        branchId: branch?.id || "1",
        items: items.map((item, index) => ({
          id: index.toString(),
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          extras: item.selectedExtras.map(
            (extra) => `${extra.quantity || 1}x ${extra.name}`
          ),
        })),
        subtotal: total,
        deliveryFee: 3.99,
        total: total + 3.99,
        status: "pending",
        paymentMethod: "card", // This would come from the payment form
        paymentStatus: "paid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add the new order to the list
      orders.unshift(newOrder);

      // Save back to localStorage
      localStorage.setItem("restaurantOrders", JSON.stringify(orders));
    }
  }, [orderNumber, items, total, userInfo, branch]);

  const shareToWhatsApp = () => {
    // Get the WhatsApp template from localStorage or use default
    const savedSettings = localStorage.getItem("restaurantWhatsAppSettings");
    let whatsappTemplate = "";
    let whatsappNumber = "";

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        whatsappTemplate = settings.messageTemplate || "";

        // Check for branch-specific phone number
        if (branch && settings.branchPhoneNumbers) {
          const branchConfig = settings.branchPhoneNumbers.find(
            (b: Branch) => b.id === branch.id
          );
          if (branchConfig) {
            whatsappNumber = branchConfig.phoneNumber;
          } else {
            whatsappNumber = settings.defaultPhoneNumber || "";
          }
        } else {
          whatsappNumber = settings.defaultPhoneNumber || "";
        }
      } catch (error) {
        console.error("Error parsing WhatsApp settings:", error);
      }
    }

    // If no template is found, use a default one
    if (!whatsappTemplate) {
      whatsappTemplate =
        "🍽️ *NUEVO PEDIDO* 🍽️\n\n*Número de Orden:* {order-number}\n*Cliente:* {customer-name}\n*Teléfono:* {customer-phone}\n*Dirección:* {customer-address}\n\n*DETALLES DEL PEDIDO:*\n{order-items}\n\n*Subtotal:* {subtotal}\n*Envío:* {delivery-fee}\n*Total:* {total}\n\n*Sucursal:* {branch-name}\n*Hora estimada de entrega:* {estimated-delivery}";
    }

    // If no number is found, use a default one
    if (!whatsappNumber) {
      whatsappNumber = "5551234567";
    }

    // Format order items
    const formattedItems = items
      .map((item) => {
        const extrasText =
          item.selectedExtras.length > 0
            ? `\n   - Extras: ${item.selectedExtras
                .map((extra) => `${extra.quantity || 1}x ${extra.name}`)
                .join(", ")}`
            : "";
        return `• ${item.quantity}x ${
          item.product.name
        } - ${new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "USD",
        }).format(item.product.price * item.quantity)}${extrasText}`;
      })
      .join("\n");

    // Replace placeholders in the template
    const message = whatsappTemplate
      .replace("{order-number}", orderNumber)
      .replace("{customer-name}", userInfo.name)
      .replace("{customer-phone}", userInfo.phone)
      .replace("{customer-email}", userInfo.email)
      .replace("{customer-address}", userInfo.address)
      .replace("{order-items}", formattedItems)
      .replace(
        "{subtotal}",
        new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "USD",
        }).format(total)
      )
      .replace(
        "{delivery-fee}",
        new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "USD",
        }).format(3.99)
      )
      .replace(
        "{total}",
        new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "USD",
        }).format(total + 3.99)
      )
      .replace("{branch-name}", branch?.name || "")
      .replace("{branch-address}", branch?.address || "")
      .replace(
        "{estimated-delivery}",
        estimatedDelivery.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="space-y-6">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <div className="flex flex-col items-center justify-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">¡Pedido Confirmado!</h2>
        <p className="text-muted-foreground">Gracias por tu pedido</p>
        <p className="font-medium mt-2">Orden #{orderNumber}</p>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <div>
          <h3 className="font-medium">Detalles de Entrega</h3>
          <p className="text-sm">{userInfo.name}</p>
          <p className="text-sm">{userInfo.address}</p>
          <p className="text-sm">{userInfo.phone}</p>
        </div>

        <div>
          <h3 className="font-medium">Sucursal</h3>
          <p className="text-sm">
            {branch?.name} - {branch?.address}
          </p>
        </div>

        <div>
          <h3 className="font-medium">Entrega Estimada</h3>
          <p className="text-sm">
            {estimatedDelivery.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            ({Math.round((estimatedDelivery.getTime() - Date.now()) / 60000)}{" "}
            min)
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Resumen del Pedido</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.quantity} × {item.product.name}
                {item.selectedExtras.length > 0 && (
                  <span className="block text-xs text-muted-foreground pl-4">
                    {item.selectedExtras
                      .map((extra) => `${extra.quantity || 1}x ${extra.name}`)
                      .join(", ")}
                  </span>
                )}
              </span>
              <span>
                <CurrencyDisplay amount={item.product.price * item.quantity} />
              </span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>
                <CurrencyDisplay amount={total} />
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Costo de Envío</span>
              <span>
                <CurrencyDisplay amount={3.99} />
              </span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>
                <CurrencyDisplay amount={total + 3.99} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Se ha enviado un correo de confirmación a {userInfo.email}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button className="flex-1" asChild>
          <Link href="/">Continuar Comprando</Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/track/${orderNumber}`}>Seguir Pedido</Link>
        </Button>
        <Button
          variant="secondary"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          onClick={shareToWhatsApp}
        >
          <Send className="mr-2 h-4 w-4" />
          Enviar a WhatsApp
        </Button>
      </div>
    </div>
  );
}
