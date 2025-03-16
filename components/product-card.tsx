"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import type { Product } from "./restaurant-menu";
import CurrencyDisplay from "./currency-display";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onClick: () => void;
  inStock?: boolean;
  stockQuantity?: number | null;
  showStock?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onClick,
  inStock = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stockQuantity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showStock = true,
}: ProductCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="font-bold text-lg">
            <CurrencyDisplay amount={product.price} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full"
          disabled={!inStock}
        >
          <Plus className="h-4 w-4 mr-2" />
          {inStock ? "Agregar al Carrito" : "Agotado"}
        </Button>
      </CardFooter>
    </Card>
  );
}
