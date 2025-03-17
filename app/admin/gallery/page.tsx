"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Trash2, ImageIcon, Copy, Check } from "lucide-react";
import Image from "next/image";

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
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dropzone } from "@/components/dropzone";

// Gallery image type
type GalleryImage = {
  id: string;
  url: string;
  name: string;
  uploadedAt: string;
  size?: string;
  dimensions?: string;
  type?: string;
  usedIn?: string[]; // Product IDs that use this image
};

// Sample images for initial gallery
const sampleImages: GalleryImage[] = [
  {
    id: "img-1",
    url: "/public/pictures/2151431747.jpg",
    name: "Sample Image 1",
    uploadedAt: new Date().toISOString(),
    size: "12 KB",
    dimensions: "200x200",
    type: "JPG",
    usedIn: [],
  },
  {
    id: "img-2",
    url: "/faster-order-app/app/admin/public/pictures/2151431747.jpg",
    name: "Pizza Image",
    uploadedAt: new Date().toISOString(),
    size: "15 KB",
    dimensions: "300x300",
    type: "jpg",
    usedIn: ["3"], // Used in Margherita Pizza
  },
  {
    id: "img-3",
    url: "/public/pictures/2151431747.jpg",
    name: "Pasta Image",
    uploadedAt: new Date().toISOString(),
    size: "14 KB",
    dimensions: "300x300",
    type: "SVG",
    usedIn: ["4"], // Used in Spaghetti Bolognese
  },
  {
    id: "img-4",
    url: "/app/admin/public/pictures/2151431747.jpg",
    name: "Dessert Image",
    uploadedAt: new Date().toISOString(),
    size: "13 KB",
    dimensions: "300x300",
    type: "SVG",
    usedIn: ["6", "7"], // Used in desserts
  },
  {
    id: "img-5",
    url: "/app/admin/public/pictures/2151431747.jpg",
    name: "Drink Image",
    uploadedAt: new Date().toISOString(),
    size: "12 KB",
    dimensions: "300x300",
    type: "SVG",
    usedIn: ["8", "9"], // Used in drinks
  },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);
  const [isDeleteImageOpen, setIsDeleteImageOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("file");

  // New image form state
  const [newImage, setNewImage] = useState<Partial<GalleryImage>>({
    url: "",
    name: "",
  });

  useEffect(() => {
    // Load images from localStorage or use sample images
    const savedImages = localStorage.getItem("restaurantGallery");
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (error) {
        console.error("Error parsing saved images:", error);
        setImages(sampleImages);
      }
    } else {
      setImages(sampleImages);
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem("restaurantGallery", JSON.stringify(images));
    }
  }, [images]);

  const filteredImages = images.filter((image) => {
    return (
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const usedImages = images.filter(
    (image) => image.usedIn && image.usedIn.length > 0
  );
  const unusedImages = images.filter(
    (image) => !image.usedIn || image.usedIn.length === 0
  );

  const handleAddImage = () => {
    if (uploadMethod === "url") {
      if (!newImage.url) {
        toast({
          title: "Error",
          description: "Image URL is required",
          variant: "destructive",
        });
        return;
      }

      const imageId = `img-${Date.now()}`;
      const imageToAdd: GalleryImage = {
        id: imageId,
        url: newImage.url,
        name: newImage.name || `Image ${images.length + 1}`,
        uploadedAt: new Date().toISOString(),
        size: "Unknown",
        dimensions: "Unknown",
        type: newImage.url.split(".").pop()?.toUpperCase() || "Unknown",
        usedIn: [],
      };

      setImages([...images, imageToAdd]);
      setNewImage({
        url: "",
        name: "",
      });
      setIsAddImageOpen(false);

      toast({
        title: "Success",
        description: "Image added to gallery",
      });
    }
  };

  const handleFileUpload = (files: File[]) => {
    if (!files.length) return;

    // Process each file
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;

        if (dataUrl) {
          const imageId = `img-${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 9)}`;
          const fileName =
            file.name.split(".")[0] || `Image ${images.length + 1}`;

          const imageToAdd: GalleryImage = {
            id: imageId,
            url: dataUrl,
            name: fileName,
            uploadedAt: new Date().toISOString(),
            size: formatFileSize(file.size),
            dimensions: "Unknown", // We could get this by loading the image
            type: file.type.split("/")[1]?.toUpperCase() || "Unknown",
            usedIn: [],
          };

          setImages((prev) => [...prev, imageToAdd]);

          toast({
            title: "Excelente",
            description: `${file.name} agregado a la galería`,
          });
        }
      };

      reader.onerror = () => {
        toast({
          title: "Error",
          description: `Error al subir ${file.name}`,
          variant: "destructive",
        });
      };

      reader.readAsDataURL(file);
    });

    setIsAddImageOpen(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const handleDeleteImage = () => {
    if (!currentImage) return;

    // Check if image is used in any products
    if (currentImage.usedIn && currentImage.usedIn.length > 0) {
      toast({
        title: "No se puede eliminar la imagen",
        description: `Esta imagen está siendo utilizada en ${currentImage.usedIn.length} productos. Por favor, elimínela de esos productos primero.`,
        variant: "destructive",
      });
      setIsDeleteImageOpen(false);
      return;
    }

    setImages(images.filter((image) => image.id !== currentImage.id));
    setIsDeleteImageOpen(false);

    toast({
      title: "Excelente",
      description: "Imagen eliminada de la galería",
    });
  };

  const copyImageUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);

    toast({
      title: "URL Copiada",
      description: "URL de la imagen copiada al portapapeles",
    });

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Galería de Imágenes
            </h1>
          </div>
          <p className="text-muted-foreground">
            Administra y organiza imágenes para tus productos
          </p>
        </div>

        <Dialog open={isAddImageOpen} onOpenChange={setIsAddImageOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Agregar imagen
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Agregar nueva imagen</DialogTitle>
            </DialogHeader>

            <Tabs
              defaultValue="file"
              className="mt-4"
              onValueChange={(value) =>
                setUploadMethod(value as "url" | "file")
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">Subir archivo</TabsTrigger>
                <TabsTrigger value="url">URL de la imagen</TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="py-4">
                <Dropzone
                  onDrop={handleFileUpload}
                  maxFiles={5}
                  maxSize={5 * 1024 * 1024} // 5MB
                  showPreview={true}
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Formatos soportados: JPG, PNG, GIF, WebP
                </p>
              </TabsContent>

              <TabsContent value="url" className="py-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image-url" className="text-right">
                      URL de la imagen
                    </Label>
                    <Input
                      id="image-url"
                      value={newImage.url || ""}
                      onChange={(e) =>
                        setNewImage({ ...newImage, url: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image-name" className="text-right">
                      Nombre
                    </Label>
                    <Input
                      id="image-name"
                      value={newImage.name || ""}
                      onChange={(e) =>
                        setNewImage({ ...newImage, name: e.target.value })
                      }
                      placeholder="Imagen de producto"
                      className="col-span-3"
                    />
                  </div>

                  {newImage.url && (
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">Vista previa</Label>
                      <div className="col-span-3 relative h-40 w-full border rounded-md overflow-hidden">
                        <Image
                          src={newImage.url || "/placeholder.svg"}
                          alt="Vista previa"
                          fill
                          className="object-contain"
                          onError={() => {
                            toast({
                              title: "Error",
                              description:
                                "No se pudo cargar la imagen. Por favor, verifica la URL.",
                              variant: "destructive",
                            });
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddImageOpen(false)}
              >
                Cancelar
              </Button>
              {uploadMethod === "url" && (
                <Button onClick={handleAddImage}>Agregar a la galería</Button>
              )}
              {uploadMethod === "file" && (
                <p className="text-sm text-muted-foreground">
                  Arrastra archivos o haz click para subir
                </p>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar imágenes..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todas ({images.length})</TabsTrigger>
          <TabsTrigger value="used">Usadas ({usedImages.length})</TabsTrigger>
          <TabsTrigger value="unused">
            No utilizadas ({unusedImages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Galería</CardTitle>
              <CardDescription>
                Todas las imágenes disponibles para tus productos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredImages.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    No se encontraron imágenes
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Intenta ajustar tu búsqueda o agrega una nueva imagen.
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => setIsAddImageOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar imagen
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredImages.map((image) => (
                    <div key={image.id} className="group relative">
                      <div className="aspect-square relative rounded-md border overflow-hidden bg-muted">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          fill
                          className="object-cover"
                        />

                        {/* Overlay with actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 bg-black/40 text-white hover:bg-black/60"
                              onClick={() => copyImageUrl(image.url, image.id)}
                            >
                              {copiedId === image.id ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <div className="flex justify-between items-end">
                            <span className="text-xs text-white font-medium truncate max-w-[80%]">
                              {image.name}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 bg-red-500/40 text-white hover:bg-red-500/60"
                              onClick={() => {
                                setCurrentImage(image);
                                setIsDeleteImageOpen(true);
                              }}
                              disabled={image.usedIn && image.usedIn.length > 0}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm font-medium truncate">
                          {image.name}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-muted-foreground">
                            {new Date(image.uploadedAt).toLocaleDateString()}
                          </span>
                          {image.usedIn && image.usedIn.length > 0 ? (
                            <Badge variant="secondary" className="text-xs">
                              Usada en {image.usedIn.length}{" "}
                              {image.usedIn.length === 1
                                ? "producto"
                                : "productos"}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              No utilizada
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="used">
          <Card>
            <CardHeader>
              <CardTitle>Imágenes usadas</CardTitle>
              <CardDescription>
                Imágenes actualmente utilizadas en productos
              </CardDescription>
            </CardHeader>
            <CardContent>
              {usedImages.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    No se encontraron imágenes usadas
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Las imágenes aparecerán aquí cuando se utilicen en
                    productos.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {usedImages
                    .filter((image) =>
                      image.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((image) => (
                      <div key={image.id} className="group relative">
                        <div className="aspect-square relative rounded-md border overflow-hidden bg-muted">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            fill
                            className="object-cover"
                          />

                          {/* Overlay with actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 bg-black/40 text-white hover:bg-black/60"
                                onClick={() =>
                                  copyImageUrl(image.url, image.id)
                                }
                              >
                                {copiedId === image.id ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="flex justify-between items-end">
                              <span className="text-xs text-white font-medium truncate max-w-[80%]">
                                {image.name}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm font-medium truncate">
                            {image.name}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-muted-foreground">
                              {new Date(image.uploadedAt).toLocaleDateString()}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              Used in {image.usedIn?.length || 0}{" "}
                              {image.usedIn?.length === 1
                                ? "product"
                                : "products"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unused">
          <Card>
            <CardHeader>
              <CardTitle>Imágenes no utilizadas</CardTitle>
              <CardDescription>
                Imágenes no actualmente utilizadas en ningún producto
              </CardDescription>
            </CardHeader>
            <CardContent>
              {unusedImages.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    No se encontraron imágenes no utilizadas
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Todas tus imágenes están actualmente siendo utilizadas en
                    productos.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {unusedImages
                    .filter((image) =>
                      image.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((image) => (
                      <div key={image.id} className="group relative">
                        <div className="aspect-square relative rounded-md border overflow-hidden bg-muted">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.name}
                            fill
                            className="object-cover"
                          />

                          {/* Overlay with actions */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 bg-black/40 text-white hover:bg-black/60"
                                onClick={() =>
                                  copyImageUrl(image.url, image.id)
                                }
                              >
                                {copiedId === image.id ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <div className="flex justify-between items-end">
                              <span className="text-xs text-white font-medium truncate max-w-[80%]">
                                {image.name}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 bg-red-500/40 text-white hover:bg-red-500/60"
                                onClick={() => {
                                  setCurrentImage(image);
                                  setIsDeleteImageOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm font-medium truncate">
                            {image.name}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-muted-foreground">
                              {new Date(image.uploadedAt).toLocaleDateString()}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              No utilizada
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Image Dialog */}
      <Dialog open={isDeleteImageOpen} onOpenChange={setIsDeleteImageOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar imagen</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-start gap-4">
              <div className="relative h-20 w-20 rounded-md border overflow-hidden flex-shrink-0">
                {currentImage && (
                  <Image
                    src={currentImage.url || "/placeholder.svg"}
                    alt={currentImage.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p>
                  ¿Estás seguro de querer eliminar{" "}
                  <strong>{currentImage?.name}</strong>?
                </p>
                {currentImage?.usedIn && currentImage.usedIn.length > 0 ? (
                  <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md mt-3">
                    <p className="font-medium">
                      No se puede eliminar la imagen
                    </p>
                    <p className="text-sm mt-1">
                      Esta imagen está siendo utilizada en{" "}
                      {currentImage.usedIn.length} productos. Por favor,
                      elimínala de esos productos primero.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">
                    Esta acción no se puede deshacer.
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteImageOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteImage}
              disabled={currentImage?.usedIn && currentImage.usedIn.length > 0}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
