import RestaurantMenu from "@/components/restaurant-menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menú del Restaurante",
  description: "Ordena deliciosa comida de nuestro restaurante",
};

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <RestaurantMenu />
    </main>
  );
}
