import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/animations";
import CallToAction from "@/components/call-to-action";

export default function ProductPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Conoce FasterOrder
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  La solución completa de gestión de pedidos diseñada para
                  optimizar las operaciones de tu negocio.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={300} className="mx-auto mt-12 max-w-5xl">
              <div className="transition-transform hover:scale-[1.02]">
                <Image
                  src="/capture/captura-5.webp"
                  width={1280}
                  height={720}
                  alt="FasterOrder dashboard"
                  className="rounded-lg border shadow-lg"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <FadeIn className="mx-auto max-w-5xl">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="scroll-m-0 grid w-full grid-cols-3 mb-8 data-[orientation=horizontal]:overflow-x-auto data-[orientation=horizontal]:scrollbar-none">
                  <TabsTrigger
                    value="overview"
                    className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Resumen
                  </TabsTrigger>
                  <TabsTrigger
                    value="features"
                    className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Características
                  </TabsTrigger>
                  <TabsTrigger
                    value="integrations"
                    className="transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Integraciones
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="overview"
                  className="p-6 bg-background rounded-lg border"
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Resumen del Producto</h2>
                    <p>
                      FasterOrder es un sistema integral de gestión de pedidos
                      diseñado para ayudar a negocios de todos los tamaños a
                      optimizar su proceso de pedidos. Desde pequeñas cafeterías
                      hasta grandes cadenas minoristas, nuestro software
                      proporciona las herramientas que necesitas para procesar
                      pedidos de forma rápida y eficiente.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 mt-6">
                      <div className="flex flex-col space-y-2 transition-transform hover:scale-[1.02]">
                        <h3 className="text-lg font-medium">
                          Para Restaurantes
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Optimiza el servicio de mesa, para llevar y pedidos a
                          domicilio en un sistema unificado.
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 transition-transform hover:scale-[1.02]">
                        <h3 className="text-lg font-medium">Para Minoristas</h3>
                        <p className="text-sm text-muted-foreground">
                          Gestiona pedidos en tienda, online y por teléfono con
                          seguimiento de inventario y gestión de clientes.
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 transition-transform hover:scale-[1.02]">
                        <h3 className="text-lg font-medium">Para E-commerce</h3>
                        <p className="text-sm text-muted-foreground">
                          Maneja pedidos online de alto volumen con
                          procesamiento automatizado y seguimiento de
                          cumplimiento.
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 transition-transform hover:scale-[1.02]">
                        <h3 className="text-lg font-medium">
                          Para Negocios de Servicios
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Programa citas y gestiona pedidos de servicios con
                          historial de clientes y seguimientos.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="features"
                  className="p-6 bg-background rounded-lg border"
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">
                      Características
                    </h2>
                    <p>
                      FasterOrder viene repleto de características diseñadas
                      para hacer la gestión de pedidos simple, eficiente y libre
                      de errores.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 mt-6">
                      <div className="flex items-start space-x-3 transition-transform hover:scale-[1.02]">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">
                            Procesamiento de Pedidos
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Procesa pedidos rápidamente con una interfaz
                            intuitiva diseñada para la velocidad.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 transition-transform hover:scale-[1.02]">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Gestión de Inventario</h3>
                          <p className="text-sm text-muted-foreground">
                            Rastrea los niveles de inventario en tiempo real con
                            actualizaciones automáticas a medida que se procesan
                            los pedidos.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 transition-transform hover:scale-[1.02]">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Gestión de Clientes</h3>
                          <p className="text-sm text-muted-foreground">
                            Crea perfiles de clientes con historial de pedidos y
                            preferencias para un servicio personalizado.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 transition-transform hover:scale-[1.02]">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Informes y Análisis</h3>
                          <p className="text-sm text-muted-foreground">
                            Obtén información sobre tu negocio con informes y
                            análisis completos.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 transition-transform hover:scale-[1.02]">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">Soporte Multicanal</h3>
                          <p className="text-sm text-muted-foreground">
                            Acepta pedidos de múltiples canales, incluyendo en
                            persona, online y por teléfono.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 transition-transform hover:scale-[1.02]">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h3 className="font-medium">
                            Procesamiento de Pagos
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Procesa pagos de forma segura con soporte para
                            múltiples métodos de pago.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent
                  value="integrations"
                  className="p-6 bg-background rounded-lg border"
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Integraciones</h2>
                    <p>
                      FasterOrder se integra perfectamente con tus herramientas
                      y plataformas existentes para crear un flujo de trabajo
                      unificado.
                    </p>
                    <div className="grid gap-6 md:grid-cols-3 mt-6">
                      <div className="flex flex-col items-center p-4 border rounded-lg bg-background/50 transition-transform hover:scale-[1.05]">
                        <Image
                          src="/capture/captura-10.webp"
                          width={80}
                          height={80}
                          alt="Payment gateway integration"
                          className="mb-4"
                        />
                        <h3 className="font-medium text-center">
                          Pasarelas de Pago
                        </h3>
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          Stripe, PayPal, Square y más
                        </p>
                      </div>
                      <div className="flex flex-col items-center p-4 border rounded-lg bg-background/50 transition-transform hover:scale-[1.05]">
                        <Image
                          src="/capture/captura-9.webp"
                          width={80}
                          height={80}
                          alt="Accounting software integration"
                          className="mb-4"
                        />
                        <h3 className="font-medium text-center">
                          Software de Contabilidad
                        </h3>
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          QuickBooks, Xero, FreshBooks
                        </p>
                      </div>
                      <div className="flex flex-col items-center p-4 border rounded-lg bg-background/50 transition-transform hover:scale-[1.05]">
                        <Image
                          src="/capture/captura-8.webp"
                          width={80}
                          height={80}
                          alt="E-commerce platforms integration"
                          className="mb-4"
                        />
                        <h3 className="font-medium text-center">
                          Plataformas de E-commerce
                        </h3>
                        <p className="text-sm text-muted-foreground text-center mt-2">
                          Shopify, WooCommerce, Magento
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </FadeIn>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
              <FadeIn
          delay={150}
          direction="right"
          className="w-full transition-transform hover:scale-[1.02]"
              >
          <Image
            src="/capture/captura-11.webp"
            width={1280}
            height={720}
            alt="FasterOrder mobile app"
            className="w-full h-auto rounded-lg border shadow-lg"
          />
              </FadeIn>
              <FadeIn
          delay={300}
          direction="left"
          className="space-y-6 text-center lg:text-left"
              >
          <h2 className="text-3xl font-bold">
            Lleva Tu Negocio a Cualquier Lugar
          </h2>
          <p className="text-muted-foreground">
            Con la aplicación móvil de FasterOrder, puedes gestionar tu
            negocio desde cualquier lugar. Procesa pedidos, comprueba el
            inventario y visualiza informes sobre la marcha.
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Disponible para iOS y Android</span>
            </li>
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Sincronización en tiempo real con la plataforma web</span>
            </li>
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Modo sin conexión para un servicio ininterrumpido</span>
            </li>
            <li className="flex items-center gap-2 justify-center lg:justify-start">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Notificaciones push para nuevos pedidos</span>
            </li>
          </ul>
          <div className="flex flex-col gap-2 sm:flex-row pt-4 justify-center lg:justify-start">
            <Button className="px-8 transition-transform hover:scale-105">
              Descargar la app <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="transition-colors hover:bg-primary/10"
            >
              Saber más
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
