"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  Quote,
  TrendingUp,
  Users,
  Clock,
  MessageCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/animations";
import CallToAction from "@/components/call-to-action";

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                  <Star className="w-4 h-4 mr-2" />
                  Historias de Éxito Reales
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                  Nuestros Clientes
                  <span className="block text-primary">
                    Hablan por Nosotros
                  </span>
                </h1>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Descubre cómo restaurantes como el tuyo han transformado sus
                  operaciones y aumentado sus ingresos con FasterOrder.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Featured Client Stories */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                  Casos de Éxito Reales
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Historias que Inspiran
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Conoce cómo restaurantes reales han transformado sus
                  operaciones y multiplicado sus ingresos con FasterOrder.
                </p>
              </div>
            </FadeIn>

            {/* TripleK Smash Burgers */}
            <div className="mb-20">
              <FadeIn className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl"></div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-2xl">
                      <Image
                        src="/capture/captura-1.webp"
                        width={1280}
                        height={720}
                        alt="TripleK Smash Burgers - Dashboard"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      +150% Incremento en Ventas
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight">
                      TripleK Smash Burgers
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Desde 2022, TripleK ha revolucionado la experiencia de
                      hamburguesas smash en Venezuela. Con FasterOrder, han
                      optimizado cada aspecto de su operación.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-primary">
                        +150%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Incremento en Ventas
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-primary">
                        -60%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Tiempo de Espera
                      </div>
                    </div>
                  </div>

                  <blockquote className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">
                    <Quote className="w-6 h-6 text-primary mb-2" />
                    <p className="text-muted-foreground italic text-lg">
                      &quot;FasterOrder nos permitió manejar el volumen de
                      pedidos durante las horas pico sin perder calidad.
                      Nuestros clientes están más satisfechos y nuestras ventas
                      han crecido exponencialmente.&quot;
                    </p>
                    <footer className="mt-4 text-sm font-medium">
                      — Equipo TripleK Smash Burgers
                    </footer>
                  </blockquote>
                </div>
              </FadeIn>
            </div>

            {/* Quiero Termino */}
            <div className="mb-20">
              <FadeIn className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                      <Users className="w-4 h-4 mr-2" />
                      +200% Más Clientes
                    </div>
                    <h3 className="text-3xl font-bold tracking-tight">
                      Quiero Termino
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Un restaurante que se enfoca en la experiencia
                      gastronómica completa. Con FasterOrder, han optimizado su
                      servicio y expandido su alcance.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-primary">
                        +200%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Más Clientes
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-muted/50">
                      <div className="text-2xl font-bold text-primary">
                        -45%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Errores en Pedidos
                      </div>
                    </div>
                  </div>

                  <blockquote className="border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-lg">
                    <Quote className="w-6 h-6 text-primary mb-2" />
                    <p className="text-muted-foreground italic text-lg">
                      &quot;La gestión de horarios y la integración con WhatsApp
                      han sido un cambio total. Ahora podemos atender más mesas
                      sin perder la calidad del servicio que nos
                      caracteriza.&quot;
                    </p>
                    <footer className="mt-4 text-sm font-medium">
                      — Equipo Quiero Termino
                    </footer>
                  </blockquote>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl"></div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-2xl">
                      <Image
                        src="/capture/captura-3.webp"
                        width={1280}
                        height={720}
                        alt="Quiero Termino - Sistema de Gestión"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Resultados que Hablan
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Los números no mienten. Nuestros clientes han experimentado
                  mejoras significativas en sus operaciones.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <FadeIn delay={150} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">+120%</div>
                <div className="text-sm text-muted-foreground">
                  Promedio de Incremento en Ventas
                </div>
              </FadeIn>

              <FadeIn delay={200} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">-50%</div>
                <div className="text-sm text-muted-foreground">
                  Reducción en Tiempo de Espera
                </div>
              </FadeIn>

              <FadeIn delay={250} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">
                  Restaurantes Activos
                </div>
              </FadeIn>

              <FadeIn delay={300} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">
                  Satisfacción del Cliente
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <FadeIn
                delay={150}
                direction="right"
                className="transition-transform hover:scale-[1.02] order-2 lg:order-1"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl"></div>
                  <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-2xl">
                    <Image
                      src="/capture/captura-2.webp"
                      width={1280}
                      height={720}
                      alt="FasterOrder en Acción"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </FadeIn>
              <FadeIn
                delay={300}
                direction="left"
                className="space-y-6 order-1 lg:order-2 text-center lg:text-left"
              >
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    ¿Listo para ser el próximo?
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Únete a Nuestros Clientes Exitosos
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Miles de restaurantes ya han transformado sus operaciones
                    con FasterOrder. Descubre cómo puedes ser el próximo en
                    experimentar estos resultados.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-xl font-bold text-primary">
                      14 días
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Prueba gratis
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <div className="text-xl font-bold text-primary">
                      Sin compromiso
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Cancela cuando quieras
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    size="lg"
                    className="flex-1 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                    onClick={() =>
                      window.open("https://demo.fasterorder.store/", "_blank")
                    }
                  >
                    Probar Demo Gratis <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 transition-all duration-200 hover:scale-105"
                    onClick={() =>
                      window.open("https://wa.me/584127690327", "_blank")
                    }
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <SiteFooter />
    </div>
  );
}
