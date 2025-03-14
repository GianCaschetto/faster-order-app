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
} from "./restaurant-schedule";
import { type StockItem, defaultStock } from "./stock-management";
import FloatingCartButton from "./floating-cart-button";

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
  image: string;
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

// Sample data
const categories: Category[] = [
  { id: "starters", name: "Starters" },
  { id: "mains", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
];

const products: Product[] = [
  {
    id: "1",
    name: "Garlic Bread",
    description: "Freshly baked bread with garlic butter",
    price: 5.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "starters",
    stockId: "garlic-bread",
    extras: [
      { id: "extra-cheese", name: "Extra Cheese", price: 1.5, min: 0, max: 3 },
      { id: "herbs", name: "Italian Herbs", price: 0.75, min: 0, max: 2 },
    ],
  },
  {
    id: "2",
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with Caesar dressing",
    price: 8.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "starters",
    stockId: "caesar-salad",
    extras: [
      { id: "chicken", name: "Grilled Chicken", price: 2.5, min: 0, max: 2 },
      { id: "croutons", name: "Extra Croutons", price: 0.5, min: 0, max: 2 },
      { id: "parmesan", name: "Parmesan Cheese", price: 1.0, min: 0, max: 2 },
    ],
  },
  {
    id: "3",
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce and mozzarella",
    price: 12.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "mains",
    stockId: "margherita-pizza",
    extras: [
      {
        id: "extra-cheese-pizza",
        name: "Extra Cheese",
        price: 2.0,
        min: 0,
        max: 3,
      },
      { id: "mushrooms", name: "Mushrooms", price: 1.5, min: 0, max: 2 },
      { id: "pepperoni", name: "Pepperoni", price: 2.0, min: 0, max: 2 },
      { id: "olives", name: "Olives", price: 1.0, min: 0, max: 2 },
    ],
  },
  {
    id: "4",
    name: "Spaghetti Bolognese",
    description: "Spaghetti with rich meat sauce",
    price: 14.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "mains",
    stockId: "spaghetti-bolognese",
    extras: [
      { id: "extra-sauce", name: "Extra Sauce", price: 1.5, min: 0, max: 2 },
      {
        id: "parmesan-pasta",
        name: "Parmesan Cheese",
        price: 1.0,
        min: 0,
        max: 2,
        required: true,
      },
      {
        id: "garlic-bread-side",
        name: "Side of Garlic Bread",
        price: 3.99,
        min: 0,
        max: 1,
      },
    ],
  },
  {
    id: "5",
    name: "Grilled Salmon",
    description: "Fresh salmon fillet with lemon butter",
    price: 18.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "mains",
    stockId: "grilled-salmon",
    extras: [
      {
        id: "extra-sauce-salmon",
        name: "Extra Lemon Butter",
        price: 1.0,
        min: 0,
        max: 2,
      },
      {
        id: "asparagus",
        name: "Side of Asparagus",
        price: 3.5,
        min: 0,
        max: 1,
      },
      {
        id: "mashed-potatoes",
        name: "Mashed Potatoes",
        price: 2.99,
        min: 0,
        max: 1,
      },
    ],
  },
  {
    id: "6",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with ganache",
    price: 6.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "desserts",
    stockId: "chocolate-cake",
    extras: [
      {
        id: "ice-cream",
        name: "Vanilla Ice Cream",
        price: 1.99,
        min: 0,
        max: 2,
      },
      {
        id: "whipped-cream",
        name: "Whipped Cream",
        price: 0.75,
        min: 0,
        max: 1,
      },
      {
        id: "chocolate-sauce",
        name: "Extra Chocolate Sauce",
        price: 0.5,
        min: 0,
        max: 3,
      },
    ],
  },
  {
    id: "7",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee and mascarpone",
    price: 7.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "desserts",
    stockId: "tiramisu",
    extras: [
      {
        id: "cocoa-powder",
        name: "Extra Cocoa Powder",
        price: 0.25,
        min: 0,
        max: 2,
      },
      { id: "coffee-shot", name: "Espresso Shot", price: 1.5, min: 0, max: 2 },
    ],
  },
  {
    id: "8",
    name: "Soft Drink",
    description: "Choice of cola, lemon-lime, or orange",
    price: 2.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "drinks",
    stockId: "soft-drink",
    extras: [
      { id: "ice", name: "Extra Ice", price: 0.0, min: 0, max: 1 },
      { id: "lemon", name: "Lemon Slice", price: 0.25, min: 0, max: 2 },
    ],
  },
  {
    id: "9",
    name: "Fresh Juice",
    description: "Freshly squeezed orange or apple juice",
    price: 4.99,
    image: "/placeholder.svg?height=100&width=100",
    categoryId: "drinks",
    stockId: "fresh-juice",
    extras: [
      { id: "ginger", name: "Ginger", price: 0.5, min: 0, max: 1 },
      { id: "mint", name: "Fresh Mint", price: 0.5, min: 0, max: 1 },
    ],
  },
];

export const branches: Branch[] = [
  { id: "1", name: "Downtown", address: "123 Main St, Downtown" },
  { id: "2", name: "Uptown", address: "456 High St, Uptown" },
  { id: "3", name: "Westside", address: "789 West Blvd, Westside" },
];

export default function RestaurantMenu() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [schedule, setSchedule] = useState<WeekSchedule>(defaultSchedule);
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(false);
  const [stock, setStock] = useState<StockItem[]>([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  // First effect - Load schedule and stock from localStorage only once on component mount
  useEffect(() => {
    // Load schedule from localStorage if available
    const savedSchedule = localStorage.getItem("restaurantSchedule");
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }

    // Load stock from localStorage if available
    const savedStock = localStorage.getItem("restaurantStock");
    if (savedStock) {
      setStock(JSON.parse(savedStock));
    } else {
      setStock(defaultStock);
    }
  }, []);

  // Second effect - Check if restaurant is open, with proper dependencies
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

      const todaySchedule = schedule.find((day) => day.day === dayName);
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
  }, [schedule]); // Only depend on schedule, not on isRestaurantOpen

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
        return [...prevItems, { product, quantity, selectedExtras }];
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
      prevItems.map((item, i) => (i === index ? { ...item, quantity } : item))
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Our Menu</h1>
          <p className="text-muted-foreground">
            Order delicious food from our restaurant
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
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
            <span>Cart ({cartItemCount})</span>
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
        <RestaurantSchedule schedule={schedule} />
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
        selectedBranch={branches.find((b) => b.id === selectedBranch)}
        isRestaurantOpen={isRestaurantOpen}
      />

      {/* Add the floating cart button for mobile */}
      <FloatingCartButton itemCount={cartItemCount} onClick={openCart} />
    </div>
  );
}
