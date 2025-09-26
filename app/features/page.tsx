"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  CreditCard,
  Smartphone,
  Zap,
  ArrowRight,
  MessageCircle,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Globe,
  BarChart3,
  Settings,
  Smartphone as Phone,
  CreditCard as Payment,
  Calendar,
  MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/animations";
import CallToAction from "@/components/call-to-action";

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <SiteHeader />
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-6 text-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
                  <Zap className="w-4 h-4 mr-2" />
                  Características Avanzadas
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none">
                  Todo lo que Necesitas para
                  <span className="block text-primary">
                    Gestionar tu Restaurante
                  </span>
                </h1>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Descubre el poder completo de FasterOrder. Desde gestión de
                  pedidos hasta analytics avanzados, todo lo que necesitas para
                  hacer crecer tu negocio.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="px-8 py-6 text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  onClick={() =>
                    window.open("https://demo.fasterorder.store/", "_blank")
                  }
                >
                  Probar Demo Gratis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-base transition-all duration-200 hover:bg-primary/10 hover:scale-105"
                  onClick={() =>
                    window.open("https://wa.me/584127690327", "_blank")
                  }
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contactar por WhatsApp
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                  Características Principales
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Todo lo que Necesitas en un Solo Lugar
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  FasterOrder incluye todas las herramientas esenciales para
                  optimizar la gestión de tu restaurante y mejorar la
                  experiencia de tus clientes.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FadeIn
                delay={150}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Pedidos Ilimitados
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Procesa tantos pedidos como necesites sin restricciones.
                  Escala tu negocio sin límites.
                </p>
                <ul className="space-y-2 text-sm w-full">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Sin límites de pedidos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Procesamiento en tiempo real</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Confirmación instantánea</span>
                  </li>
                </ul>
              </FadeIn>

              <FadeIn
                delay={300}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Analíticas Avanzadas
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Reportes detallados de ventas, productos más populares y
                  rendimiento de tu equipo.
                </p>
                <ul className="space-y-2 text-sm w-full">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Reportes de ventas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Análisis de productos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Métricas de rendimiento</span>
                  </li>
                </ul>
              </FadeIn>

              <FadeIn
                delay={450}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Gestión de Sucursales
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Controla múltiples ubicaciones desde un solo panel. Gestión
                  centralizada y eficiente.
                </p>
                <ul className="space-y-2 text-sm w-full">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Múltiples ubicaciones</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Control centralizado</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Reportes por sucursal</span>
                  </li>
                </ul>
              </FadeIn>

              <FadeIn
                delay={600}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Payment className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Manejo de Bolívares
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Sistema de pagos adaptado para Venezuela. Pago Móvil integrado
                  y manejo de bolívares.
                </p>
                <ul className="space-y-2 text-sm w-full">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Pago Móvil integrado</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Manejo de bolívares</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Sin comisiones</span>
                  </li>
                </ul>
              </FadeIn>

              <FadeIn
                delay={750}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Pedidos al WhatsApp
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Recibe pedidos directamente por WhatsApp. Integración perfecta
                  con tu flujo de trabajo.
                </p>
                <ul className="space-y-2 text-sm w-full">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Pedidos por WhatsApp</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Notificaciones automáticas</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Confirmaciones instantáneas</span>
                  </li>
                </ul>
              </FadeIn>

              <FadeIn
                delay={900}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Gestión de Configuración
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Configura métodos de pago, datos de empresa y integraciones
                  con WhatsApp.
                </p>
                <ul className="space-y-2 text-sm w-full">
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Métodos de pago</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Datos de empresa</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-3 h-4 w-4 text-primary flex-shrink-0" />
                    <span>Configuración WhatsApp</span>
                  </li>
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <FadeIn
                delay={150}
                direction="right"
                className="transition-transform hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl"></div>
                  <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-2xl">
                    <Image
                      src="/capture/captura-10.webp"
                      width={1280}
                      height={720}
                      alt="FasterOrder Dashboard - Gestión de Pedidos"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </FadeIn>
              <FadeIn
                delay={300}
                direction="left"
                className="flex flex-col justify-center space-y-8"
              >
                <div className="space-y-4">
                  <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                    Gestión Completa
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Gestión Avanzada de Pedidos
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Toma el control total de tus pedidos con nuestro sistema de
                    gestión integral. Rastrea, modifica y analiza pedidos en
                    tiempo real desde cualquier dispositivo.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col space-y-3 rounded-lg border p-4 transition-transform hover:scale-[1.02] bg-background">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold">Tiempo Real</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Actualizaciones instantáneas del estado de cada pedido
                      desde la cocina hasta la entrega.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3 rounded-lg border p-4 transition-transform hover:scale-[1.02] bg-background">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold">Procesamiento Eficiente</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Maneja múltiples pedidos simultáneamente para maximizar la
                      eficiencia durante las horas pico.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3 rounded-lg border p-4 transition-transform hover:scale-[1.02] bg-background">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Settings className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold">Personalizable</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Adapta el sistema a los procesos específicos de tu
                      restaurante con flujos de trabajo personalizados.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3 rounded-lg border p-4 transition-transform hover:scale-[1.02] bg-background">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold">Seguro y Confiable</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Datos protegidos con encriptación de nivel bancario y
                      respaldos automáticos.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <FadeIn
                delay={150}
                direction="right"
                className="flex flex-col justify-center space-y-8 order-2 lg:order-1"
              >
                <div className="space-y-4">
                  <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                    Analytics Avanzados
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">
                    Análisis Potentes
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Obtén información valiosa sobre tu negocio con nuestras
                    completas herramientas de análisis. Toma decisiones basadas
                    en datos para optimizar tus operaciones.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col space-y-3 rounded-lg border bg-background p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold">Reportes de Ventas</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Informes detallados sobre el rendimiento de ventas por
                      producto, categoría o período de tiempo.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3 rounded-lg border bg-background p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold">Análisis de Clientes</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Comprende el comportamiento y las preferencias de los
                      clientes para mejorar el servicio.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3 rounded-lg border bg-background p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold">Tendencias de Mercado</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Identifica patrones y tendencias para anticipar
                      necesidades del mercado.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3 rounded-lg border bg-background p-4 transition-transform hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="font-semibold">Métricas en Tiempo Real</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Monitorea KPIs y métricas de rendimiento en tiempo real
                      para tomar decisiones inmediatas.
                    </p>
                  </div>
                </div>
              </FadeIn>
              <FadeIn
                delay={300}
                direction="left"
                className="order-1 lg:order-2 transition-transform hover:scale-[1.02]"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl"></div>
                  <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-2xl">
                    <Image
                      src="/capture/captura-9.webp"
                      width={1280}
                      height={720}
                      alt="FasterOrder Analytics Dashboard"
                      className="object-cover w-full h-full"
                    />
                  </div>
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
