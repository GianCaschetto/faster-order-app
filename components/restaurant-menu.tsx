"use client";

import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ProductCard from "./product-card";
import CartDrawer from "./cart-drawer";
import ProductModal from "./product-modal";
import RestaurantSchedule, {
  defaultSchedule,
  type WeekSchedule,
  type BranchSchedule,
} from "./restaurant-schedule";
import { type StockItem } from "./stock-management";
import FloatingCartButton from "./floating-cart-button";
import { SiteFooter } from "./site-footer";
import { categories, defaultStock, products } from "@/lib/mock-data";
import { SiteHeader } from "./site-header";

// Types
export type Extra = {
  id: string;
  name: string;
  price: number;
  min?: number;
  max?: number;
  required?: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: {
    src: string;
    width: number;
    height: number;
  };
  categoryId: string;
  extras?: Extra[];
  stockId?: string;
  extraGroupIds?: string[];
};

export type Category = {
  id: string;
  name: string;
};

export type SelectedExtra = {
  extraId: string;
  name: string;
  price: number;
  quantity?: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedExtras: SelectedExtra[];
};

export type Branch = {
  id: string;
  name: string;
  address: string;
};

// Function to get branches from localStorage or use defaults
export const defaultBranches = [
  { id: "1", name: "Centro", address: "123 Calle Principal" },
  { id: "2", name: "Norte", address: "456 Calle Elm" },
  { id: "3", name: "Oeste", address: "789 Calle Oak" },
];

export const getBranches = () => defaultBranches;

// Export branches for use in other components
export const branches = getBranches();

