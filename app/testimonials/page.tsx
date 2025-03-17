import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FadeIn } from "@/components/animations";
import CallToAction from "@/components/call-to-action";

export default function TestimonialsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Lo Que Dicen Nuestros Clientes
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  No te quedes solo con nuestra palabra. Mira cómo FasterOrder
                  ha ayudado a negocios como el tuyo.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FadeIn delay={100} className="transition-all duration-300">
                <Card className="bg-background h-full transition-transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        width={60}
                        height={60}
                        alt="Customer profile"
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </div>
                        <blockquote className="text-muted-foreground mb-4">
                          &quot;FasterOrder ha transformado completamente cómo
                          manejamos los pedidos. Nuestro tiempo de procesamiento
                          se ha reducido a la mitad, y nuestros clientes están
                          más felices que nunca.&quot;
                        </blockquote>
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-sm text-muted-foreground">
                            Café Delight, Propietaria
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={200} className="transition-all duration-300">
                <Card className="bg-background h-full transition-transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        width={60}
                        height={60}
                        alt="Customer profile"
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </div>
                        <blockquote className="text-muted-foreground mb-4">
                          &quot;Solo las funciones de análisis ya valen la
                          inversión. Hemos podido identificar nuestros productos
                          más vendidos y optimizar nuestro inventario en
                          consecuencia.&quot;
                        </blockquote>
                        <div>
                          <p className="font-medium">Michael Chen</p>
                          <p className="text-sm text-muted-foreground">
                            Urban Threads, Gerente
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={300} className="transition-all duration-300">
                <Card className="bg-background h-full transition-transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        width={60}
                        height={60}
                        alt="Customer profile"
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </div>
                        <blockquote className="text-muted-foreground mb-4">
                          &quot;El soporte al cliente es excepcional. Siempre
                          que hemos tenido preguntas, el equipo ha sido rápido
                          en responder e increíblemente útil.&quot;
                        </blockquote>
                        <div>
                          <p className="font-medium">Emily Rodriguez</p>
                          <p className="text-sm text-muted-foreground">
                            Sunset Spa, Directora
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={400} className="transition-all duration-300">
                <Card className="bg-background h-full transition-transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        width={60}
                        height={60}
                        alt="Customer profile"
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4" />
                        </div>
                        <blockquote className="text-muted-foreground mb-4">
                          &quot;La aplicación móvil es revolucionaria. Puedo
                          revisar pedidos e inventario incluso cuando estoy
                          lejos de la tienda. Me ha dado mucha más
                          flexibilidad.&quot;
                        </blockquote>
                        <div>
                          <p className="font-medium">David Thompson</p>
                          <p className="text-sm text-muted-foreground">
                            Thompson Books, Propietario
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={500} className="transition-all duration-300">
                <Card className="bg-background h-full transition-transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        width={60}
                        height={60}
                        alt="Customer profile"
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </div>
                        <blockquote className="text-muted-foreground mb-4">
                          &quot;Hemos reducido los errores en un 90% desde que
                          implementamos FasterOrder. El sistema es intuitivo y
                          nuestro personal lo aprendió rápidamente con un
                          entrenamiento mínimo.&quot;
                        </blockquote>
                        <div>
                          <p className="font-medium">Jessica Kim</p>
                          <p className="text-sm text-muted-foreground">
                            Fresh Market, Gerente de Operaciones
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
              <FadeIn delay={600} className="transition-all duration-300">
                <Card className="bg-background h-full transition-transform hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        width={60}
                        height={60}
                        alt="Customer profile"
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <Star className="h-4 w-4 fill-primary text-primary" />
                        </div>
                        <blockquote className="text-muted-foreground mb-4">
                          &quot;La integración con nuestro software de
                          contabilidad nos ha ahorrado horas de entrada manual
                          de datos cada semana. FasterOrder se ha pagado a sí
                          mismo muchas veces.&quot;
                        </blockquote>
                        <div>
                          <p className="font-medium">Robert Wilson</p>
                          <p className="text-sm text-muted-foreground">
                            Wilson Hardware, Director Financiero
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <FadeIn
                delay={150}
                direction="right"
                className="transition-transform hover:scale-[1.02]"
              >
                <Image
                  src="/placeholder.svg?height=720&width=1280"
                  width={1280}
                  height={720}
                  alt="Customer success story"
                  className="rounded-lg border shadow-lg"
                />
              </FadeIn>
              <FadeIn delay={300} direction="left" className="space-y-6">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Historia de Éxito
                </div>
                <h2 className="text-3xl font-bold">
                  Cómo Café Delight Aumentó sus Ingresos en un 35%
                </h2>
                <p className="text-muted-foreground">
                  Sarah Johnson, propietaria de Café Delight, estaba luchando
                  con largas filas y errores en los pedidos durante las horas
                  punta. Después de implementar FasterOrder, su equipo pudo
                  procesar pedidos de manera más eficiente, lo que llevó a
                  tiempos de espera más cortos y clientes más felices.
                </p>
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                  &quot;En solo tres meses de usar FasterOrder, vimos un aumento
                  del 35% en los ingresos. Podemos atender a más clientes
                  durante las horas punta, y nuestro personal está menos
                  estresado. Ha sido un cambio radical para nuestro
                  negocio.&quot;
                </blockquote>
                <Button className="mt-4 transition-transform hover:scale-105">
                  Leer el caso completo <ArrowRight className="ml-2 h-4 w-4" />
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
