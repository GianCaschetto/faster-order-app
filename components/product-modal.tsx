"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Product, SelectedExtra } from "./restaurant-menu";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    selectedExtras: SelectedExtra[]
  ) => void;
  inStock?: boolean;
  stockQuantity?: number | null;
  showStock?: boolean;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  inStock = true,
  stockQuantity = null,
  showStock = false,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<SelectedExtra[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize required extras with their minimum quantity
  useEffect(() => {
    if (product.extras) {
      const requiredExtras = product.extras
        .filter((extra) => extra.required)
        .map((extra) => ({
          extraId: extra.id,
          name: extra.name,
          price: extra.price,
          quantity: extra.min || 1,
        }));

      setSelectedExtras(requiredExtras);
    }
  }, [product]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (stockQuantity !== null && quantity >= stockQuantity) {
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleExtraQuantityChange = (
    extraId: string,
    extraName: string,
    extraPrice: number,
    newQuantity: number
  ) => {
    // Find the extra in the product
    const extra = product.extras?.find((e) => e.id === extraId);
    if (!extra) return;

    // Enforce min/max constraints
    if (extra.min !== undefined && newQuantity < extra.min) {
      newQuantity = extra.min;
    }
    if (extra.max !== undefined && newQuantity > extra.max) {
      newQuantity = extra.max;
    }

    setSelectedExtras((prev) => {
      // Check if this extra is already selected
      const existingIndex = prev.findIndex((e) => e.extraId === extraId);

      if (existingIndex >= 0) {
        // If quantity is 0 and it's not required, remove it
        if (newQuantity === 0 && !extra.required) {
          return prev.filter((_, i) => i !== existingIndex);
        }

        // Otherwise update the quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQuantity,
        };
        return updated;
      } else if (newQuantity > 0) {
        // Add new extra with quantity
        return [
          ...prev,
          {
            extraId,
            name: extraName,
            price: extraPrice,
            quantity: newQuantity,
          },
        ];
      }

      return prev;
    });
  };

  const incrementExtraQuantity = (
    extraId: string,
    extraName: string,
    extraPrice: number
  ) => {
    const extra = product.extras?.find((e) => e.id === extraId);
    if (!extra) return;

    const currentExtra = selectedExtras.find((e) => e.extraId === extraId);
    const currentQuantity = currentExtra?.quantity || 0;

    // Don't increment if already at max
    if (extra.max !== undefined && currentQuantity >= extra.max) return;

    handleExtraQuantityChange(
      extraId,
      extraName,
      extraPrice,
      currentQuantity + 1
    );
  };

  const decrementExtraQuantity = (
    extraId: string,
    extraName: string,
    extraPrice: number
  ) => {
    const extra = product.extras?.find((e) => e.id === extraId);
    if (!extra) return;

    const currentExtra = selectedExtras.find((e) => e.extraId === extraId);
    const currentQuantity = currentExtra?.quantity || 0;

    // Don't decrement below min for required extras
    if (
      extra.required &&
      extra.min !== undefined &&
      currentQuantity <= extra.min
    )
      return;

    handleExtraQuantityChange(
      extraId,
      extraName,
      extraPrice,
      currentQuantity - 1
    );
  };

  const getExtraQuantity = (extraId: string): number => {
    const extra = selectedExtras.find((e) => e.extraId === extraId);
    return extra?.quantity || 0;
  };

  const calculateTotalPrice = () => {
    const extrasTotal = selectedExtras.reduce(
      (sum, extra) => sum + extra.price * (extra.quantity || 1),
      0
    );
    return (product.price + extrasTotal) * quantity;
  };

  // Check if all required extras are selected with their minimum quantities
  const areRequiredExtrasSelected = (): boolean => {
    if (!product.extras) return true;

    return product.extras
      .filter((extra) => extra.required)
      .every((extra) => {
        const selectedExtra = selectedExtras.find(
          (e) => e.extraId === extra.id
        );
        return (
          selectedExtra && (selectedExtra.quantity ?? 1) >= (extra.min || 1)
        );
      });
  };

  const handleAddToCart = () => {
    if (!inStock) return;
    onAddToCart(product, quantity, selectedExtras);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{product.name}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="mt-2 text-lg font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {showStock && (
            <div>
              {inStock ? (
                <Badge variant="outline" className="bg-green-50">
                  In Stock{" "}
                  {stockQuantity !== null && `(${stockQuantity} available)`}
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-600">
                  Out of Stock
                </Badge>
              )}
            </div>
          )}

          <Separator />

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center mt-1.5">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min={1}
                max={stockQuantity || undefined}
                className="w-16 mx-2 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={stockQuantity !== null && quantity >= stockQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {product.extras && product.extras.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Extras</h3>
              <div className="space-y-2">
                {product.extras.map((extra) => (
                  <div
                    key={extra.id}
                    className="flex items-center justify-between p-2 rounded-md border"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span>{extra.name}</span>
                        {extra.required && (
                          <Badge variant="secondary" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        +${extra.price.toFixed(2)}
                        {extra.min !== undefined && extra.max !== undefined && (
                          <span className="text-xs ml-1">
                            {extra.min === 0 && extra.max === 1
                              ? "(Optional)"
                              : `(Min: ${extra.min}, Max: ${extra.max})`}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          decrementExtraQuantity(
                            extra.id,
                            extra.name,
                            extra.price
                          )
                        }
                        disabled={
                          (extra.required &&
                            getExtraQuantity(extra.id) <= (extra.min || 1)) ||
                          getExtraQuantity(extra.id) === 0
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">
                        {getExtraQuantity(extra.id)}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          incrementExtraQuantity(
                            extra.id,
                            extra.name,
                            extra.price
                          )
                        }
                        disabled={
                          extra.max !== undefined &&
                          getExtraQuantity(extra.id) >= extra.max
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="flex justify-between items-center">
            <span className="font-semibold">Total:</span>
            <span className="text-lg font-bold">
              ${calculateTotalPrice().toFixed(2)}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!inStock || !areRequiredExtrasSelected()}
            className="w-full"
          >
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
