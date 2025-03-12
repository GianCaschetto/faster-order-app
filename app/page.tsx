import RestaurantMenu from "@/components/restaurant-menu"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Restaurant Menu & Cart",
  description: "Order delicious food from our restaurant",
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <RestaurantMenu />
    </main>
  )
}

