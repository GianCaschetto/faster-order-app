"use client";

import { useState, useEffect } from "react";

interface CurrencyDisplayProps {
  amount: number;
  showSymbol?: boolean;
  className?: string;
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

  useEffect(() => {
    // Load settings from localStorage
    const settings = localStorage.getItem("currency-settings");
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setShowBs(parsedSettings.showBs || false);
      setExchangeRate(parsedSettings[parsedSettings.preferredRate] || 0);
      setRateSource(parsedSettings.preferredRate || "bcv");
    }
  }, []);

  if (!showBs || exchangeRate <= 0) {
    return (
      <span className={className}>
        {showSymbol ? "$" : ""}
        {amount.toFixed(2)}
      </span>
    );
  }

  // Calculate the amount in Bs
  const bsAmount = amount * exchangeRate;

  return (
    <span className={className}>
      {showSymbol ? "$" : ""}
      {amount.toFixed(2)}
      <span className="text-muted-foreground text-sm ml-1">
        ({bsAmount.toFixed(2)} Bs)
      </span>
    </span>
  );
}
