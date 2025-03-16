"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { CartItem, Branch } from "./restaurant-menu";
import CheckoutForm from "./checkout-form";
import PaymentForm from "./payment-form";
import OrderConfirmation from "./order-confirmation";
// Add this import at the top
import CurrencyDisplay from "./currency-display";
import Image from "next/image";

type CheckoutStep = "cart" | "userInfo" | "payment" | "confirmation";

// Update the CartDrawerProps interface to include isRestaurantOpen
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (index: number, quantity: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeFromCart: (productId: string, selectedExtras: any[]) => void;
  cartTotal: number;
  selectedBranch: Branch | undefined;
  isRestaurantOpen?: boolean;
}

// Add the isRestaurantOpen parameter to the function parameters
export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  cartTotal,
  selectedBranch,
  isRestaurantOpen = true,
}: CartDrawerProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  const deliveryFee = 3.99;

  const handleNextStep = () => {
    if (currentStep === "cart") setCurrentStep("userInfo");
    else if (currentStep === "userInfo") setCurrentStep("payment");
  };

  const handlePrevStep = () => {
    if (currentStep === "confirmation") setCurrentStep("payment");
    else if (currentStep === "payment") setCurrentStep("userInfo");
    else if (currentStep === "userInfo") setCurrentStep("cart");
  };

  const handleUserInfoSubmit = (data: typeof userInfo) => {
    setUserInfo(data);
    setCurrentStep("payment");
  };

  const handlePaymentComplete = () => {
    setPaymentVerified(true);
    // Generate order ID and move to confirmation immediately
    const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(newOrderId);
    setCurrentStep("confirmation");
    setShowConfetti(true);
  };

  const handleClose = () => {
    onClose();
    // Reset state after drawer closes
    setTimeout(() => {
      setCurrentStep("cart");
      setPaymentVerified(false);
      setShowConfetti(false);
    }, 300);
  };

  const isCartEmpty = cartItems.length === 0;

  const calculateItemPrice = (item: CartItem) => {
    const extrasTotal = item.selectedExtras.reduce(
      (sum, extra) => sum + extra.price * (extra.quantity || 1),
      0
    );
    return (item.product.price + extrasTotal) * item.quantity;
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md md:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle>
              {currentStep === "cart" && "Your Cart"}
              {currentStep === "userInfo" && "Your Information"}
              {currentStep === "payment" && "Payment"}
              {currentStep === "confirmation" && "Order Confirmation"}
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "cart"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                1
              </div>
              <div className="h-1 w-4 bg-muted"></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "userInfo"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                2
              </div>
              <div className="h-1 w-4 bg-muted"></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "payment"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                3
              </div>
              <div className="h-1 w-4 bg-muted"></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "confirmation"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                4
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Step{" "}
              {currentStep === "cart"
                ? "1"
                : currentStep === "userInfo"
                ? "2"
                : currentStep === "payment"
                ? "3"
                : "4"}{" "}
              of 4
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-auto p-4">
          {currentStep === "cart" && (
            <>
              {isCartEmpty ? (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <p className="text-muted-foreground mb-4">
                    Your cart is empty
                  </p>
                  <Button variant="outline" onClick={handleClose}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {!selectedBranch && (
                    <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm mb-4">
                      Please select a restaurant branch before checkout.
                    </div>
                  )}

                  {!isRestaurantOpen && (
                    <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm mb-4">
                      The restaurant is currently closed. Your order will be
                      processed when we reopen.
                    </div>
                  )}

                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.product.id}-${index}`}
                      className="flex gap-4 py-2"
                    >
                      <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              removeFromCart(
                                item.product.id,
                                item.selectedExtras
                              )
                            }
                            className="h-8 w-8 text-muted-foreground"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        {/* Replace the item price display in the cart items section: */}
                        <div className="text-sm font-medium">
                          <CurrencyDisplay
                            amount={item.product.price * item.quantity}
                          />
                        </div>

                        {item.selectedExtras.length > 0 && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            {item.selectedExtras.map((extra) => (
                              <div key={extra.extraId}>
                                +
                                <CurrencyDisplay
                                  amount={extra.price * (extra.quantity || 1)}
                                  showSymbol={false}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(index, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease</span>
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(index, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase</span>
                          </Button>
                          <div className="ml-auto font-medium">
                            <CurrencyDisplay
                              amount={calculateItemPrice(item)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {currentStep === "userInfo" && (
            <CheckoutForm
              initialValues={userInfo}
              onSubmit={handleUserInfoSubmit}
            />
          )}

          {currentStep === "payment" && (
            <PaymentForm
              cartTotal={cartTotal}
              onComplete={handlePaymentComplete}
            />
          )}

          {currentStep === "confirmation" && (
            <OrderConfirmation
              orderDetails={{
                orderId,
                items: cartItems,
                total: cartTotal,
                userInfo,
                branch: selectedBranch,
              }}
              showConfetti={showConfetti}
              onConfettiComplete={() => setShowConfetti(false)}
            />
          )}
        </div>

        <div className="border-t p-4">
          {currentStep === "cart" && !isCartEmpty && (
            <>
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal</span>
                <div className="font-medium">
                  <CurrencyDisplay amount={cartTotal} />
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-medium">Costo de Envío</span>
                <div className="font-medium">
                  <CurrencyDisplay amount={deliveryFee} />
                </div>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total</span>
                <div className="font-bold">
                  <CurrencyDisplay amount={cartTotal + deliveryFee} />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleNextStep}
                disabled={isCartEmpty || !selectedBranch}
              >
                Proceder al Pago
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </>
          )}

          {currentStep === "userInfo" && (
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver al Carrito
              </Button>
              <Button type="submit" form="checkout-form">
                Continuar al Pago
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}

          {currentStep === "payment" && (
            <div className="flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
              <Button type="submit" form="payment-form">
                Verificar Pago
              </Button>
            </div>
          )}

          {currentStep === "confirmation" && (
            <Button className="w-full" onClick={handleClose}>
              Listo
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
