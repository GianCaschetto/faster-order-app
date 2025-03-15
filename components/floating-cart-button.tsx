"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartItem } from "@/components/restaurant-menu";

interface FloatingCartButtonProps {
  cartItems: CartItem[];
  openCart: () => void;
}

export default function FloatingCartButton({
  cartItems,
  openCart,
}: FloatingCartButtonProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isMobile) return null;

  return (
    <Button
      onClick={openCart}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 p-0"
    >
      <ShoppingCart className="h-6 w-6" />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </Button>
  );
}
