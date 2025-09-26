"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Zap,
  Star,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Truck,
  MessageCircle,
  Play,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { FadeIn } from "@/components/animations";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import CallToAction from "@/components/call-to-action";
import { DeliveryLottie } from "@/components/delivery-lottie";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section - Completamente Innovador */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          {/* Fondo dinámico con gradientes animados */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>

          {/* Efectos de partículas y formas geométricas */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Círculos flotantes animados */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-lg animate-bounce"></div>
            <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-primary/15 to-primary/8 rounded-full blur-lg animate-bounce"></div>

            {/* Líneas de conexión animadas */}
            <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-primary/30 to-transparent animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-px h-24 bg-gradient-to-b from-primary/20 to-transparent animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/3 left-1/3 w-px h-28 bg-gradient-to-b from-primary/25 to-transparent animate-pulse delay-2000"></div>
          </div>

          {/* Contenido principal */}
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20 items-center min-h-[80vh]">
              {/* Contenido de texto - Lado izquierdo */}
              <FadeIn className="flex flex-col justify-center space-y-8 text-center lg:text-left">
                <div className="space-y-6">
                  {/* Badge animado con efecto de brillo */}
                  <div className="inline-flex items-center rounded-full border px-6 py-3 text-sm bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 text-primary border-primary/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <Star className="w-4 h-4 mr-2 animate-spin" />
                    <span className="relative z-10">
                      Optimiza tu restaurante con FasterOrder
                    </span>
                  </div>

                  {/* Título principal con efectos avanzados */}
                  <h1 className="text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl/none">
                    <span className="block bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent animate-gradient-x">
                      Gestión de Pedidos
                    </span>
                    <span className="block text-primary animate-bounce-gentle mt-4">
                      Más Rápida y Eficiente
                    </span>
                  </h1>

                  {/* Descripción con efecto de escritura */}
                  <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed mx-auto lg:mx-0">
                    Transforma tu restaurante con nuestro sistema de gestión de
                    pedidos. Aumenta la productividad, mejora la experiencia del
                    cliente y optimiza tus operaciones con pedidos ilimitados.
                  </p>
                </div>

                {/* Botones con efectos avanzados */}
                <div className="flex flex-col gap-4 sm:flex-row justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="px-8 py-6 text-base transition-all duration-500 hover:scale-110 hover:shadow-2xl group relative overflow-hidden"
                    onClick={() =>
                      window.open("https://demo.fasterorder.store/", "_blank")
                    }
                  >
                    <div className="flex items-center gap-2 relative z-10">
                      <Play className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                      <span>Probar Demo Gratis</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 py-6 text-base transition-all duration-500 hover:bg-primary/10 hover:scale-110 hover:shadow-xl group border-2 border-primary/30 hover:border-primary"
                    onClick={() => router.push("/pricing")}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                      <span>Ver Precios</span>
                    </div>
                  </Button>

                  <Button
                    size="lg"
                    variant="ghost"
                    className="px-8 py-6 text-base transition-all duration-500 hover:bg-green-500 hover:text-white hover:scale-110 hover:shadow-xl group"
                    onClick={() =>
                      window.open("https://wa.me/584127690327", "_blank")
                    }
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                      <span>WhatsApp</span>
                    </div>
                  </Button>
                </div>

                {/* Indicadores de confianza con animaciones */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <CheckCircle className="w-4 h-4 text-primary group-hover:scale-125 transition-transform duration-300" />
                    <span>Sin compromiso</span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <CheckCircle className="w-4 h-4 text-primary group-hover:scale-125 transition-transform duration-300" />
                    <span>Configuración rápida</span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <CheckCircle className="w-4 h-4 text-primary group-hover:scale-125 transition-transform duration-300" />
                    <span>Pedidos ilimitados</span>
                  </div>
                </div>
              </FadeIn>

              {/* Animación Lottie - Lado derecho */}
              <FadeIn
                delay={300}
                direction="left"
                className="flex items-center justify-center order-first lg:order-last"
              >
                <div className="relative">
                  {/* Efecto de resplandor detrás de la animación */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-full blur-3xl animate-pulse"></div>

                  {/* Contenedor de la animación con efectos */}
                  <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Animación Lottie principal */}
                      <DeliveryLottie className="w-full h-full drop-shadow-2xl" />

                      {/* Efectos decorativos alrededor */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-ping"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/15 rounded-full animate-ping delay-1000"></div>
                      <div className="absolute top-1/4 -left-8 w-4 h-4 bg-primary/10 rounded-full animate-ping delay-2000"></div>
                      <div className="absolute bottom-1/4 -right-8 w-5 h-5 bg-primary/12 rounded-full animate-ping delay-3000"></div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Efecto de scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
              <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                  Características Principales
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Todo lo que necesitas para tu restaurante
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  FasterOrder incluye todas las herramientas esenciales para
                  optimizar la gestión de tu restaurante y mejorar la
                  experiencia de tus clientes.
                </p>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-6xl items-center gap-8 py-12 lg:grid-cols-3">
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
              </FadeIn>
              <FadeIn
                delay={300}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">Tiempo Real</h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Sincronización instantánea entre cocina, meseros y caja. Sin
                  retrasos, sin errores.
                </p>
              </FadeIn>
              <FadeIn
                delay={450}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Analytics Avanzados
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Reportes detallados de ventas, productos más populares y
                  rendimiento de tu equipo.
                </p>
              </FadeIn>
              <FadeIn
                delay={600}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Gestión de Equipo
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Control de acceso por roles, horarios de trabajo y seguimiento
                  de productividad.
                </p>
              </FadeIn>
              <FadeIn
                delay={750}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Seguro y Confiable
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Datos protegidos con encriptación de nivel bancario y
                  respaldos automáticos.
                </p>
              </FadeIn>
              <FadeIn
                delay={900}
                className="flex flex-col items-center space-y-6 rounded-xl border p-8 bg-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-center">
                  Acceso Universal
                </h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Funciona en cualquier dispositivo: computadora, tablet o
                  móvil. Siempre conectado.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section
          id="product"
          className="w-full py-16 md:py-24 lg:py-32 bg-muted/30"
        >
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                  Sistema Completo
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Descubre el Poder de FasterOrder
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Una solución integral que revoluciona la gestión de tu
                  restaurante con herramientas diseñadas específicamente para la
                  industria gastronómica.
                </p>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-6xl items-center gap-12 py-8 sm:py-12 grid-cols-1 lg:grid-cols-2">
              <FadeIn
                delay={150}
                direction="right"
                className="flex flex-col justify-center space-y-6 w-full"
              >
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Gestión de Menú Inteligente
                      </h3>
                      <p className="text-muted-foreground">
                        Actualiza precios, disponibilidad y descripciones en
                        tiempo real. Control total sobre tu carta digital.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4"></div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Reportes Detallados
                      </h3>
                      <p className="text-muted-foreground">
                        Análisis de ventas, productos más vendidos, horarios
                        pico y rendimiento de tu equipo.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Integración Total
                      </h3>
                      <p className="text-muted-foreground">
                        Conecta con sistemas de pago, delivery y contabilidad
                        para un flujo de trabajo perfecto.
                      </p>
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
                    className="flex-1 transition-all duration-200 hover:bg-primary/10 hover:scale-105"
                    onClick={() => router.push("/pricing")}
                  >
                    Ver Precios
                  </Button>
                </div>
              </FadeIn>
              <FadeIn
                delay={300}
                direction="left"
                className="flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl"></div>
                  <div className="relative aspect-video overflow-hidden rounded-xl border bg-background shadow-2xl transition-transform hover:scale-[1.02]">
                    <Image
                      src="/capture/captura-8.webp"
                      width={1280}
                      height={720}
                      alt="FasterOrder Dashboard - Panel de control"
                      className="object-cover max-w-full"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_500px] lg:gap-16 xl:grid-cols-[1fr_600px] items-center">
              <FadeIn
                delay={150}
                direction="right"
                className="flex items-center justify-center order-last lg:order-first"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-xl transition-transform hover:scale-105 shadow-lg">
                    <Image
                      src="/capture/captura-1.webp"
                      width={600}
                      height={600}
                      alt="FasterOrder - Gestión de pedidos"
                      className="object-cover max-w-full"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-xl transition-transform hover:scale-105 shadow-lg">
                    <Image
                      src="/capture/captura-2.webp"
                      width={600}
                      height={600}
                      alt="FasterOrder - Panel de control"
                      className="object-cover max-w-full"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-xl transition-transform hover:scale-105 shadow-lg">
                    <Image
                      src="/capture/captura-3.webp"
                      width={600}
                      height={600}
                      alt="FasterOrder - Análisis y reportes"
                      className="object-cover max-w-full"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-xl transition-transform hover:scale-105 shadow-lg">
                    <Image
                      src="/capture/captura-5.webp"
                      width={600}
                      height={600}
                      alt="FasterOrder - Gestión de inventario"
                      className="object-cover max-w-full"
                    />
                  </div>
                </div>
              </FadeIn>
              <FadeIn
                delay={300}
                direction="left"
                className="flex flex-col justify-center space-y-6"
              >
                <div className="space-y-4">
                  <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                    Diseñado para Restaurantes
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Interfaz Intuitiva y Eficiente
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                    Cada pantalla está diseñada pensando en la rapidez y
                    facilidad de uso. Tu equipo será productivo desde el primer
                    día.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-base">Interfaz simple y clara</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-base">Configuración en minutos</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-base">
                      Soporte técnico especializado
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-base">
                      Actualizaciones automáticas
                    </span>
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
                    className="flex-1 transition-all duration-200 hover:bg-primary/10 hover:scale-105"
                    onClick={() => router.push("/pricing")}
                  >
                    Ver Precios
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Pricing Preview Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                  Precios Simples
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Planes que se Adaptan a tu Negocio
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Elige el plan perfecto para tu restaurante. Todos incluyen
                  pedidos ilimitados y 14 días de prueba gratuita.
                </p>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-4xl gap-8 py-12 lg:grid-cols-2">
              <FadeIn delay={150} className="transition-all duration-300">
                <div className="flex flex-col h-full rounded-xl border p-8 bg-background transition-transform hover:scale-[1.02] hover:shadow-lg">
                  <div className="space-y-4 mb-6">
                    <h3 className="text-2xl font-bold">Plan Mensual</h3>
                    <p className="text-muted-foreground">
                      Perfecto para restaurantes que quieren flexibilidad
                      mensual.
                    </p>
                    <div className="flex items-baseline text-4xl font-bold">
                      $70
                      <span className="ml-2 text-lg font-normal text-muted-foreground">
                        /mes
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Pedidos ilimitados</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Gestión de menú completa</span>
                    </li>

                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Reportes y analytics</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Soporte técnico</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full mt-6 transition-all duration-200 hover:scale-105"
                    onClick={() => router.push("/pricing")}
                  >
                    Comenzar Ahora <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>
              <FadeIn delay={300} className="transition-all duration-300">
                <div className="flex flex-col h-full rounded-xl border-2 border-primary p-8 bg-background transition-transform hover:scale-[1.02] hover:shadow-lg relative">
                  <div className="absolute top-0 right-0 left-0 h-1 bg-primary rounded-t-xl"></div>
                  <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground mb-4 self-start">
                    Más Popular
                  </div>
                  <div className="space-y-4 mb-6">
                    <h3 className="text-2xl font-bold">Plan Anual</h3>
                    <p className="text-muted-foreground">
                      Ahorra dinero con nuestro plan anual. Incluye todo lo del
                      plan mensual.
                    </p>
                    <div className="flex items-baseline text-4xl font-bold">
                      $700
                      <span className="ml-2 text-lg font-normal text-muted-foreground">
                        /año
                      </span>
                    </div>
                    <div className="inline-block rounded-lg bg-green-100 text-green-800 px-3 py-1 text-sm font-medium">
                      Ahorra $140 al año
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Pedidos ilimitados</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Gestión de menú completa</span>
                    </li>

                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Reportes y analytics</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Soporte prioritario</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>Configuración personalizada</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full mt-6 transition-all duration-200 hover:scale-105"
                    onClick={() => router.push("/pricing")}
                  >
                    Comenzar Ahora <ArrowRight className="ml-2 h-4 w-4" />
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
