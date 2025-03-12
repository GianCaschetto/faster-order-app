"use client"

import Image from "next/image"
import { Plus, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Product } from "./restaurant-menu"
import CurrencyDisplay from "./currency-display"

interface ProductCardProps {
  product: Product
  onAddToCart: () => void
  onClick: () => void
  inStock?: boolean
  stockQuantity?: number | null
  showStock?: boolean
}

export default function ProductCard({
  product,
  onAddToCart,
  onClick,
  inStock = true,
  stockQuantity = null,
  showStock = false,
}: ProductCardProps) {
  return (
    <Card
      className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${!inStock ? "opacity-70" : ""}`}
      onClick={onClick}
    >
      <div className="relative h-40 w-full">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

        {showStock && !inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm px-3 py-1">
              Out of Stock
            </Badge>
          </div>
        )}

        {showStock && inStock && stockQuantity !== null && stockQuantity <= 5 && (
          <div className="absolute top-2 right-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {stockQuantity} left
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Low stock available</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
          <div className="font-bold text-lg">
            <CurrencyDisplay amount={product.price} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart()
          }}
          className="w-full"
          disabled={!inStock}
        >
          <Plus className="h-4 w-4 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}

