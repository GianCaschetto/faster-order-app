"use client";

import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminCurrencyDisplayProps {
  amount: number;
  showAllRates?: boolean;
  className?: string;
}

export default function AdminCurrencyDisplay({
  amount,
  showAllRates = true,
  className = "",
}: AdminCurrencyDisplayProps) {
  const [currencySettings, setCurrencySettings] = useState({
    showBs: false,
    bcv: 0,
    parallel: 0,
    custom: 0,
    preferredRate: "bcv",
  });

  useEffect(() => {
    // Load settings from localStorage
    const settings = localStorage.getItem("currency-settings");
    if (settings) {
      setCurrencySettings(JSON.parse(settings));
    }
  }, []);

  if (!currencySettings.showBs) {
    return <span className={className}>${amount.toFixed(2)}</span>;
  }

  // Calculate amounts using different rates
  const bcvAmount = amount * currencySettings.bcv;
  const parallelAmount = amount * currencySettings.parallel;
  const customAmount = amount * currencySettings.custom;

  // Get the preferred rate amount
  const preferredAmount =
    amount *
    (currencySettings[
      currencySettings.preferredRate as keyof typeof currencySettings
    ] as number);

  if (!showAllRates) {
    return (
      <span className={className}>
        ${amount.toFixed(2)}
        <span className="text-muted-foreground text-sm ml-1">
          ({preferredAmount.toFixed(2)} Bs)
        </span>
      </span>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`cursor-help ${className}`}>
            ${amount.toFixed(2)}
            <span className="text-muted-foreground text-sm ml-1">
              ({preferredAmount.toFixed(2)} Bs)
            </span>
          </span>
        </TooltipTrigger>
        <TooltipContent className="w-60">
          <div className="space-y-1">
            <div className="font-medium">Exchange Rates</div>
            {currencySettings.bcv > 0 && (
              <div className="flex justify-between text-sm">
                <span>BCV Official:</span>
                <span>{bcvAmount.toFixed(2)} Bs</span>
              </div>
            )}
            {currencySettings.parallel > 0 && (
              <div className="flex justify-between text-sm">
                <span>Parallel Market:</span>
                <span>{parallelAmount.toFixed(2)} Bs</span>
              </div>
            )}
            {currencySettings.custom > 0 && (
              <div className="flex justify-between text-sm">
                <span>Custom Rate:</span>
                <span>{customAmount.toFixed(2)} Bs</span>
              </div>
            )}
            <div className="text-xs text-muted-foreground pt-1">
              Using {currencySettings.preferredRate.toUpperCase()} rate
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
