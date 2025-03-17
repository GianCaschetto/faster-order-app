import Image from "next/image";
import { CheckCircle, CreditCard, Smartphone, Zap } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/animations";
import CallToAction from "@/components/call-to-action";

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Potentes Características para Optimizar tus Pedidos online.
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubre cómo FasterOrder puede transformar tu negocio con
                  nuestro completo conjunto de características.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <FadeIn
                delay={150}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm transition-transform hover:scale-[1.02]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">
                  Procesamiento Ultra Rápido
                </h3>
                <p className="text-center text-muted-foreground">
                  Procesa pedidos en segundos, no en minutos. Nuestro sistema
                  optimizado asegura que tu personal pueda manejar las horas
                  punta con facilidad.
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Confirmación instantánea de pedidos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Capacidades de procesamiento por lotes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Actualizaciones de inventario en tiempo real</span>
                  </li>
                </ul>
              </FadeIn>
              <FadeIn
                delay={300}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm transition-transform hover:scale-[1.02]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Soporte Multiplataforma</h3>
                <p className="text-center text-muted-foreground">
                  Toma pedidos desde cualquier lugar con nuestras aplicaciones
                  web, móviles y para tablets. Sincronización perfecta entre
                  todos los dispositivos.
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Aplicaciones para iOS y Android</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Interfaz web responsive</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Capacidades de modo sin conexión</span>
                  </li>
                </ul>
              </FadeIn>
              <FadeIn
                delay={450}
                className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm transition-transform hover:scale-[1.02]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">
                  Procesamiento de Pagos Seguro
                </h3>
                <p className="text-center text-muted-foreground">
                  Acepta todos los métodos de pago principales con nuestro
                  sistema de procesamiento de pagos compatible con PCI. Mantén
                  los datos de tus clientes seguros.
                </p>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Procesamiento de tarjetas de crédito/débito</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Integración con monederos digitales</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>Opciones de facturación por suscripción</span>
                  </li>
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <FadeIn
                delay={150}
                direction="right"
                className="transition-transform hover:scale-[1.02]"
              >
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  width={1280}
                  height={720}
                  alt="Order management dashboard"
                  className="rounded-lg object-cover shadow-lg"
                />
              </FadeIn>
              <FadeIn
                delay={300}
                direction="left"
                className="flex flex-col justify-center space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold">
                    Gestión Avanzada de Pedidos
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Toma el control de tus pedidos con nuestro sistema de
                    gestión integral. Rastrea, modifica y analiza pedidos en
                    tiempo real.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col space-y-2 rounded-lg border p-4 transition-transform hover:scale-[1.02]">
                    <h3 className="font-medium">Seguimiento de Pedidos</h3>
                    <p className="text-sm text-muted-foreground">
                      Actualizaciones en tiempo real sobre el estado del pedido
                      desde la colocación hasta la entrega.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 rounded-lg border p-4 transition-transform hover:scale-[1.02]">
                    <h3 className="font-medium">Procesamiento por Lotes</h3>
                    <p className="text-sm text-muted-foreground">
                      Maneja múltiples pedidos simultáneamente para aumentar la
                      eficiencia.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 rounded-lg border p-4 transition-transform hover:scale-[1.02]">
                    <h3 className="font-medium">
                      Flujos de Trabajo Personalizados
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Crea flujos de trabajo a medida que se adapten a los
                      procesos de tu negocio.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 rounded-lg border p-4 transition-transform hover:scale-[1.02]">
                    <h3 className="font-medium">Gestión Prioritaria</h3>
                    <p className="text-sm text-muted-foreground">
                      Prioriza automáticamente pedidos urgentes basados en
                      reglas personalizadas.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <FadeIn
                delay={150}
                direction="right"
                className="flex flex-col justify-center space-y-8 order-2 lg:order-1"
              >
                <div>
                  <h2 className="text-3xl font-bold">Análisis Potentes</h2>
                  <p className="mt-2 text-muted-foreground">
                    Obtén información valiosa sobre tu negocio con nuestras
                    completas herramientas de análisis. Toma decisiones basadas
                    en datos para optimizar tus operaciones.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col space-y-2 rounded-lg border bg-background p-4 transition-transform hover:scale-[1.02]">
                    <h3 className="font-medium">Informes de Ventas</h3>
                    <p className="text-sm text-muted-foreground">
                      Informes detallados sobre el rendimiento de ventas por
                      producto, categoría o período de tiempo.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 rounded-lg border bg-background p-4 transition-transform hover:scale-[1.02]">
                    <h3 className="font-medium">Información de Clientes</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprende el comportamiento y las preferencias de los
                      clientes para mejorar el servicio.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 rounded-lg border bg-background p-4 transition-transform hover:scale-[1.02]">
                    <h3 className="font-medium">Previsión de Inventario</h3>
                    <p className="text-sm text-muted-foreground">
                      Predice las necesidades de inventario basándote en datos
                      históricos y tendencias.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2 rounded-lg border bg-background p-4 transition-transform hover:scale-[1.02]">
                    <h3 className="font-medium">Métricas de Rendimiento</h3>
                    <p className="text-sm text-muted-foreground">
                      Rastrea KPIs y métricas de rendimiento para identificar
                      áreas de mejora.
                    </p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn
                delay={300}
                direction="left"
                className="order-1 lg:order-2 transition-transform hover:scale-[1.02]"
              >
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  width={1280}
                  height={720}
                  alt="Analytics dashboard"
                  className="rounded-lg object-cover shadow-lg"
                />
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
