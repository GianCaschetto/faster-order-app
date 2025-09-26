"use client";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/animations";
import CallToAction from "@/components/call-to-action";

export default function TestimonialsPage() {
  const clients = [
    {
      id: 1,
      name: "TripleK Smash Burgers",
      description: "Hamburguesas Smash desde 2022",
      logo: "/testimonials/triplekb-logo-blanco.webp",
      menuUrl: "https://menu.triplekb.com/menu",
      isDark: true,
    },
    {
      id: 2,
      name: "Quiero Termino",
      description: "Experiencia gastronómica completa",
      logo: "/testimonials/quierotermino-logo.png",
      menuUrl: "https://menu.quierotermino.com/menu",
      isDark: false,
    },
  ];

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

        {/* Nuestros Clientes */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary border border-primary/20">
                  Nuestros Clientes
                </div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Restaurantes que Confían en Nosotros
                </h2>
                <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                  Conoce algunos de los restaurantes que han transformado sus
                  operaciones con FasterOrder.
                </p>
              </div>
            </FadeIn>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {clients.map((client, index) => (
                <FadeIn key={client.id} delay={index * 150} className="w-full">
                  <div
                    className={`flex flex-col items-center text-center space-y-6 p-8 rounded-xl border cursor-pointer transition-all duration-500 group relative overflow-hidden hover:scale-105 ${
                      client.isDark
                        ? "bg-gradient-to-br from-slate-900 via-black to-slate-800 hover:shadow-2xl hover:shadow-primary/20"
                        : "bg-background hover:shadow-lg"
                    }`}
                    onClick={() => window.open(client.menuUrl, "_blank")}
                  >
                    {/* Efecto de brillo sutil */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Logo con fondo especial */}
                    <div className="w-32 h-20 flex items-center justify-center relative z-10">
                      {client.isDark && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur-sm"></div>
                      )}
                      <Image
                        src={client.logo}
                        width={200}
                        height={100}
                        alt={`${client.name} Logo`}
                        className="w-full h-full object-contain relative z-10"
                      />
                    </div>

                    <div className="space-y-2 relative z-10">
                      <h3
                        className={`text-2xl font-bold ${
                          client.isDark ? "text-white" : "text-foreground"
                        }`}
                      >
                        {client.name}
                      </h3>
                      <p
                        className={
                          client.isDark
                            ? "text-slate-300"
                            : "text-muted-foreground"
                        }
                      >
                        {client.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform duration-300 relative z-10">
                      <span className="text-sm font-medium">Ver Menú</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <SiteFooter />
    </div>
  );
}
