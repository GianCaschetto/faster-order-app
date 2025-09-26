"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/animations";
import CallToAction from "@/components/call-to-action";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Precios Simples y Transparentes
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Elige el plan adecuado para tu negocio. Todos los planes
                  incluyen usuarios ilimitados y todas las características.
                </p>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-4xl gap-8 py-12 lg:grid-cols-2">
              <FadeIn delay={150} className="transition-all duration-300">
                <Card className="flex flex-col h-full transition-transform hover:scale-[1.02] hover:shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Plan Mensual</CardTitle>
                    <CardDescription className="text-base">
                      Perfecto para restaurantes que quieren flexibilidad
                      mensual.
                    </CardDescription>
                    <div className="mt-6 flex items-baseline justify-center text-5xl font-bold">
                      $70
                      <span className="ml-2 text-xl font-normal text-muted-foreground">
                        /mes
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Facturación mensual
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Pedidos ilimitados</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Productos ilimitados</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Analíticas avanzadas</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Gestión de sucursales</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Manejo de bolívares</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">
                          Un solo pago sin comisiones
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Gestión de horarios</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Usuarios ilimitados</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      className="w-full transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      onClick={() =>
                        window.open("https://demo.fasterorder.store/", "_blank")
                      }
                    >
                      Probar Demo <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full transition-all duration-200 hover:scale-105 hover:shadow-lg bg-green-500"
                      onClick={() =>
                        window.open("https://wa.me/584127690327", "_blank")
                      }
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Contactar por WhatsApp
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              <FadeIn delay={300} className="transition-all duration-300">
                <Card className="flex flex-col h-full border-2 border-primary transition-transform hover:scale-[1.02] hover:shadow-lg relative">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-primary rounded-t-lg"></div>
                  <CardHeader className="text-center">
                    <div className="inline-block rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground mb-4">
                      Más Popular
                    </div>
                    <CardTitle className="text-2xl">Plan Anual</CardTitle>
                    <CardDescription className="text-base">
                      Ahorra dinero con nuestro plan anual. Incluye todo lo del
                      plan mensual.
                    </CardDescription>
                    <div className="mt-6 flex items-baseline justify-center text-5xl font-bold">
                      $700
                      <span className="ml-2 text-xl font-normal text-muted-foreground">
                        /año
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Equivale a $58.33/mes
                    </div>
                    <div className="inline-block rounded-lg bg-green-100 text-green-800 px-4 py-2 text-sm font-medium mt-3">
                      Ahorra $140 al año
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Pedidos ilimitados</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Productos ilimitados</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Analíticas avanzadas</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Gestión de sucursales</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Manejo de bolívares</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">
                          Un solo pago sin comisiones
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Gestión de horarios</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">
                          Gestión de configuración
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Pedidos al WhatsApp</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Pago Móvil integrado</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">
                          Galería con fotos ilimitadas
                        </span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Zonas de delivery</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-3 h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-base">Usuarios ilimitados</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button
                      size="lg"
                      className="w-full transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      onClick={() =>
                        window.open("https://demo.fasterorder.store/", "_blank")
                      }
                    >
                      Probar Demo <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full transition-all duration-200 hover:scale-105 hover:shadow-lg bg-green-500"
                      onClick={() =>
                        window.open("https://wa.me/584127690327", "_blank")
                      }
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Contactar por WhatsApp
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Nuestros Clientes
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Miles de restaurantes confían en FasterOrder para optimizar
                  sus operaciones y hacer crecer su negocio.
                </p>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-3">
              <FadeIn
                delay={150}
                className="text-center space-y-4 transition-transform hover:scale-[1.02]"
              >
                <div className="text-4xl font-bold text-primary">500+</div>
                <h3 className="text-xl font-bold">Restaurantes Activos</h3>
                <p className="text-muted-foreground">
                  Más de 500 restaurantes confían en FasterOrder para gestionar
                  sus pedidos diariamente.
                </p>
              </FadeIn>
              <FadeIn
                delay={200}
                className="text-center space-y-4 transition-transform hover:scale-[1.02]"
              >
                <div className="text-4xl font-bold text-primary">50K+</div>
                <h3 className="text-xl font-bold">Pedidos Procesados</h3>
                <p className="text-muted-foreground">
                  Más de 50,000 pedidos procesados exitosamente cada mes a
                  través de nuestra plataforma.
                </p>
              </FadeIn>
              <FadeIn
                delay={250}
                className="text-center space-y-4 transition-transform hover:scale-[1.02]"
              >
                <div className="text-4xl font-bold text-primary">98%</div>
                <h3 className="text-xl font-bold">Satisfacción</h3>
                <p className="text-muted-foreground">
                  El 98% de nuestros clientes reportan mejoras significativas en
                  la eficiencia de su restaurante.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <FadeIn
                delay={150}
                direction="right"
                className="transition-transform hover:scale-[1.02]"
              >
                <div className="relative w-full aspect-video">
                  <Image
                    src="/capture/captura-7.webp"
                    alt="Customer support team"
                    fill
                    className="rounded-lg border shadow-lg object-cover"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={300} direction="left" className="space-y-6">
                <h2 className="text-3xl font-bold">
                  ¿Necesitas una Solución Personalizada?
                </h2>
                <p className="text-muted-foreground">
                  Entendemos que cada negocio es único. Si nuestros planes
                  estándar no satisfacen tus necesidades específicas, nuestro
                  equipo puede trabajar contigo para crear una solución
                  personalizada adaptada a tus requisitos.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">
                        Integraciones Personalizadas
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Conecta FasterOrder con tus sistemas y flujos de trabajo
                        existentes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Gestor de Cuenta Dedicado</h3>
                      <p className="text-sm text-muted-foreground">
                        Obtén soporte personalizado de un gestor de cuenta
                        dedicado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Formación Personalizada</h3>
                      <p className="text-sm text-muted-foreground">
                        Incorpora a tu equipo con sesiones de formación
                        personalizadas.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <Button className="transition-transform hover:scale-105">
                    Contacta con nuestro equipo de ventas{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="transition-transform hover:scale-105"
                    onClick={() =>
                      window.open("https://wa.me/584127690327", "_blank")
                    }
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
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
