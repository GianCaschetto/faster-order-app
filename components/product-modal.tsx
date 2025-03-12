"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, X, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { Product, Extra, SelectedExtra } from "./restaurant-menu"
import CurrencyDisplay from "./currency-display"

interface ProductModalProps {
  product: Product
  onClose: () => void
  onAddToCart: (product: Product, quantity: number, selectedExtras: SelectedExtra[]) => void
  inStock?: boolean
  stockQuantity?: number | null
  showStock?: boolean
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  inStock = true,
  stockQuantity = null,
  showStock = false,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtra[]>([])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      // Don't allow more than stock quantity if available
      if (stockQuantity !== null && newQuantity > stockQuantity) {
        newQuantity = stockQuantity
      }
      setQuantity(newQuantity)
    }
  }

  const handleExtraToggle = (extra: Extra) => {
    setSelectedExtras((prev) => {
      const isSelected = prev.some((item) => item.extraId === extra.id)

      if (isSelected) {
        return prev.filter((item) => item.extraId !== extra.id)
      } else {
        return [
          ...prev,
          {
            extraId: extra.id,
            name: extra.name,
            price: extra.price,
          },
        ]
      }
    })
  }

  const calculateTotalPrice = () => {
    const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0)
    return (product.price + extrasTotal) * quantity
  }

  const handleAddToCart = () => {
    if (inStock) {
      onAddToCart(product, quantity, selectedExtras)
      onClose()
    }
  }

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{product.name}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="relative h-48 w-full rounded-md overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />

            {showStock && !inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-sm px-3 py-1">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <div>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="text-xl font-bold mt-2">
              <CurrencyDisplay amount={product.price} />
            </p>

            {showStock && inStock && stockQuantity !== null && (
              <div className="mt-1 flex items-center">
                <span className="text-sm text-muted-foreground">
                  {stockQuantity > 10 ? (
                    "In Stock"
                  ) : stockQuantity > 5 ? (
                    `Only ${stockQuantity} remaining`
                  ) : (
                    <span className="flex items-center text-yellow-700">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Low Stock: {stockQuantity} left
                    </span>
                  )}
                </span>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || !inStock}
                className="h-8 w-8"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={!inStock || (stockQuantity !== null && quantity >= stockQuantity)}
                className="h-8 w-8"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {product.extras && product.extras.length > 0 && (
            <>
              <Separator />

              <div>
                <h3 className="font-medium mb-2">Extras</h3>
                <div className="space-y-2">
                  {product.extras.map((extra) => (
                    <div key={extra.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={extra.id}
                          checked={selectedExtras.some((item) => item.extraId === extra.id)}
                          onCheckedChange={() => handleExtraToggle(extra)}
                          disabled={!inStock}
                        />
                        <Label htmlFor={extra.id} className="cursor-pointer">
                          {extra.name}
                        </Label>
                      </div>
                      <span className="text-sm">+${extra.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-muted-foreground">Total Price</span>
              <p className="text-xl font-bold">
                <CurrencyDisplay amount={calculateTotalPrice()} />
              </p>
            </div>
            <Button onClick={handleAddToCart} disabled={!inStock}>
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

