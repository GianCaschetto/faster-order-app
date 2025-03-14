"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  ArrowUpDown,
  X,
  DollarSign,
  Package,
  ImageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import AdminCurrencyDisplay from "@/components/admin-currency-display";
import ImageGalleryPicker from "@/components/image-gallery-picker";
import { products as mockProducts } from "@/lib/mock-data";
import type { Extra } from "@/components/restaurant-menu";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  extras?: Extra[];
  stockId?: string;
  extraGroupIds?: string[]; // Add this line
};

// Extra group type
type ExtraGroup = {
  id: string;
  name: string;
  description: string;
  categoryIds: string[];
  extras: Extra[];
};

// Product categories
const categories = [
  { id: "starters", name: "Starters" },
  { id: "mains", name: "Main Courses" },
  { id: "desserts", name: "Desserts" },
  { id: "drinks", name: "Drinks" },
  { id: "sides", name: "Side Dishes" },
  { id: "specials", name: "Specials" },
];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductOpen, setIsDeleteProductOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [editingImageField, setEditingImageField] = useState<"new" | "edit">(
    "new"
  );
  const [extraGroups, setExtraGroups] = useState<ExtraGroup[]>([]);

  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    image: "/placeholder.svg?height=200&width=200",
    extras: [],
    extraGroupIds: [],
  });

  // Extra item form state
  const [extraItem, setExtraItem] = useState({ name: "", price: 0 });

  useEffect(() => {
    // In a real app, you would fetch products from an API
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    // Load extra groups from localStorage
    const savedExtraGroups = localStorage.getItem("restaurantExtraGroups");
    if (savedExtraGroups) {
      try {
        setExtraGroups(JSON.parse(savedExtraGroups));
      } catch (error) {
        console.error("Error parsing saved extra groups:", error);
        setExtraGroups([]);
      }
    }
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !categoryFilter || product.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    const newId = `${products.length + 1}`;
    const productToAdd = {
      ...newProduct,
      id: newId,
      stockId: newProduct.name?.toLowerCase().replace(/\s+/g, "-") || newId,
      extras: newProduct.extras || [],
      extraGroupIds: newProduct.extraGroupIds || [],
    } as Product;

    setProducts([...products, productToAdd]);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      image: "/placeholder.svg?height=200&width=200",
      extras: [],
      extraGroupIds: [],
    });
    setIsAddProductOpen(false);
  };

  const handleEditProduct = () => {
    if (!currentProduct) return;

    setProducts(
      products.map((p) => (p.id === currentProduct.id ? currentProduct : p))
    );
    setIsEditProductOpen(false);
  };

  const handleDeleteProduct = () => {
    if (!currentProduct) return;

    setProducts(products.filter((p) => p.id !== currentProduct.id));
    setIsDeleteProductOpen(false);
  };

  const handleAddExtra = () => {
    if (!extraItem.name || extraItem.price <= 0) return;

    const newExtra: Extra = {
      id: `extra-${Date.now()}`,
      name: extraItem.name,
      price: extraItem.price,
    };

    if (isEditProductOpen && currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        extras: [...(currentProduct.extras || []), newExtra],
      });
    } else {
      setNewProduct({
        ...newProduct,
        extras: [...(newProduct.extras || []), newExtra],
      });
    }

    setExtraItem({ name: "", price: 0 });
  };

  const handleRemoveExtra = (extraId: string) => {
    if (isEditProductOpen && currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        extras: currentProduct.extras?.filter((e) => e.id !== extraId) || [],
      });
    } else {
      setNewProduct({
        ...newProduct,
        extras: newProduct.extras?.filter((e) => e.id !== extraId) || [],
      });
    }
  };

  const handleSelectImage = (imageUrl: string) => {
    if (editingImageField === "new") {
      setNewProduct({
        ...newProduct,
        image: imageUrl,
      });
    } else {
      if (currentProduct) {
        setCurrentProduct({
          ...currentProduct,
          image: imageUrl,
        });
      }
    }
  };

  const openGalleryPicker = (type: "new" | "edit") => {
    setEditingImageField(type);
    setIsGalleryOpen(true);
  };

  const ProductForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const product = isEdit ? currentProduct : newProduct;
    const setProduct = isEdit
      ? (value: Partial<Product>) =>
          setCurrentProduct({ ...currentProduct, ...value } as Product)
      : setNewProduct;

    if (!product && isEdit) return null;

    return (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-name" className="text-right">
            Name
          </Label>
          <Input
            id="product-name"
            value={product?.name || ""}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-description" className="text-right">
            Description
          </Label>
          <Textarea
            id="product-description"
            value={product?.description || ""}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-price" className="text-right">
            Price (USD)
          </Label>
          <div className="col-span-3 flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={product?.price || 0}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: Number.parseFloat(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-category" className="text-right">
            Category
          </Label>
          <Select
            value={product?.categoryId || ""}
            onValueChange={(value) =>
              setProduct({ ...product, categoryId: value })
            }
          >
            <SelectTrigger id="product-category" className="col-span-3">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="product-image" className="text-right">
            Image
          </Label>
          <div className="col-span-3 space-y-3">
            <div className="flex gap-2">
              <Input
                id="product-image"
                value={product?.image || ""}
                onChange={(e) =>
                  setProduct({ ...product, image: e.target.value })
                }
                placeholder="/placeholder.svg?height=200&width=200"
                className="flex-1"
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => openGalleryPicker(isEdit ? "edit" : "new")}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Gallery
              </Button>
            </div>

            {product?.image && (
              <div className="relative h-40 w-full border rounded-md overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name || "Product"}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>

        <Separator className="my-2" />

        <div className="grid grid-cols-4 items-start gap-4">
          <div className="text-right">
            <Label>Extras/Add-ons</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Optional items customers can add
            </p>
          </div>

          <div className="col-span-3 space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Extra name"
                value={extraItem.name}
                onChange={(e) =>
                  setExtraItem({ ...extraItem, name: e.target.value })
                }
              />
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Price"
                  className="w-24"
                  value={extraItem.price || ""}
                  onChange={(e) =>
                    setExtraItem({
                      ...extraItem,
                      price: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <Button type="button" onClick={handleAddExtra} size="sm">
                Add
              </Button>
            </div>

            {product?.extras && product.extras.length > 0 ? (
              <div className="space-y-2">
                {product.extras.map((extra) => (
                  <div
                    key={extra.id}
                    className="flex items-center justify-between bg-muted p-2 rounded-md"
                  >
                    <div>
                      <span className="font-medium">{extra.name}</span>
                      <span className="ml-2 text-muted-foreground">
                        +${extra.price.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveExtra(extra.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No extras added yet
              </p>
            )}
          </div>
        </div>
        <Separator className="my-2" />

        <div className="grid grid-cols-4 items-start gap-4">
          <div className="text-right">
            <Label>Extra Groups</Label>
            <p className="text-xs text-muted-foreground mt-1">
              Predefined groups of extras
            </p>
          </div>

          <div className="col-span-3 space-y-4">
            {extraGroups.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No extra groups available. Create them in the Extras Management
                section.
              </p>
            ) : (
              <div className="space-y-2">
                {extraGroups
                  .filter(
                    (group) =>
                      !product?.categoryId ||
                      group.categoryIds.includes(product.categoryId)
                  )
                  .map((group) => (
                    <div key={group.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`group-${group.id}`}
                        checked={(product?.extraGroupIds || []).includes(
                          group.id
                        )}
                        onCheckedChange={(checked) => {
                          const currentGroups = product?.extraGroupIds || [];
                          const newGroups = checked
                            ? [...currentGroups, group.id]
                            : currentGroups.filter((id) => id !== group.id);

                          if (isEdit) {
                            setProduct({
                              ...product,
                              extraGroupIds: newGroups,
                            });
                          } else {
                            setProduct({
                              ...product,
                              extraGroupIds: newGroups,
                            });
                          }
                        }}
                      />
                      <label
                        htmlFor={`group-${group.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {group.name} ({group.extras.length} extras)
                      </label>
                    </div>
                  ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Only groups compatible with the selected category are shown
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your restaurant's menu items
          </p>
        </div>

        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductForm />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddProductOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2">
                    <div className="font-medium mb-1">Category</div>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Checkbox
                          id="all-categories"
                          checked={categoryFilter === null}
                          onCheckedChange={() => setCategoryFilter(null)}
                        />
                        <label
                          htmlFor="all-categories"
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          All Categories
                        </label>
                      </div>

                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={categoryFilter === category.id}
                            onCheckedChange={() =>
                              setCategoryFilter(category.id)
                            }
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      setProducts(
                        [...products].sort((a, b) =>
                          a.name.localeCompare(b.name)
                        )
                      )
                    }
                  >
                    Name (A-Z)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setProducts(
                        [...products].sort((a, b) =>
                          b.name.localeCompare(a.name)
                        )
                      )
                    }
                  >
                    Name (Z-A)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setProducts(
                        [...products].sort((a, b) => a.price - b.price)
                      )
                    }
                  >
                    Price (Low to High)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setProducts(
                        [...products].sort((a, b) => b.price - a.price)
                      )
                    }
                  >
                    Price (High to Low)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>

          {categoryFilter && (
            <div className="mb-4 flex items-center">
              <span className="text-sm text-muted-foreground mr-2">
                Filtered by:
              </span>
              <Badge variant="secondary" className="flex items-center gap-1">
                {categories.find((c) => c.id === categoryFilter)?.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setCategoryFilter(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter(null);
                }}
              >
                Reset filters
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={
                        product.image || "/placeholder.svg?height=200&width=200"
                      }
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsEditProductOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                        onClick={() => {
                          setCurrentProduct(product);
                          setIsDeleteProductOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <AdminCurrencyDisplay
                          amount={product.price}
                          showAllRates={false}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {categories.find((c) => c.id === product.categoryId)
                          ?.name || "Uncategorized"}
                      </Badge>
                      {product.extras && product.extras.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {product.extras.length} extras
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-4 p-4 font-medium text-sm border-b">
                <div className="col-span-5">Product</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-1">Extras</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0"
                >
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-md overflow-hidden">
                      <Image
                        src={
                          product.image || "/placeholder.svg?height=40&width=40"
                        }
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {product.description}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Badge variant="outline">
                      {categories.find((c) => c.id === product.categoryId)
                        ?.name || "Uncategorized"}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <AdminCurrencyDisplay
                      amount={product.price}
                      showAllRates={false}
                    />
                  </div>
                  <div className="col-span-1">
                    {product.extras && product.extras.length > 0 ? (
                      <Badge variant="secondary">{product.extras.length}</Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        None
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentProduct(product);
                        setIsEditProductOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        setCurrentProduct(product);
                        setIsDeleteProductOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm isEdit />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditProductOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={isDeleteProductOpen} onOpenChange={setIsDeleteProductOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete{" "}
              <strong>{currentProduct?.name}</strong>?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteProductOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Gallery Picker */}
      <ImageGalleryPicker
        open={isGalleryOpen}
        onOpenChange={setIsGalleryOpen}
        onSelectImage={handleSelectImage}
        currentProductId={currentProduct?.id}
      />
    </div>
  );
}
