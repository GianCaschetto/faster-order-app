"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  DollarSign,
  Tag,
  Save,
  X,
  Coffee,
  Pizza,
  Utensils,
  AlertCircle,
} from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { products as mockProducts } from "@/lib/mock-data";
import type { Product, Extra } from "@/components/restaurant-menu";

// Extra group types
type ExtraGroup = {
  id: string;
  name: string;
  description: string;
  categoryIds: string[]; // Which product categories this group applies to
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

// Sample extra groups
const initialExtraGroups: ExtraGroup[] = [
  {
    id: "toppings",
    name: "Pizza Toppings",
    description: "Additional toppings for pizzas",
    categoryIds: ["mains"],
    extras: [
      { id: "extra-cheese", name: "Extra Cheese", price: 2.0, min: 0, max: 3 },
      { id: "mushrooms", name: "Mushrooms", price: 1.5, min: 0, max: 2 },
      { id: "pepperoni", name: "Pepperoni", price: 2.0, min: 0, max: 2 },
      { id: "olives", name: "Olives", price: 1.0, min: 0, max: 2 },
      { id: "bacon", name: "Bacon", price: 2.5, min: 0, max: 2 },
    ],
  },
  {
    id: "sides",
    name: "Side Options",
    description: "Additional sides for main courses",
    categoryIds: ["mains", "starters"],
    extras: [
      { id: "fries", name: "French Fries", price: 3.99, min: 0, max: 1 },
      { id: "salad", name: "Side Salad", price: 4.99, min: 0, max: 1 },
      {
        id: "mashed-potatoes",
        name: "Mashed Potatoes",
        price: 3.99,
        min: 0,
        max: 1,
      },
      { id: "garlic-bread", name: "Garlic Bread", price: 3.99, min: 0, max: 1 },
    ],
  },
  {
    id: "drink-additions",
    name: "Drink Additions",
    description: "Add-ons for beverages",
    categoryIds: ["drinks"],
    extras: [
      { id: "ice", name: "Extra Ice", price: 0.0, min: 0, max: 1 },
      { id: "lemon", name: "Lemon Slice", price: 0.25, min: 0, max: 2 },
      { id: "mint", name: "Fresh Mint", price: 0.5, min: 0, max: 1 },
      {
        id: "whipped-cream",
        name: "Whipped Cream",
        price: 1.0,
        min: 0,
        max: 1,
      },
      {
        id: "espresso-shot",
        name: "Espresso Shot",
        price: 1.5,
        min: 0,
        max: 2,
      },
    ],
  },
  {
    id: "dessert-toppings",
    name: "Dessert Toppings",
    description: "Toppings for desserts",
    categoryIds: ["desserts"],
    extras: [
      {
        id: "chocolate-sauce",
        name: "Chocolate Sauce",
        price: 0.75,
        min: 0,
        max: 3,
        required: false,
      },
      {
        id: "caramel-sauce",
        name: "Caramel Sauce",
        price: 0.75,
        min: 0,
        max: 3,
      },
      {
        id: "strawberry-sauce",
        name: "Strawberry Sauce",
        price: 0.75,
        min: 0,
        max: 3,
      },
      { id: "nuts", name: "Mixed Nuts", price: 1.25, min: 0, max: 1 },
      {
        id: "whipped-cream-dessert",
        name: "Whipped Cream",
        price: 0.75,
        min: 0,
        max: 1,
      },
      {
        id: "ice-cream",
        name: "Vanilla Ice Cream",
        price: 1.99,
        min: 1,
        max: 2,
        required: true,
      },
    ],
  },
];

export default function ExtrasPage() {
  const [extraGroups, setExtraGroups] = useState<ExtraGroup[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
  const [isDeleteGroupOpen, setIsDeleteGroupOpen] = useState(false);
  const [isAddExtraOpen, setIsAddExtraOpen] = useState(false);
  const [isEditExtraOpen, setIsEditExtraOpen] = useState(false);
  const [isDeleteExtraOpen, setIsDeleteExtraOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<ExtraGroup | null>(null);
  const [currentExtra, setCurrentExtra] = useState<Extra | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  // New group form state
  const [newGroup, setNewGroup] = useState<Partial<ExtraGroup>>({
    name: "",
    description: "",
    categoryIds: [],
    extras: [],
  });

  // New extra form state
  const [newExtra, setNewExtra] = useState<Partial<Extra>>({
    name: "",
    price: 0,
    min: 0,
    max: 10,
    required: false,
  });

  useEffect(() => {
    // Load extra groups from localStorage or use initial data
    const savedExtraGroups = localStorage.getItem("restaurantExtraGroups");
    if (savedExtraGroups) {
      try {
        setExtraGroups(JSON.parse(savedExtraGroups));
      } catch (error) {
        console.error("Error parsing saved extra groups:", error);
        setExtraGroups(initialExtraGroups);
      }
    } else {
      setExtraGroups(initialExtraGroups);
    }

    // Load products
    setProducts(mockProducts);
  }, []);

  // Save extra groups to localStorage whenever they change
  useEffect(() => {
    if (extraGroups.length > 0) {
      localStorage.setItem(
        "restaurantExtraGroups",
        JSON.stringify(extraGroups)
      );
    }
  }, [extraGroups]);

  const filteredGroups = extraGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !categoryFilter || group.categoryIds.includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

  const handleAddGroup = () => {
    if (!newGroup.name) {
      toast({
        title: "Error",
        description: "El nombre del grupo es requerido",
        variant: "destructive",
      });
      return;
    }

    const groupId = newGroup.name.toLowerCase().replace(/\s+/g, "-");
    const groupToAdd: ExtraGroup = {
      id: groupId,
      name: newGroup.name,
      description: newGroup.description || "",
      categoryIds: newGroup.categoryIds || [],
      extras: [],
    };

    setExtraGroups([...extraGroups, groupToAdd]);
    setNewGroup({
      name: "",
      description: "",
      categoryIds: [],
      extras: [],
    });
    setIsAddGroupOpen(false);

    toast({
      title: "Excelente",
      description: "Grupo de extra agregado exitosamente",
    });
  };

  const handleEditGroup = () => {
    if (!currentGroup) return;

    setExtraGroups(
      extraGroups.map((group) =>
        group.id === currentGroup.id ? currentGroup : group
      )
    );
    setIsEditGroupOpen(false);

    toast({
      title: "Excelente",
      description: "Grupo de extra actualizado exitosamente",
    });
  };

  const handleDeleteGroup = () => {
    if (!currentGroup) return;

    setExtraGroups(extraGroups.filter((group) => group.id !== currentGroup.id));
    setIsDeleteGroupOpen(false);

    toast({
      title: "Excelente",
      description: "Grupo de extra eliminado exitosamente",
    });
  };

  const handleAddExtra = () => {
    if (!currentGroup) return;
    if (!newExtra.name || typeof newExtra.price !== "number") {
      toast({
        title: "Error",
        description: "El nombre y el precio son requeridos",
        variant: "destructive",
      });
      return;
    }

    const extraId = `${currentGroup.id}-${newExtra.name
      ?.toLowerCase()
      .replace(/\s+/g, "-")}`;
    const extraToAdd: Extra = {
      id: extraId,
      name: newExtra.name,
      price: newExtra.price,
      min: newExtra.min ?? 0,
      max: newExtra.max ?? 10,
      required: newExtra.required ?? false,
    };

    const updatedGroup = {
      ...currentGroup,
      extras: [...currentGroup.extras, extraToAdd],
    };

    setExtraGroups(
      extraGroups.map((group) =>
        group.id === currentGroup.id ? updatedGroup : group
      )
    );
    setCurrentGroup(updatedGroup);
    setNewExtra({
      name: "",
      price: 0,
      min: 0,
      max: 10,
      required: false,
    });
    setIsAddExtraOpen(false);

    toast({
      title: "Excelente",
      description: "Extra agregado exitosamente",
    });
  };

  const handleEditExtra = () => {
    if (!currentGroup || !currentExtra) return;

    const updatedExtras = currentGroup.extras.map((extra) =>
      extra.id === currentExtra.id ? currentExtra : extra
    );

    const updatedGroup = {
      ...currentGroup,
      extras: updatedExtras,
    };

    setExtraGroups(
      extraGroups.map((group) =>
        group.id === currentGroup.id ? updatedGroup : group
      )
    );
    setCurrentGroup(updatedGroup);
    setIsEditExtraOpen(false);

    toast({
      title: "Excelente",
      description: "Extra actualizado exitosamente",
    });
  };

  const handleDeleteExtra = () => {
    if (!currentGroup || !currentExtra) return;

    const updatedExtras = currentGroup.extras.filter(
      (extra) => extra.id !== currentExtra.id
    );

    const updatedGroup = {
      ...currentGroup,
      extras: updatedExtras,
    };

    setExtraGroups(
      extraGroups.map((group) =>
        group.id === currentGroup.id ? updatedGroup : group
      )
    );
    setCurrentGroup(updatedGroup);
    setIsDeleteExtraOpen(false);

    toast({
      title: "Excelente",
      description: "Extra eliminado exitosamente",
    });
  };

  const applyExtrasToProducts = (groupId: string) => {
    const group = extraGroups.find((g) => g.id === groupId);
    if (!group) return;

    // Find products that match the categories in the group
    const matchingProducts = products.filter((product) =>
      group.categoryIds.includes(product.categoryId)
    );

    if (matchingProducts.length === 0) {
      toast({
        title: "No hay productos coincidentes",
        description:
          "No se encontraron productos en las categorías seleccionadas",
        variant: "destructive",
      });
      return;
    }

    // Show confirmation dialog
    if (
      confirm(
        `Aplicar ${group.extras.length} extras a ${matchingProducts.length} productos?`
      )
    ) {
      // In a real app, you would update the products in the database
      toast({
        title: "Excelente",
        description: `Extras aplicados a ${matchingProducts.length} productos`,
      });
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case "starters":
        return <Utensils className="h-4 w-4" />;
      case "mains":
        return <Pizza className="h-4 w-4" />;
      case "drinks":
        return <Coffee className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  const GroupForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const group = isEdit ? currentGroup : newGroup;
    const setGroup = isEdit
      ? (value: Partial<ExtraGroup>) =>
          setCurrentGroup({ ...currentGroup, ...value } as ExtraGroup)
      : setNewGroup;

    if (!group && isEdit) return null;

    return (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="group-name" className="text-right">
            Nombre
          </Label>
          <Input
            id="group-name"
            value={group?.name || ""}
            onChange={(e) => setGroup({ ...group, name: e.target.value })}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="group-description" className="text-right">
            Descripción
          </Label>
          <Input
            id="group-description"
            value={group?.description || ""}
            onChange={(e) =>
              setGroup({ ...group, description: e.target.value })
            }
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-start gap-4">
          <Label className="text-right pt-2">Categorías aplicables</Label>
          <div className="col-span-3 space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={(group?.categoryIds || []).includes(category.id)}
                  onCheckedChange={(checked) => {
                    const currentCategories = group?.categoryIds || [];
                    const newCategories = checked
                      ? [...currentCategories, category.id]
                      : currentCategories.filter((id) => id !== category.id);
                    setGroup({ ...group, categoryIds: newCategories });
                  }}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ExtraForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const extra = isEdit ? currentExtra : newExtra;
    const setExtra = isEdit
      ? (value: Partial<Extra>) =>
          setCurrentExtra({ ...currentExtra, ...value } as Extra)
      : setNewExtra;

    if (!extra && isEdit) return null;

    return (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="extra-name" className="text-right">
            Nombre
          </Label>
          <Input
            id="extra-name"
            value={extra?.name || ""}
            onChange={(e) => setExtra({ ...extra, name: e.target.value })}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="extra-price" className="text-right">
            Precio (USD)
          </Label>
          <div className="col-span-3 flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input
              id="extra-price"
              type="number"
              min="0"
              step="0.01"
              value={extra?.price || 0}
              onChange={(e) =>
                setExtra({ ...extra, price: Number.parseFloat(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="extra-min" className="text-right">
            Cantidad mínima
          </Label>
          <Input
            id="extra-min"
            type="number"
            min="0"
            max={extra?.max || 10}
            value={extra?.min || 0}
            onChange={(e) => {
              const min = Number.parseInt(e.target.value);
              setExtra({ ...extra, min });

              // If required is true, min must be at least 1
              if (extra?.required && min < 1) {
                setExtra({ ...extra, min: 1 });
              }
            }}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="extra-max" className="text-right">
            Cantidad máxima
          </Label>
          <Input
            id="extra-max"
            type="number"
            min={extra?.min || 0}
            value={extra?.max || 10}
            onChange={(e) =>
              setExtra({ ...extra, max: Number.parseInt(e.target.value) })
            }
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="extra-required" className="text-right">
            Requerido
          </Label>
          <div className="flex flex-row items-center space-x-3 space-y-0 col-span-3">
            <Switch
              id="extra-required"
              checked={extra?.required || false}
              onCheckedChange={(checked) => {
                setExtra({
                  ...extra,
                  required: checked,
                  // If required is true, ensure min is at least 1
                  min: checked ? Math.max(extra?.min || 0, 1) : extra?.min,
                });
              }}
            />
            <Label htmlFor="extra-required" className="text-sm font-normal">
              El cliente debe seleccionar este extra
            </Label>
          </div>
        </div>

        {extra?.required && (
          <div className="col-span-4 bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm flex items-start">
            <AlertCircle className="h-4 w-4 mr-2 mt-0.5" />
            <div>
              <p className="font-medium">Extra requerido</p>
              <p>
                Cuando un extra es requerido, la cantidad mínima debe ser al
                menos 1.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestión de extras
          </h1>
          <p className="text-muted-foreground">
            Crea y administra extras reutilizables para tus productos
          </p>
        </div>

        <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Agregar grupo de extra
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Agregar nuevo grupo de extras</DialogTitle>
            </DialogHeader>
            <GroupForm />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddGroupOpen(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleAddGroup}>Guardar grupo</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar extras..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2">
                <div className="font-medium mb-1">Categoría</div>
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
                      Todas las categorías
                    </label>
                  </div>

                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={categoryFilter === category.id}
                        onCheckedChange={() => setCategoryFilter(category.id)}
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
        </div>
      </div>

      {categoryFilter && (
        <div className="mb-4 flex items-center">
          <span className="text-sm text-muted-foreground mr-2">
            Filtrado por:
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos los grupos</TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Tag className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">
                  No se encontraron grupos de extras
                </h3>
                <p className="text-muted-foreground mt-2">
                  Intenta ajustar tu búsqueda o filtro para encontrar lo que
                  buscas.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter(null);
                  }}
                >
                  Reiniciar filtros
                </Button>
              </div>
            ) : (
              filteredGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentGroup(group);
                              setIsEditGroupOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar grupo
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentGroup(group);
                              setIsAddExtraOpen(true);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar extra
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => applyExtrasToProducts(group.id)}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Aplicar a productos
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setCurrentGroup(group);
                              setIsDeleteGroupOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar grupo
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {group.categoryIds.map((categoryId) => (
                        <Badge
                          key={categoryId}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          {getCategoryIcon(categoryId)}
                          <span>
                            {categories.find((c) => c.id === categoryId)?.name}
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium mb-2">
                      Extras ({group.extras.length})
                    </div>
                    {group.extras.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        No hay extras agregados aún
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {group.extras.map((extra) => (
                          <div
                            key={extra.id}
                            className="flex items-center justify-between bg-muted p-2 rounded-md"
                          >
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {extra.name}
                                </span>
                                {extra.required && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 text-xs"
                                  >
                                    Requerido
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <span>+${extra.price.toFixed(2)}</span>
                                <span className="mx-1">•</span>
                                <span>Min: {extra.min ?? 0}</span>
                                <span className="mx-1">•</span>
                                <span>Max: {extra.max ?? 10}</span>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setCurrentGroup(group);
                                  setCurrentExtra(extra);
                                  setIsEditExtraOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => {
                                  setCurrentGroup(group);
                                  setCurrentExtra(extra);
                                  setIsDeleteExtraOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => {
                        setCurrentGroup(group);
                        setIsAddExtraOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar extra
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {extraGroups
                .filter((group) => group.categoryIds.includes(category.id))
                .map((group) => (
                  <Card key={group.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{group.name}</CardTitle>
                          <CardDescription>{group.description}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentGroup(group);
                                setIsEditGroupOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar grupo
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setCurrentGroup(group);
                                setIsAddExtraOpen(true);
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Agregar extra
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => applyExtrasToProducts(group.id)}
                            >
                              <Save className="h-4 w-4 mr-2" />
                              Aplicar a productos
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                setCurrentGroup(group);
                                setIsDeleteGroupOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar grupo
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {group.categoryIds.map((categoryId) => (
                          <Badge
                            key={categoryId}
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            {getCategoryIcon(categoryId)}
                            <span>
                              {
                                categories.find((c) => c.id === categoryId)
                                  ?.name
                              }
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm font-medium mb-2">
                        Extras ({group.extras.length})
                      </div>
                      {group.extras.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No hay extras agregados aún
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {group.extras.map((extra) => (
                            <div
                              key={extra.id}
                              className="flex items-center justify-between bg-muted p-2 rounded-md"
                            >
                              <div>
                                <div className="flex items-center">
                                  <span className="font-medium">
                                    {extra.name}
                                  </span>
                                  {extra.required && (
                                    <Badge
                                      variant="outline"
                                      className="ml-2 text-xs"
                                    >
                                      Requerido
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  <span>+${extra.price.toFixed(2)}</span>
                                  <span className="mx-1">•</span>
                                  <span>Min: {extra.min ?? 0}</span>
                                  <span className="mx-1">•</span>
                                  <span>Max: {extra.max ?? 10}</span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => {
                                    setCurrentGroup(group);
                                    setCurrentExtra(extra);
                                    setIsEditExtraOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive"
                                  onClick={() => {
                                    setCurrentGroup(group);
                                    setCurrentExtra(extra);
                                    setIsDeleteExtraOpen(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => {
                          setCurrentGroup(group);
                          setIsAddExtraOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar extra
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Group Dialog */}
      <Dialog open={isEditGroupOpen} onOpenChange={setIsEditGroupOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar grupo de extra</DialogTitle>
          </DialogHeader>
          <GroupForm isEdit />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditGroupOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditGroup}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Group Dialog */}
      <Dialog open={isDeleteGroupOpen} onOpenChange={setIsDeleteGroupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar grupo de extra</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              ¿Estás seguro de querer eliminar{" "}
              <strong>{currentGroup?.name}</strong>?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Esto eliminará todos los extras en este grupo. Esta acción no se
              puede deshacer.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteGroupOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteGroup}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Extra Dialog */}
      <Dialog open={isAddExtraOpen} onOpenChange={setIsAddExtraOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar extra a {currentGroup?.name}</DialogTitle>
          </DialogHeader>
          <ExtraForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddExtraOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddExtra}>Agregar extra</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Extra Dialog */}
      <Dialog open={isEditExtraOpen} onOpenChange={setIsEditExtraOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar extra</DialogTitle>
          </DialogHeader>
          <ExtraForm isEdit />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditExtraOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditExtra}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Extra Dialog */}
      <Dialog open={isDeleteExtraOpen} onOpenChange={setIsDeleteExtraOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar extra</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              ¿Estás seguro de querer eliminar{" "}
              <strong>{currentExtra?.name}</strong>?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Esta acción no se puede deshacer.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteExtraOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteExtra}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
