"use client"

import { useEffect } from "react"
import { Check } from "lucide-react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { CartItem, Branch } from "./restaurant-menu"

interface OrderConfirmationProps {
  orderDetails: {
    orderId?: string
    items: CartItem[]
    total: number
    userInfo: {
      name: string
      email: string
      phone: string
      address: string
    }
    branch: Branch | undefined
  }
  showConfetti: boolean
  onConfettiComplete: () => void
}

export default function OrderConfirmation({ orderDetails, showConfetti, onConfettiComplete }: OrderConfirmationProps) {
  const { items, total, userInfo, branch } = orderDetails
  const orderNumber = orderDetails.orderId || `ORD-${Math.floor(10000 + Math.random() * 90000)}`
  const estimatedDelivery = new Date(Date.now() + 45 * 60000) // 45 minutes from now
  const { width, height } = useWindowSize()

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        onConfettiComplete()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [showConfetti, onConfettiComplete])

  // Save order to localStorage for tracking
  useEffect(() => {
    if (orderNumber) {
      const savedOrders = localStorage.getItem("restaurantOrders")
      let orders = []

      if (savedOrders) {
        try {
          orders = JSON.parse(savedOrders)
        } catch (error) {
          console.error("Error parsing saved orders:", error)
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
          extras: item.selectedExtras.map((extra) => extra.name),
        })),
        subtotal: total,
        deliveryFee: 3.99,
        total: total + 3.99,
        status: "pending",
        paymentMethod: "card", // This would come from the payment form
        paymentStatus: "paid",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Add the new order to the list
      orders.unshift(newOrder)

      // Save back to localStorage
      localStorage.setItem("restaurantOrders", JSON.stringify(orders))
    }
  }, [orderNumber, items, total, userInfo, branch])

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} gravity={0.2} />}

      <div className="flex flex-col items-center justify-center py-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Order Confirmed!</h2>
        <p className="text-muted-foreground">Thank you for your order</p>
        <p className="font-medium mt-2">Order #{orderNumber}</p>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        <div>
          <h3 className="font-medium">Delivery Details</h3>
          <p className="text-sm">{userInfo.name}</p>
          <p className="text-sm">{userInfo.address}</p>
          <p className="text-sm">{userInfo.phone}</p>
        </div>

        <div>
          <h3 className="font-medium">Restaurant Branch</h3>
          <p className="text-sm">
            {branch?.name} - {branch?.address}
          </p>
        </div>

        <div>
          <h3 className="font-medium">Estimated Delivery</h3>
          <p className="text-sm">
            {estimatedDelivery.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} (
            {Math.round((estimatedDelivery.getTime() - Date.now()) / 60000)} min)
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-2">Order Summary</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.quantity} × {item.product.name}
              </span>
              <span>${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery Fee</span>
              <span>$3.99</span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>${(total + 3.99).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>A confirmation email has been sent to {userInfo.email}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button className="flex-1" asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/track/${orderNumber}`}>Track Order</Link>
        </Button>
      </div>
    </div>
  )
}

