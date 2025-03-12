"use client"

import { useState, useEffect } from "react"

interface CurrencyDisplayProps {
  amount: number
  showBs?: boolean
  className?: string
}

export default function CurrencyDisplay({ amount, showBs = true, className = "" }: CurrencyDisplayProps) {
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

  // Calculate Bs amount based on preferred rate
  const calculateBsAmount = () => {
    let rate = 0
    switch (exchangeSettings.preferredRateSource) {
      case "bcv":
        rate = exchangeSettings.bcvRate
        break
      case "parallel":
        rate = exchangeSettings.parallelRate
        break
      case "custom":
        rate = exchangeSettings.customRate
        break
      default:
        rate = exchangeSettings.bcvRate
    }
    return amount * rate
  }

  // Format the Bs amount with thousands separators
  const formatBsAmount = (bsAmount: number) => {
    return new Intl.NumberFormat("es-VE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(bsAmount)
  }

  // If Venezuelan Bs is not enabled or explicitly not shown, just return USD
  if (!exchangeSettings.enableVenezuelanBs || !showBs) {
    return <span className={className}>${amount.toFixed(2)}</span>
  }

  // Calculate and format the Bs amount
  const bsAmount = calculateBsAmount()
  const formattedBsAmount = formatBsAmount(bsAmount)

  return (
    <span className={className}>
      ${amount.toFixed(2)} <span className="text-muted-foreground">({formattedBsAmount} Bs)</span>
    </span>
  )
}