export default function RestaurantMenu() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [branchSchedules, setBranchSchedules] = useState<BranchSchedule[]>([]);
  const [currentBranchSchedule, setCurrentBranchSchedule] =
    useState<WeekSchedule>(defaultSchedule);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [availableBranches, setAvailableBranches] =
    useState<Branch[]>(branches);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // First effect - Load schedules, stock, and branches from localStorage only once on component mount
  useEffect(() => {
    // Load branches from localStorage
    setAvailableBranches(getBranches());

    // Load branch schedules from localStorage if available
    const savedBranchSchedules = localStorage.getItem("branchSchedules");
    if (savedBranchSchedules) {
      try {
        const parsedSchedules = JSON.parse(savedBranchSchedules);
        setBranchSchedules(parsedSchedules);
      } catch (error) {
        console.error("Error parsing saved branch schedules:", error);
        // Initialize with default schedules for all branches
        const defaultBranchSchedules = getBranches().map((branch) => ({
          branchId: branch.id,
          schedule: [...defaultSchedule], // Create a copy of the default schedule
        }));
        setBranchSchedules(defaultBranchSchedules);
      }
    } else {
      // Initialize with default schedules for all branches
      const defaultBranchSchedules = getBranches().map((branch) => ({
        branchId: branch.id,
        schedule: [...defaultSchedule], // Create a copy of the default schedule
      }));
      setBranchSchedules(defaultBranchSchedules);
    }

    // Load stock from localStorage if available
    const savedStock = localStorage.getItem("restaurantStock");
    if (savedStock) {
      setStock(JSON.parse(savedStock));
    } else {
      setStock(defaultStock);
    }
  }, []);

  // Update current branch schedule when selected branch changes or branch schedules are loaded
  useEffect(() => {
    if (selectedBranch && branchSchedules.length > 0) {
      const branchSchedule = branchSchedules.find(
        (bs) => bs.branchId === selectedBranch
      );
      if (branchSchedule) {
        setCurrentBranchSchedule(branchSchedule.schedule);
      } else {
        setCurrentBranchSchedule(defaultSchedule);
      }
    } else if (branchSchedules.length > 0) {
      // If no branch is selected, use the first branch's schedule
      setCurrentBranchSchedule(branchSchedules[0].schedule);
    } else {
      setCurrentBranchSchedule(defaultSchedule);
    }
  }, [selectedBranch, branchSchedules]);

  // Check if restaurant is open based on current branch schedule
  useEffect(() => {
    // Check if restaurant is currently open
    const checkIfOpen = () => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const now = new Date();
      const dayName = days[now.getDay()];

      const todaySchedule = currentBranchSchedule.find(
        (day) => day.day === dayName
      );
      if (todaySchedule && !todaySchedule.isClosed) {
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [openHour, openMinute] = todaySchedule.openTime
          .split(":")
          .map(Number);
        const [closeHour, closeMinute] = todaySchedule.closeTime
          .split(":")
          .map(Number);

        const openTimeMinutes = openHour * 60 + openMinute;
        const closeTimeMinutes = closeHour * 60 + closeMinute;

        setIsRestaurantOpen(
          currentTime >= openTimeMinutes && currentTime < closeTimeMinutes
        );
      } else {
        setIsRestaurantOpen(false);
      }
    };

    checkIfOpen();
    // Check every minute
    const interval = setInterval(checkIfOpen, 60000);

    return () => clearInterval(interval);
  }, [currentBranchSchedule]); // Depend on currentBranchSchedule

  // Listen for branch changes in localStorage
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "restaurantBranches") {
        setAvailableBranches(getBranches());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Check if a product is in stock at the selected branch
  const isInStock = (product: Product) => {
    if (!selectedBranch || !product.stockId) return true;

    const stockItem = stock.find(
      (item) =>
        item.productId === product.stockId && item.branchId === selectedBranch
    );

    return stockItem ? stockItem.quantity > 0 : false;
  };

  // Get stock quantity for a product at the selected branch
  const getStockQuantity = (product: Product) => {
    if (!selectedBranch || !product.stockId) return null;

    const stockItem = stock.find(
      (item) =>
        item.productId === product.stockId && item.branchId === selectedBranch
    );

    return stockItem ? stockItem.quantity : 0;
  };

  const addToCart = (
    product: Product,
    quantity: number,
    selectedExtras: SelectedExtra[] = []
  ) => {
    // Check if product is in stock
    if (!isInStock(product)) {
      return;
    }

    // Check if we have enough stock
    const stockQuantity = getStockQuantity(product);
    if (stockQuantity !== null && quantity > stockQuantity) {
      quantity = stockQuantity; // Limit to available stock
    }

    if (quantity <= 0) return;

    setCartItems((prevItems) => {
      // Check if the product with the exact same extras already exists in the cart
      const existingItemIndex = prevItems.findIndex((item) => {
        if (item.product.id !== product.id) return false;

        // Check if extras match (including quantities)
        if (item.selectedExtras.length !== selectedExtras.length) return false;

        // Check if all extras match with same quantities
        return selectedExtras.every((selectedExtra) =>
          item.selectedExtras.some(
            (itemExtra) =>
              itemExtra.extraId === selectedExtra.extraId &&
              itemExtra.quantity === selectedExtra.quantity
          )
        );
      });

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem = { product, quantity, selectedExtras };
        setIsCartOpen(true); // Open cart drawer after adding item
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (
    productId: string,
    selectedExtras: SelectedExtra[] = []
  ) => {
    setCartItems((prevItems) => {
      // If no extras specified, remove all items with this product ID
      if (selectedExtras.length === 0) {
        return prevItems.filter((item) => item.product.id !== productId);
      }

      // Find the specific item with matching extras
      const itemIndex = prevItems.findIndex((item) => {
        if (item.product.id !== productId) return false;

        // Check if extras match
        if (item.selectedExtras.length !== selectedExtras.length) return false;

        // Check if all extras match
        return selectedExtras.every((selectedExtra) =>
          item.selectedExtras.some(
            (itemExtra) => itemExtra.extraId === selectedExtra.extraId
          )
        );
      });

      if (itemIndex >= 0) {
        return prevItems.filter((_, index) => index !== itemIndex);
      }

      return prevItems;
    });
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
      return;
    }

    // Check if we have enough stock
    const item = cartItems[index];
    const stockQuantity = getStockQuantity(item.product);
    if (stockQuantity !== null && quantity > stockQuantity) {
      quantity = stockQuantity; // Limit to available stock
    }

    setCartItems((prevItems) =>
      prevItems.map((prevItem, i) =>
        i === index ? { ...prevItem, quantity } : prevItem
      )
    );
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const extrasTotal = item.selectedExtras.reduce(
      (sum, extra) => sum + extra.price * (extra.quantity || 1),
      0
    );
    return total + (item.product.price + extrasTotal) * item.quantity;
  }, 0);

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  return (
    <>
      <SiteHeader isMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="mt-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Demo Restaurante</h1>
            <p className="text-muted-foreground">
              Ordena con facilidad y rapidez
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Select value={selectedBranch} onValueChange={setSelectedBranch}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar sucursal" />
              </SelectTrigger>
              <SelectContent>
                {availableBranches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={() => setIsCartOpen(true)}
              className="w-full sm:w-auto flex gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Carrito ({cartItemCount})</span>
            </Button>
          </div>
        </div>

        <div>
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="mb-4 flex flex-wrap h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex-grow sm:flex-grow-0"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products
                    .filter((product) => product.categoryId === category.id)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={() => openProductModal(product)}
                        onClick={() => openProductModal(product)}
                        inStock={isInStock(product)}
                        stockQuantity={getStockQuantity(product)}
                        showStock={!!selectedBranch}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Schedule moved to the bottom of the page */}
        <div className="mt-12 border-t pt-6">
          <RestaurantSchedule
            schedule={currentBranchSchedule}
            branchId={selectedBranch}
          />
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={closeProductModal}
            onAddToCart={addToCart}
            inStock={isInStock(selectedProduct)}
            stockQuantity={getStockQuantity(selectedProduct)}
            showStock={!!selectedBranch}
          />
        )}

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          cartTotal={cartTotal}
          selectedBranch={availableBranches.find(
            (b) => b.id === selectedBranch
          )}
          isRestaurantOpen={isRestaurantOpen}
        />

        {/* Add the floating cart button for mobile */}
        {!isMobileMenuOpen && (
          <FloatingCartButton cartItems={cartItems} openCart={openCart} />
        )}
      </div>
      <SiteFooter />
    </>
  );
}
