"use client";

import React from "react";
import { FadeIn } from "./animations";
import { Button } from "./ui/button";
import { ArrowRight, Star, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CallToAction() {
  const router = useRouter();
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container px-4 md:px-6">
        <FadeIn className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              <Star className="w-4 h-4 mr-2" />
              Únete a miles de restaurantes exitosos
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              ¿Listo para Revolucionar tu Restaurante?
            </h2>
            <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
              Transforma tu gestión de pedidos con FasterOrder. Aumenta la
              eficiencia, mejora la experiencia del cliente y haz crecer tu
              negocio.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Configuración en minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Soporte especializado</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button
              size="lg"
              className="px-8 py-6 text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
              onClick={() =>
                window.open("https://demo.fasterorder.store/", "_blank")
              }
            >
              Probar Demo Gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base transition-all duration-200 hover:bg-primary/10 hover:scale-105"
              onClick={() => router.push("/pricing")}
            >
              Ver Precios
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="px-8 py-6 text-base transition-all duration-200 hover:bg-primary/5 hover:scale-105"
              onClick={() =>
                (window.location.href = "mailto:fasterorderve@gmail.com")
              }
            >
              Contactar Ventas
            </Button>
          </div>

          <div className="text-xs text-muted-foreground max-w-md">
            Al continuar, aceptas nuestros términos de servicio y política de
            privacidad.
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
