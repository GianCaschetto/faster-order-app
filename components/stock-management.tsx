"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Save, Search, Package2, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { branches } from "./restaurant-menu";
import { Badge } from "@/components/ui/badge";

export type StockItem = {
  id: string;
  productId: string;
  productName: string;
  branchId: string;
  quantity: number;
};

// Default stock data
export const defaultStock: StockItem[] = [
  // Downtown branch
  {
    id: "1-garlic-bread",
    productId: "garlic-bread",
    productName: "Garlic Bread",
    branchId: "1",
    quantity: 25,
  },
  {
    id: "1-caesar-salad",
    productId: "caesar-salad",
    productName: "Caesar Salad",
    branchId: "1",
    quantity: 15,
  },
  {
    id: "1-margherita-pizza",
    productId: "margherita-pizza",
    productName: "Margherita Pizza",
    branchId: "1",
    quantity: 20,
  },
  {
    id: "1-spaghetti-bolognese",
    productId: "spaghetti-bolognese",
    productName: "Spaghetti Bolognese",
    branchId: "1",
    quantity: 18,
  },
  {
    id: "1-grilled-salmon",
    productId: "grilled-salmon",
    productName: "Grilled Salmon",
    branchId: "1",
    quantity: 12,
  },
  {
    id: "1-chocolate-cake",
    productId: "chocolate-cake",
    productName: "Chocolate Cake",
    branchId: "1",
    quantity: 10,
  },
  {
    id: "1-tiramisu",
    productId: "tiramisu",
    productName: "Tiramisu",
    branchId: "1",
    quantity: 8,
  },
  {
    id: "1-soft-drink",
    productId: "soft-drink",
    productName: "Soft Drink",
    branchId: "1",
    quantity: 50,
  },
  {
    id: "1-fresh-juice",
    productId: "fresh-juice",
    productName: "Fresh Juice",
    branchId: "1",
    quantity: 20,
  },

  // Uptown branch
  {
    id: "2-garlic-bread",
    productId: "garlic-bread",
    productName: "Garlic Bread",
    branchId: "2",
    quantity: 18,
  },
  {
    id: "2-caesar-salad",
    productId: "caesar-salad",
    productName: "Caesar Salad",
    branchId: "2",
    quantity: 12,
  },
  {
    id: "2-margherita-pizza",
    productId: "margherita-pizza",
    productName: "Margherita Pizza",
    branchId: "2",
    quantity: 15,
  },
  {
    id: "2-spaghetti-bolognese",
    productId: "spaghetti-bolognese",
    productName: "Spaghetti Bolognese",
    branchId: "2",
    quantity: 10,
  },
  {
    id: "2-grilled-salmon",
    productId: "grilled-salmon",
    productName: "Grilled Salmon",
    branchId: "2",
    quantity: 8,
  },
  {
    id: "2-chocolate-cake",
    productId: "chocolate-cake",
    productName: "Chocolate Cake",
    branchId: "2",
    quantity: 15,
  },
  {
    id: "2-tiramisu",
    productId: "tiramisu",
    productName: "Tiramisu",
    branchId: "2",
    quantity: 12,
  },
  {
    id: "2-soft-drink",
    productId: "soft-drink",
    productName: "Soft Drink",
    branchId: "2",
    quantity: 40,
  },
  {
    id: "2-fresh-juice",
    productId: "fresh-juice",
    productName: "Fresh Juice",
    branchId: "2",
    quantity: 15,
  },

  // Westside branch
  {
    id: "3-garlic-bread",
    productId: "garlic-bread",
    productName: "Garlic Bread",
    branchId: "3",
    quantity: 22,
  },
  {
    id: "3-caesar-salad",
    productId: "caesar-salad",
    productName: "Caesar Salad",
    branchId: "3",
    quantity: 10,
  },
  {
    id: "3-margherita-pizza",
    productId: "margherita-pizza",
    productName: "Margherita Pizza",
    branchId: "3",
    quantity: 18,
  },
  {
    id: "3-spaghetti-bolognese",
    productId: "spaghetti-bolognese",
    productName: "Spaghetti Bolognese",
    branchId: "3",
    quantity: 15,
  },
  {
    id: "3-grilled-salmon",
    productId: "grilled-salmon",
    productName: "Grilled Salmon",
    branchId: "3",
    quantity: 10,
  },
  {
    id: "3-chocolate-cake",
    productId: "chocolate-cake",
    productName: "Chocolate Cake",
    branchId: "3",
    quantity: 12,
  },
  {
    id: "3-tiramisu",
    productId: "tiramisu",
    productName: "Tiramisu",
    branchId: "3",
    quantity: 10,
  },
  {
    id: "3-soft-drink",
    productId: "soft-drink",
    productName: "Soft Drink",
    branchId: "3",
    quantity: 45,
  },
  {
    id: "3-fresh-juice",
    productId: "fresh-juice",
    productName: "Fresh Juice",
    branchId: "3",
    quantity: 18,
  },
];

const formSchema = z.object({
  branch: z.string().min(1, { message: "Please select a branch" }),
  search: z.string().optional(),
});

export default function StockManagement() {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [filteredStock, setFilteredStock] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: "1",
      search: "",
    },
  });

  useEffect(() => {
    // Load stock from localStorage if available
    const savedStock = localStorage.getItem("restaurantStock");
    if (savedStock) {
      try {
        const parsedStock = JSON.parse(savedStock);
        setStock(parsedStock);
      } catch (error) {
        console.error("Error parsing saved stock:", error);
        setStock(defaultStock);
      }
    } else {
      setStock(defaultStock);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Filter stock based on selected branch and search term
    const branch = form.watch("branch");
    const search = form.watch("search") || "";

    let filtered = [...stock];

    if (branch && branch !== "all") {
      filtered = filtered.filter((item) => item.branchId === branch);
    }

    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter((item) =>
        item.productName.toLowerCase().includes(searchLower)
      );
    }

    setFilteredStock(filtered);
  }, [stock, form.watch("branch"), form.watch("search")]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 0) return;

    setStock((prevStock) =>
      prevStock.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleSaveStock = () => {
    setIsLoading(true);

    // Save to localStorage
    localStorage.setItem("restaurantStock", JSON.stringify(stock));

    toast({
      title: "Stock updated",
      description: "The inventory has been updated successfully.",
    });

    setIsLoading(false);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Inventory Management
        </h2>
        <Button onClick={handleSaveStock} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Branch Inventory</CardTitle>
          <CardDescription>
            Manage stock levels for each product across all branches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Branch</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Branches</SelectItem>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Search Products</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Search by product name..."
                          {...field}
                          className="pl-9"
                        />
                      </FormControl>
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStock.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-6 text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Package2 className="h-8 w-8 mb-2" />
                        <p>No inventory items found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStock.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.productName}
                      </TableCell>
                      <TableCell>
                        {branches.find((branch) => branch.id === item.branchId)
                          ?.name || item.branchId}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                Number.parseInt(e.target.value) || 0
                              )
                            }
                            className="w-16 mx-2 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            item.quantity > 10
                              ? "default"
                              : item.quantity > 5
                              ? "default"
                              : "destructive"
                          }
                        >
                          {item.quantity > 10
                            ? "In Stock"
                            : item.quantity > 5
                            ? "Low Stock"
                            : "Critical"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredStock.length} items displayed
          </p>
          <Button onClick={handleSaveStock} disabled={isLoading}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
