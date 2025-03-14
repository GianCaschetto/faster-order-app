"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, X, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import type { Product, Extra, SelectedExtra } from "./restaurant-menu";
import CurrencyDisplay from "./currency-display";

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

  // Extra group type
  type ExtraGroup = {
    id: string;
    name: string;
    description: string;
    categoryIds: string[];
    extras: Extra[];
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [extraGroups, setExtraGroups] = useState<ExtraGroup[]>([]);
  const [groupExtras, setGroupExtras] = useState<Extra[]>([]);

  useEffect(() => {
    // Load extra groups from localStorage
    const savedExtraGroups = localStorage.getItem("restaurantExtraGroups");
    if (savedExtraGroups && product.extraGroupIds?.length) {
      try {
        const groups = JSON.parse(savedExtraGroups) as ExtraGroup[];
        setExtraGroups(groups);

        // Get all extras from the selected groups
        const selectedGroups = groups.filter((group) =>
          product.extraGroupIds?.includes(group.id)
        );

        // Flatten all extras from selected groups
        const allGroupExtras = selectedGroups.flatMap((group) => group.extras);

        // Remove duplicates based on id
        const uniqueExtras = allGroupExtras.filter(
          (extra, index, self) =>
            index === self.findIndex((e) => e.id === extra.id)
        );

        setGroupExtras(uniqueExtras);
      } catch (error) {
        console.error("Error parsing saved extra groups:", error);
      }
    }
  }, [product.extraGroupIds]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      // Don't allow more than stock quantity if available
      if (stockQuantity !== null && newQuantity > stockQuantity) {
        newQuantity = stockQuantity;
      }
      setQuantity(newQuantity);
    }
  };

  const handleExtraQuantityChange = (extra: Extra, quantity: number) => {
    // Get min and max values (default to 0 and 10 if not specified)
    const min = extra.min ?? 0;
    const max = extra.max ?? 10;

    // Ensure quantity is within bounds
    if (quantity < min) quantity = min;
    if (quantity > max) quantity = max;

    setSelectedExtras((prev) => {
      const existingIndex = prev.findIndex((item) => item.extraId === extra.id);

      if (existingIndex >= 0) {
        // If quantity is 0 and it's not required, remove it
        if (quantity === 0 && !(extra.required ?? false)) {
          return prev.filter((item) => item.extraId !== extra.id);
        }

        // Otherwise update the quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: quantity,
          price: extra.price,
        };
        return updated;
      } else if (quantity > 0) {
        // Add new extra with quantity
        return [
          ...prev,
          {
            extraId: extra.id,
            name: extra.name,
            price: extra.price,
            quantity: quantity,
          },
        ];
      }

      return prev;
    });
  };

  // Initialize required extras with min quantity
  useEffect(() => {
    const allExtras = [...(product.extras || []), ...groupExtras];
    const requiredExtras = allExtras.filter((extra) => extra.required);

    if (requiredExtras.length > 0) {
      setSelectedExtras((prev) => {
        const newExtras = [...prev];

        for (const extra of requiredExtras) {
          // Only add if not already in the selection
          if (!newExtras.some((e) => e.extraId === extra.id)) {
            newExtras.push({
              extraId: extra.id,
              name: extra.name,
              price: extra.price,
              quantity: extra.min ?? 1,
            });
          }
        }

        return newExtras;
      });
    }
  }, [product.extras, groupExtras]);

  const calculateTotalPrice = () => {
    const extrasTotal = selectedExtras.reduce(
      (sum, extra) => sum + extra.price * (extra.quantity || 1),
      0
    );
    return (product.price + extrasTotal) * quantity;
  };

  const handleAddToCart = () => {
    if (inStock) {
      onAddToCart(product, quantity, selectedExtras);
      onClose();
    }
  };

  // Check if all required extras are selected
  const allRequiredExtrasSelected = () => {
    const allExtras = [...(product.extras || []), ...groupExtras];
    const requiredExtras = allExtras.filter((extra) => extra.required);

    return requiredExtras.every((extra) =>
      selectedExtras.some(
        (selected) =>
          selected.extraId === extra.id &&
          (selected.quantity ?? 1) >= (extra.min ?? 1)
      )
    );
  };

  // Render extra counter with min/max/required handling
  const renderExtraCounter = (extra: Extra) => {
    const selectedExtra = selectedExtras.find(
      (item) => item.extraId === extra.id
    );
    const currentQuantity = selectedExtra?.quantity || 0;
    const min = extra.min ?? 0;
    const max = extra.max ?? 10;
    const isRequired = extra.required ?? false;

    return (
      <div key={extra.id} className="flex items-center justify-between py-2">
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-medium">{extra.name}</span>
            {isRequired && (
              <Badge variant="outline" className="ml-2 text-xs">
                Required
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            +${extra.price.toFixed(2)} each
          </span>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              handleExtraQuantityChange(extra, currentQuantity - 1)
            }
            disabled={
              !inStock ||
              currentQuantity <= min ||
              (isRequired && currentQuantity <= min)
            }
            className="h-8 w-8"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-10 text-center">{currentQuantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              handleExtraQuantityChange(extra, currentQuantity + 1)
            }
            disabled={!inStock || currentQuantity >= max}
            className="h-8 w-8"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{product.name}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="relative h-48 w-full rounded-md overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />

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
                disabled={
                  !inStock ||
                  (stockQuantity !== null && quantity >= stockQuantity)
                }
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
                <div className="space-y-1">
                  {product.extras.map((extra) => renderExtraCounter(extra))}
                </div>
              </div>
            </>
          )}

          {/* Group Extras */}
          {groupExtras.length > 0 && (
            <>
              <Separator className="my-4" />
              <div>
                <h3 className="font-medium mb-2">Group Extras</h3>
                <div className="space-y-1">
                  {groupExtras.map((extra) => renderExtraCounter(extra))}
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
            <Button
              onClick={handleAddToCart}
              disabled={!inStock || !allRequiredExtrasSelected()}
            >
              {!inStock
                ? "Out of Stock"
                : !allRequiredExtrasSelected()
                ? "Select Required Extras"
                : "Add to Cart"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
