"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import StockManagement from "@/components/stock-management"

export default function StockPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken")
    const user = localStorage.getItem("adminUser")

    if (!token || !user) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return <StockManagement />
}

