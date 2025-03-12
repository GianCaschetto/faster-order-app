"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"

interface AdminCurrencyDisplayProps {
  amount: number
  showAllRates?: boolean
  className?: string
}

export default function AdminCurrencyDisplay({
  amount,
  showAllRates = false,
  className = "",
}: AdminCurrencyDisplayProps) {
  const [exchangeSettings, setExchangeSettings] = useState({
    enableVenezuelanBs: false,
    bcvRate: 35.5,
    parallelRate: 38.2,
    customRate: 36.0,
    preferredRateSource: "bcv" as "bcv" | "parallel" | "custom",
  })

  useEffect(() => {
    // Load exchange rate settings from localStorage
    const savedPaymentSettings = localStorage.getItem("restaurantPaymentSettings")
    if (savedPaymentSettings) {
      try {
        const parsedSettings = JSON.parse(savedPaymentSettings)
        setExchangeSettings({
          enableVenezuelanBs: parsedSettings.enableVenezuelanBs || false,
          bcvRate: parsedSettings.bcvRate || 35.5,
          parallelRate: parsedSettings.parallelRate || 38.2,
          customRate: parsedSettings.customRate || 36.0,
          preferredRateSource: parsedSettings.preferredRateSource || "bcv",
        })
      } catch (error) {
        console.error("Error parsing saved payment settings:", error)
      }
    }
  }, [])

  // If Venezuelan Bs is not enabled, just return USD
  if (!exchangeSettings.enableVenezuelanBs) {
    return <span className={className}>${amount.toFixed(2)}</span>
  }

  // Calculate Bs amounts for each rate
  const bcvAmount = amount * exchangeSettings.bcvRate
  const parallelAmount = amount * exchangeSettings.parallelRate
  const customAmount = amount * exchangeSettings.customRate

  // Format the Bs amount with thousands separators
  const formatBsAmount = (bsAmount: number) => {
    return new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(bsAmount)
  }

  // Get the preferred rate amount
  const getPreferredAmount = () => {
    switch (exchangeSettings.preferredRateSource) {
      case "bcv":
        return bcvAmount
      case "parallel":
        return parallelAmount
      case "custom":
        return customAmount
      default:
        return bcvAmount
    }
  }

  // If not showing all rates, just show the preferred rate
  if (!showAllRates) {
    const preferredAmount = getPreferredAmount()
    return (
      <span className={className}>
        ${amount.toFixed(2)} <span className="text-muted-foreground">({formatBsAmount(preferredAmount)} Bs)</span>
      </span>
    )
  }

  // Show all rates with badges
  return (
    <div className={`space-y-1 ${className}`}>
      <div>${amount.toFixed(2)}</div>
      <div className="flex flex-col gap-1 text-xs">
        <div className="flex items-center gap-1">
          <Badge
            variant={exchangeSettings.preferredRateSource === "bcv" ? "default" : "outline"}
            className="text-xs px-1"
          >
            BCV
          </Badge>
          <span>{formatBsAmount(bcvAmount)} Bs</span>
        </div>
        <div className="flex items-center gap-1">
          <Badge
            variant={exchangeSettings.preferredRateSource === "parallel" ? "default" : "outline"}
            className="text-xs px-1"
          >
            Parallel
          </Badge>
          <span>{formatBsAmount(parallelAmount)} Bs</span>
        </div>
        <div className="flex items-center gap-1">
          <Badge
            variant={exchangeSettings.preferredRateSource === "custom" ? "default" : "outline"}
            className="text-xs px-1"
          >
            Custom
          </Badge>
          <span>{formatBsAmount(customAmount)} Bs</span>
        </div>
      </div>
    </div>
  )
}

