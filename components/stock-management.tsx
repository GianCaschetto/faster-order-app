"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Save, Search, Package2, Minus, Plus, Store } from "lucide-react";

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
import { defaultStock } from "@/lib/mock-data";

export type StockItem = {
  id: string;
  productId: string;
  productName: string;
  branchId: string;
  quantity: number;
};

const formSchema = z.object({
  branch: z.string().min(1, { message: "Por favor, seleccione una sucursal" }),
  search: z.string().optional(),
});

// const stockItemSchema = z.object({
//   id: z.string(),
//   productId: z.string(),
//   productName: z.string(),
//   branchId: z.string(),
//   quantity: z.number().min(0, { message: "Quantity cannot be negative" }),
// });

interface StockManagementProps {
  selectedBranchId?: string;
}

export default function StockManagement({
  selectedBranchId = "all",
}: StockManagementProps) {
  const [stock, setStock] = useState<StockItem[]>([]);
  const [filteredStock, setFilteredStock] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      branch: selectedBranchId === "all" ? "1" : selectedBranchId,
      search: "",
    },
  });

  // Update form when selectedBranchId changes
  useEffect(() => {
    if (selectedBranchId !== "all") {
      form.setValue("branch", selectedBranchId);
    }
  }, [selectedBranchId, form]);

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

    // Load products to get branch-specific products
    const savedProducts = localStorage.getItem("restaurantProducts");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error("Error parsing saved products:", error);
      }
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

    // Filter out products that aren't available in the selected branch
    if (products.length > 0 && branch !== "all") {
      const branchProducts = products
        .filter(
          (product) => product.branchIds && product.branchIds.includes(branch)
        )
        .map((product) => product.stockId);

      filtered = filtered.filter((item) =>
        branchProducts.includes(item.productId)
      );
    }

    setFilteredStock(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stock, form.watch("branch"), form.watch("search"), products]);

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
      title: "Inventario actualizado",
      description: "El inventario se ha actualizado correctamente.",
    });

    setIsLoading(false);
  };

  const selectedBranchName =
    branches.find((b) => b.id === form.watch("branch"))?.name || "Todas las Sucursales";

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Gestión de inventario
          </h2>
          <Badge variant="outline" className="mt-1 flex items-center gap-1">
            <Store className="h-3 w-3 mr-1" />
            {selectedBranchName}
          </Badge>
        </div>
        <Button onClick={handleSaveStock} disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          Guardar cambios
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventario de sucursales</CardTitle>
          <CardDescription>
            Administra los niveles de stock para cada producto en todas las
            sucursales
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
                    <FormLabel>Sucursal</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={selectedBranchId !== "all"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar sucursal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedBranchId === "all" && (
                          <SelectItem value="all">
                            Todas las sucursales
                          </SelectItem>
                        )}
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
                    <FormLabel>Buscar productos</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="Buscar por nombre de producto..."
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
                  <TableHead>Producto</TableHead>
                  <TableHead>Sucursal</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
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
                        <p>No se encontraron productos en el inventario</p>
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
                              ? "secondary"
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
            {filteredStock.length} productos mostrados
          </p>
          <Button onClick={handleSaveStock} disabled={isLoading}>
            Guardar cambios
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
