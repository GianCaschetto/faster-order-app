"use client";

import React from "react";
import { FadeIn } from "./animations";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CallToAction() {
  const router = useRouter();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              ¿Listo para transformar tu proceso de pedidos?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Únete a miles de negocios que han optimizado sus operaciones con
              FasterOrder.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button
              size="lg"
              className="px-8 transition-transform hover:scale-105"
            >
              contactanos{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="transition-colors hover:bg-primary/10"
              onClick={() => router.push("/demo")}
            >
              Probar Demo
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
