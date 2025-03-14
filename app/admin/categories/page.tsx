/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products as mockProducts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Category type
type Category = {
  id: string;
  name: string;
  description: string;
  productCount: number;
  color?: string;
  icon?: string;
};

// Initial categories data
const initialCategories: Category[] = [
  {
    id: "starters",
    name: "Starters",
    description: "Appetizers and small plates to start your meal",
    productCount: 0,
    color: "#f97316", // orange
  },
  {
    id: "mains",
    name: "Main Courses",
    description: "Hearty main dishes including pizzas, pastas, and entrees",
    productCount: 0,
    color: "#ef4444", // red
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet treats to finish your meal",
    productCount: 0,
    color: "#ec4899", // pink
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Beverages including soft drinks, coffee, and juices",
    productCount: 0,
    color: "#3b82f6", // blue
  },
  {
    id: "sides",
    name: "Side Dishes",
    description: "Accompaniments to complement your main course",
    productCount: 0,
    color: "#84cc16", // lime
  },
  {
    id: "specials",
    name: "Specials",
    description: "Limited time and seasonal offerings",
    productCount: 0,
    color: "#a855f7", // purple
  },
];

// Available colors for categories
const categoryColors = [
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Yellow", value: "#eab308" },
  { name: "Lime", value: "#84cc16" },
  { name: "Green", value: "#22c55e" },
  { name: "Emerald", value: "#10b981" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Fuchsia", value: "#d946ef" },
  { name: "Pink", value: "#ec4899" },
  { name: "Rose", value: "#f43f5e" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [isDeleteCategoryOpen, setIsDeleteCategoryOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  // New category form state
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: "",
    description: "",
    color: categoryColors[0].value,
  });

  useEffect(() => {
    // Load categories from localStorage or use initial data
    const savedCategories = localStorage.getItem("restaurantCategories");
    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories));
      } catch (error) {
        console.error("Error parsing saved categories:", error);
        setCategories(initialCategories);
      }
    } else {
      setCategories(initialCategories);
    }

    // Load products
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    const updatedCategories = categories.map((category) => ({
      ...category,
      productCount: products.filter(
        (product) => product.categoryId === category.id
      ).length,
    }));

    // Only update if counts have changed
    const hasCountsChanged = updatedCategories.some(
      (cat, i) => cat.productCount !== categories[i].productCount
    );

    if (hasCountsChanged) {
      localStorage.setItem(
        "restaurantCategories",
        JSON.stringify(updatedCategories)
      );
      setCategories(updatedCategories);
    }
  }, [products]);

  const filteredCategories = categories.filter((category) => {
    return (
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    const categoryId = newCategory.name.toLowerCase().replace(/\s+/g, "-");

    // Check if category ID already exists
    if (categories.some((cat) => cat.id === categoryId)) {
      toast({
        title: "Error",
        description: "A category with this name already exists",
        variant: "destructive",
      });
      return;
    }

    const categoryToAdd: Category = {
      id: categoryId,
      name: newCategory.name,
      description: newCategory.description || "",
      productCount: 0,
      color: newCategory.color,
    };

    setCategories([...categories, categoryToAdd]);
    setNewCategory({
      name: "",
      description: "",
      color: categoryColors[0].value,
    });
    setIsAddCategoryOpen(false);

    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  const handleEditCategory = () => {
    if (!currentCategory) return;

    setCategories(
      categories.map((category) =>
        category.id === currentCategory.id ? currentCategory : category
      )
    );
    setIsEditCategoryOpen(false);

    toast({
      title: "Success",
      description: "Category updated successfully",
    });
  };

  const handleDeleteCategory = () => {
    if (!currentCategory) return;

    // Check if category has products
    const productsInCategory = products.filter(
      (product) => product.categoryId === currentCategory.id
    );
    if (productsInCategory.length > 0) {
      toast({
        title: "Cannot delete category",
        description: `This category contains ${productsInCategory.length} products. Please reassign or delete these products first.`,
        variant: "destructive",
      });
      setIsDeleteCategoryOpen(false);
      return;
    }

    setCategories(
      categories.filter((category) => category.id !== currentCategory.id)
    );
    setIsDeleteCategoryOpen(false);

    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
  };

  const CategoryForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const category = isEdit ? currentCategory : newCategory;
    const setCategory = isEdit
      ? (value: Partial<Category>) =>
          setCurrentCategory({ ...currentCategory, ...value } as Category)
      : setNewCategory;

    if (!category && isEdit) return null;

    return (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category-name" className="text-right">
            Name
          </Label>
          <Input
            id="category-name"
            value={category?.name || ""}
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category-description" className="text-right">
            Description
          </Label>
          <Textarea
            id="category-description"
            value={category?.description || ""}
            onChange={(e) =>
              setCategory({ ...category, description: e.target.value })
            }
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label className="text-right pt-2">Color</Label>
          <div className="col-span-3 flex flex-wrap gap-2">
            {categoryColors.map((color) => (
              <div
                key={color.value}
                className={cn(
                  "w-8 h-8 rounded-full cursor-pointer border-2",
                  category?.color === color.value
                    ? "border-black dark:border-white"
                    : "border-transparent"
                )}
                style={{ backgroundColor: color.value }}
                onClick={() => setCategory({ ...category, color: color.value })}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
          </div>
          <p className="text-muted-foreground">
            Gestiona las categorías de tus productos en el menú de tu
            restaurante
          </p>
        </div>

        <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddCategoryOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Save Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
          <CardDescription>Organize your menu with categories</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No categories found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or add a new category.
              </p>
              <Button
                className="mt-4"
                onClick={() => setIsAddCategoryOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-center">Products</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="font-medium">{category.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md truncate">
                        {category.description}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            category.productCount > 0 ? "default" : "outline"
                          }
                        >
                          {category.productCount}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setCurrentCategory(category);
                              setIsEditCategoryOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => {
                              setCurrentCategory(category);
                              setIsDeleteCategoryOpen(true);
                            }}
                            disabled={category.productCount > 0}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryOpen} onOpenChange={setIsEditCategoryOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <CategoryForm isEdit />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditCategoryOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <Dialog
        open={isDeleteCategoryOpen}
        onOpenChange={setIsDeleteCategoryOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete{" "}
              <strong>{currentCategory?.name}</strong>?
            </p>
            {currentCategory?.productCount ? (
              <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md mt-3">
                <p className="font-medium">Cannot delete category</p>
                <p className="text-sm mt-1">
                  This category contains {currentCategory.productCount}{" "}
                  products. Please reassign or delete these products first.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">
                This action cannot be undone.
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteCategoryOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCategory}
              disabled={currentCategory?.productCount ? true : false}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
