"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface FloatingCartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export default function FloatingCartButton({
  itemCount,
  onClick,
}: FloatingCartButtonProps) {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 p-0"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
