"use client";

import { useState, useEffect } from "react";

interface AdminCurrencyDisplayProps {
  amount: number;
  showSymbol?: boolean;
  className?: string;
}

interface CurrencySettings {
  enableVenezuelanBs: boolean;
  bcvRate: number;
  parallelRate: number;
  customRate: number;
  preferredRateSource: "bcv" | "parallel" | "custom";
}

export default function AdminCurrencyDisplay({
  amount,
  showSymbol = true,
  className = "",
}: AdminCurrencyDisplayProps) {
  const [showBs, setShowBs] = useState(false);
  const [bcvRate, setBcvRate] = useState(0);
  const [parallelRate, setParallelRate] = useState(0);
  const [customRate, setCustomRate] = useState(0);
  const [preferredRateSource, setPreferredRateSource] = useState<string>("bcv");
  const [currencySymbol, setCurrencySymbol] = useState("$");

  useEffect(() => {
    // Load payment settings from localStorage
    const paymentSettings = localStorage.getItem("restaurantPaymentSettings");
    if (paymentSettings) {
      try {
        const parsedSettings = JSON.parse(paymentSettings) as CurrencySettings;
        setShowBs(parsedSettings.enableVenezuelanBs || false);
        setBcvRate(parsedSettings.bcvRate || 0);
        setParallelRate(parsedSettings.parallelRate || 0);
        setCustomRate(parsedSettings.customRate || 0);
        setPreferredRateSource(parsedSettings.preferredRateSource || "bcv");
      } catch (error) {
        console.error("Error parsing payment settings:", error);
      }
    }

    // Load general settings to get the currency symbol
    const generalSettings = localStorage.getItem("restaurantGeneralSettings");
    if (generalSettings) {
      try {
        const parsedGeneralSettings = JSON.parse(generalSettings);
        if (parsedGeneralSettings.currency === "USD") {
          setCurrencySymbol("$");
        } else if (parsedGeneralSettings.currency === "EUR") {
          setCurrencySymbol("€");
        } else if (parsedGeneralSettings.currency === "GBP") {
          setCurrencySymbol("£");
        } else if (parsedGeneralSettings.currency === "CAD") {
          setCurrencySymbol("C$");
        } else if (parsedGeneralSettings.currency === "AUD") {
          setCurrencySymbol("A$");
        } else {
          setCurrencySymbol("$"); // Default to $ if currency not recognized
        }
      } catch (error) {
        console.error("Error parsing general settings:", error);
      }
    }

    // Listen for storage changes to update in real-time
    const handleStorageChange = () => {
      const updatedPaymentSettings = localStorage.getItem(
        "restaurantPaymentSettings"
      );
      if (updatedPaymentSettings) {
        try {
          const parsedSettings = JSON.parse(
            updatedPaymentSettings
          ) as CurrencySettings;
          setShowBs(parsedSettings.enableVenezuelanBs || false);
          setBcvRate(parsedSettings.bcvRate || 0);
          setParallelRate(parsedSettings.parallelRate || 0);
          setCustomRate(parsedSettings.customRate || 0);
          setPreferredRateSource(parsedSettings.preferredRateSource || "bcv");
        } catch (error) {
          console.error("Error parsing updated payment settings:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!showBs) {
    return (
      <span className={className}>
        {showSymbol ? currencySymbol : ""}
        {amount.toFixed(2)}
      </span>
    );
  }

  // Get the current exchange rate based on preferred source
  const getCurrentRate = () => {
    switch (preferredRateSource) {
      case "bcv":
        return bcvRate;
      case "parallel":
        return parallelRate;
      case "custom":
        return customRate;
      default:
        return 0;
    }
  };

  const exchangeRate = getCurrentRate();
  if (exchangeRate <= 0) {
    return (
      <span className={className}>
        {showSymbol ? currencySymbol : ""}
        {amount.toFixed(2)}
      </span>
    );
  }

  // Calculate the amount in Bs
  const bsAmount = amount * exchangeRate;

  // Get rate source label
  const getRateLabel = () => {
    switch (preferredRateSource) {
      case "bcv":
        return "BCV";
      case "parallel":
        return "Paralelo";
      case "custom":
        return "Personalizado";
      default:
        return "";
    }
  };

  return (
    <span className={className}>
      {showSymbol ? currencySymbol : ""}
      {amount.toFixed(2)}
      <span className="text-muted-foreground text-sm ml-1">
        ({bsAmount.toFixed(2)} Bs - {getRateLabel()})
      </span>
    </span>
  );
}
