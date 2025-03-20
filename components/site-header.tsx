"use client";
import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

interface SiteHeaderProps {
  isMenu?: boolean;
  setIsMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SiteHeader({
  isMenu = false,
  setIsMobileMenuOpen,
}: SiteHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Cerrar el menú al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsMobileMenuOpen?.(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const routes = [
    { href: "/", label: "Inicio" },
    { href: "/features", label: "Características" },
    { href: "/product", label: "Producto" },
    { href: "/testimonials", label: "Testimonios" },
    { href: "/pricing", label: "Precios" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {
              setMobileMenuOpen(true);
              setIsMobileMenuOpen?.(true);
            }}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menú</span>
          </Button>

          <Link
            href="/"
            className="flex items-center space-x-2 transition-transform hover:scale-105"
          >
            <Image
              src="/logo/fasterorder-logo.png"
              alt="FasterOrder Logo"
              width={32}
              height={32}
              className="dark:brightness-0 dark:invert-[1]"
            />
            <span className="inline-block font-bold">FasterOrder</span>
          </Link>
        </div>

        {/* Menú de navegación para escritorio */}
        <div className="hidden md:flex gap-6 ml-24">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground",
                route.label === "Inicio" && "ml-6"
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {!isMenu && (
              <Button
                size="sm"
                className="transition-transform hover:scale-105"
                onClick={() => router.push("/menu")}
              >
                <span className="hidden sm:inline-block">Probar Demo</span>
                <span className="sm:hidden">Prueba</span>
              </Button>
            )}
          </nav>
        </div>
      </div>

      {/* Menú móvil - implementación simplificada */}
      <div
        className={`fixed inset-0 bg-background z-50 transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: "100dvh" }} // Usar dvh para ajustarse al viewport dinámico
      >
        <div className="flex flex-col h-full">
          {/* Cabecera del menú */}
          <div className="flex items-center justify-between p-4 border-b h-16">
            <Link
              href="/"
              className="flex items-center space-x-2"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsMobileMenuOpen?.(false);
              }}
            >
              <Image
                src="/logo/fasterorder-logo.png"
                alt="FasterOrder Logo"
                width={28}
                height={28}
                className="dark:brightness-0 dark:invert-[1]"
              />
              <span className="inline-block font-bold">FasterOrder</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsMobileMenuOpen?.(false);
              }}
              className="h-10 w-10 rounded-full hover:bg-muted"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>

          {/* Navegación */}
          <div className="flex-1 overflow-auto py-6 px-4">
            <nav className="space-y-2">
              {routes.map((route, index) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsMobileMenuOpen?.(false);
                  }}
                  className={cn(
                    "flex items-center py-3 px-4 text-lg font-medium rounded-md transition-colors",
                    pathname === route.href
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-foreground/80 hover:bg-muted hover:text-foreground",
                    "mobile-nav-item"
                  )}
                  style={{ "--index": index } as React.CSSProperties}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Pie del menú */}
          <div className="border-t p-4 space-y-4 mt-auto">
            <div className="flex justify-between items-center p-3 rounded-md bg-muted/50">
              <span className="text-base font-medium">Tema</span>
              <ThemeToggle />
            </div>
            <Button
              className="w-full justify-center bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:scale-[1.02] py-6 text-base"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsMobileMenuOpen?.(false);
              }}
            >
              Prueba gratis
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
