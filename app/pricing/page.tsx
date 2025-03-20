import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
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
                  incluyen una prueba gratuita de 14 días.
                </p>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <FadeIn delay={150} className="transition-all duration-300">
                <Card className="flex flex-col h-full transition-transform hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle>Inicial</CardTitle>
                    <CardDescription>
                      Perfecto para pequeños negocios que están comenzando.
                    </CardDescription>
                    <div className="mt-4 flex items-baseline text-5xl font-bold">
                      $29
                      <span className="ml-1 text-xl font-normal text-muted-foreground">
                        /mes
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Hasta 500 pedidos por mes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Análisis básicos</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>2 cuentas de usuario</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Soporte por email</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Acceso a la aplicación móvil</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full transition-transform hover:scale-105">
                      Comenzar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              <FadeIn delay={300} className="transition-all duration-300">
                <Card className="flex flex-col h-full border-primary transition-transform hover:scale-[1.05] relative">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-primary rounded-t-lg"></div>
                  <CardHeader>
                    <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground mb-2">
                      Más Popular
                    </div>
                    <CardTitle>Profesional</CardTitle>
                    <CardDescription>
                      Ideal para negocios en crecimiento con volumen de pedidos.
                    </CardDescription>
                    <div className="mt-4 flex items-baseline text-5xl font-bold">
                      $79
                      <span className="ml-1 text-xl font-normal text-muted-foreground">
                        /mes
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Hasta 2.000 pedidos por mes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Análisis avanzados</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>5 cuentas de usuario</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Soporte prioritario por email</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Acceso a la aplicación móvil</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Gestión de inventario</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Perfiles de clientes</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full transition-transform hover:scale-105">
                      Comenzar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </FadeIn>
              <FadeIn delay={450} className="transition-all duration-300">
                <Card className="flex flex-col h-full transition-transform hover:scale-[1.02]">
                  <CardHeader>
                    <CardTitle>Empresarial</CardTitle>
                    <CardDescription>
                      Para grandes empresas con necesidades de pedidos de alto
                      volumen.
                    </CardDescription>
                    <div className="mt-4 flex items-baseline text-5xl font-bold">
                      $199
                      <span className="ml-1 text-xl font-normal text-muted-foreground">
                        /mes
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Pedidos ilimitados</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Análisis personalizados</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Cuentas de usuario ilimitadas</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Soporte telefónico y por email 24/7</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Acceso a la aplicación móvil</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Gestión avanzada de inventario</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Perfiles de clientes y fidelización</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Acceso a API</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Integraciones personalizadas</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full transition-transform hover:scale-105">
                      Contactar con ventas{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
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
                  Preguntas Frecuentes
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Encuentra respuestas a preguntas comunes sobre nuestros
                  precios y características.
                </p>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <FadeIn
                delay={150}
                className="space-y-2 transition-transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold">
                  ¿Puedo cambiar de plan más adelante?
                </h3>
                <p className="text-muted-foreground">
                  Sí, puedes actualizar o degradar tu plan en cualquier momento.
                  Los cambios entran en vigor al inicio de tu próximo ciclo de
                  facturación.
                </p>
              </FadeIn>
              <FadeIn
                delay={200}
                className="space-y-2 transition-transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold">
                  ¿Hay alguna tarifa de configuración?
                </h3>
                <p className="text-muted-foreground">
                  No, no hay tarifas de configuración para ninguno de nuestros
                  planes. Solo pagas la cuota de suscripción mensual.
                </p>
              </FadeIn>
              <FadeIn
                delay={250}
                className="space-y-2 transition-transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold">
                  ¿Ofrecen facturación anual?
                </h3>
                <p className="text-muted-foreground">
                  Sí, ofrecemos un descuento del 15% para facturación anual en
                  todos los planes. Contacta con nuestro equipo de ventas para
                  más información.
                </p>
              </FadeIn>
              <FadeIn
                delay={300}
                className="space-y-2 transition-transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold">
                  ¿Qué métodos de pago aceptan?
                </h3>
                <p className="text-muted-foreground">
                  Aceptamos todas las principales tarjetas de crédito, PayPal y
                  transferencias bancarias para planes anuales.
                </p>
              </FadeIn>
              <FadeIn
                delay={350}
                className="space-y-2 transition-transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold">¿Hay una prueba gratuita?</h3>
                <p className="text-muted-foreground">
                  Sí, todos los planes vienen con una prueba gratuita de 14
                  días. No se requiere tarjeta de crédito para comenzar.
                </p>
              </FadeIn>
              <FadeIn
                delay={400}
                className="space-y-2 transition-transform hover:scale-[1.02]"
              >
                <h3 className="text-xl font-bold">
                  ¿Qué sucede si excedo mi límite de pedidos?
                </h3>
                <p className="text-muted-foreground">
                  Si excedes tu límite mensual de pedidos, se te cobrará una
                  pequeña tarifa por pedido adicional. Te notificaremos cuando
                  te estés acercando a tu límite.
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
              src="/placeholder.svg?height=720&width=1280"
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
          <Button className="mt-4 transition-transform hover:scale-105">
            Contacta con nuestro equipo de ventas{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
