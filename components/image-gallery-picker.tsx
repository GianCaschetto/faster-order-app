"use client";

import { useState, useEffect } from "react";
import { Search, Check } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Gallery image type
type GalleryImage = {
  id: string;
  url: string;
  name: string;
  uploadedAt: string;
  size?: string;
  dimensions?: string;
  type?: string;
  usedIn?: string[];
};

interface ImageGalleryPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectImage: (imageUrl: string) => void;
  currentProductId?: string;
}

export default function ImageGalleryPicker({
  open,
  onOpenChange,
  onSelectImage,
  currentProductId,
}: ImageGalleryPickerProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Load images from localStorage
    const savedImages = localStorage.getItem("restaurantGallery");
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (error) {
        console.error("Error parsing saved images:", error);
        setImages([]);
      }
    }
  }, [open]); // Reload when dialog opens

  const filteredImages = images.filter((image) => {
    return (
      image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const recentImages = [...images]
    .sort((a, b) => {
      return (
        new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      );
    })
    .slice(0, 12);

  const handleSelectImage = (image: GalleryImage) => {
    onSelectImage(image.url);
    onOpenChange(false);

    // Update the usedIn array for this image if we have a product ID
    if (currentProductId) {
      const updatedImages = images.map((img) => {
        if (img.id === image.id) {
          const usedIn = img.usedIn || [];
          if (!usedIn.includes(currentProductId)) {
            return {
              ...img,
              usedIn: [...usedIn, currentProductId],
            };
          }
        }
        return img;
      });

      setImages(updatedImages);
      localStorage.setItem("restaurantGallery", JSON.stringify(updatedImages));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Image from Gallery</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Images</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="all" className="mt-0">
              {filteredImages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No images found</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-1">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative cursor-pointer"
                      onClick={() => handleSelectImage(image)}
                    >
                      <div className="aspect-square relative rounded-md border overflow-hidden bg-muted">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          fill
                          className="object-cover"
                        />

                        {/* Selection overlay */}
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Check className="h-8 w-8 text-white bg-primary rounded-full p-1.5" />
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
                              Used
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              Unused
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="recent" className="mt-0">
              {recentImages.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No recent images</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-1">
                  {recentImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative cursor-pointer"
                      onClick={() => handleSelectImage(image)}
                    >
                      <div className="aspect-square relative rounded-md border overflow-hidden bg-muted">
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          fill
                          className="object-cover"
                        />

                        {/* Selection overlay */}
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Check className="h-8 w-8 text-white bg-primary rounded-full p-1.5" />
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <p className="text-sm text-muted-foreground">
            Click on an image to select it
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
