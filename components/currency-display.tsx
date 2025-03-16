"use client";

import { useState, useEffect } from "react";

interface CurrencyDisplayProps {
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

export default function CurrencyDisplay({
  amount,
  showSymbol = true,
  className = "",
}: CurrencyDisplayProps) {
  const [showBs, setShowBs] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rateSource, setRateSource] = useState<string>("bcv");
  const [currencySymbol, setCurrencySymbol] = useState("$");

  useEffect(() => {
    // Load payment settings from localStorage
    const paymentSettings = localStorage.getItem("restaurantPaymentSettings");
    if (paymentSettings) {
      try {
        const parsedSettings = JSON.parse(paymentSettings) as CurrencySettings;
        setShowBs(parsedSettings.enableVenezuelanBs || false);

        // Set the exchange rate based on the preferred rate source
        if (parsedSettings.preferredRateSource === "bcv") {
          setExchangeRate(parsedSettings.bcvRate || 0);
          setRateSource("bcv");
        } else if (parsedSettings.preferredRateSource === "parallel") {
          setExchangeRate(parsedSettings.parallelRate || 0);
          setRateSource("parallel");
        } else if (parsedSettings.preferredRateSource === "custom") {
          setExchangeRate(parsedSettings.customRate || 0);
          setRateSource("custom");
        }
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

          // Update exchange rate based on preferred source
          if (parsedSettings.preferredRateSource === "bcv") {
            setExchangeRate(parsedSettings.bcvRate || 0);
            setRateSource("bcv");
          } else if (parsedSettings.preferredRateSource === "parallel") {
            setExchangeRate(parsedSettings.parallelRate || 0);
            setRateSource("parallel");
          } else if (parsedSettings.preferredRateSource === "custom") {
            setExchangeRate(parsedSettings.customRate || 0);
            setRateSource("custom");
          }
        } catch (error) {
          console.error("Error parsing updated payment settings:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!showBs || exchangeRate <= 0) {
    return (
      <span className={className}>
        {showSymbol ? currencySymbol : ""}
        {amount.toFixed(2)}
      </span>
    );
  }

  // Calculate the amount in Bs
  const bsAmount = amount * exchangeRate;

  return (
    <span className={className}>
      {showSymbol ? currencySymbol : ""}
      {amount.toFixed(2)}
      <span className="text-muted-foreground text-sm ml-1 ">
        ({bsAmount.toFixed(2)} Bs)
      </span>
    </span>
  );
}
