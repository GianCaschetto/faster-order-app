"use client";
import Lottie from "lottie-react";
import deliveryAnimation from "@/public/animations/delivery-guy.json";

interface DeliveryLottieProps {
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export function DeliveryLottie({
  className = "",
  loop = true,
  autoplay = true,
}: DeliveryLottieProps) {
  return (
    <Lottie
      animationData={deliveryAnimation}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
