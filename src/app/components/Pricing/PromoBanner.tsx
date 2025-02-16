"use client";

import React, { useState, useEffect } from "react";
import { Timer, Rocket, X } from "lucide-react";
import confetti from "canvas-confetti";
import { usePromoBanner } from "@/app/contexts/PromoBannerContext";

interface PromoBannerProps {
  t: (key: string) => string;
  className?: string;
  duration?: number;
  onClose?: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  t,
  className = "",
  duration = 3600,
  onClose,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const { isPromoBannerVisible, setIsPromoBannerVisible } = usePromoBanner();

  useEffect(() => {
    const isBannerDismissed = localStorage.getItem("promoBannerDismissed");
    const showPromoBanner = process.env.NEXT_PUBLIC_SHOW_PROMO_BANNER === "true";
    if (!isBannerDismissed && showPromoBanner) {
      setIsPromoBannerVisible(true);
    }
  }, [setIsPromoBannerVisible]);

  useEffect(() => {
    if (!isPromoBannerVisible) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPromoBannerVisible]);

  const handleClaimOffer = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#6366f1", "#22d3ee"],
    });

    const pricingSection = document.getElementById("pricing-section");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }

    setIsPromoBannerVisible(false);
    localStorage.setItem("promoBannerDismissed", "true");
  };

  const handleClose = () => {
    setIsPromoBannerVisible(false);
    localStorage.setItem("promoBannerDismissed", "true");
    onClose?.();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isPromoBannerVisible) return null;

  return (
    <div 
      className={`fixed top-0 left-0 w-full z-[100] bg-blue-600 text-white shadow-lg animate-slide-down ${className}`}
    >
      <div className="container mx-auto px-4 py-2 md:py-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold">
                {t("pricing.promoBanner.title")}
              </h3>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close promo banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <h3 className="text-lg font-bold tracking-tight">
              {t("pricing.promoBanner.title")}
            </h3>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-1.5 w-full md:w-auto">
              <Timer className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
              <span className="font-mono text-sm md:text-base">
                {t("pricing.promoBanner.endsIn")} {formatTime(timeLeft)}
              </span>
            </div>

            <button
              onClick={handleClaimOffer}
              className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors text-sm md:text-base whitespace-nowrap flex-shrink-0"
            >
              <Rocket className="w-4 h-4 md:w-5 md:h-5" />
              <span>{t("pricing.promoBanner.claimOfferButton")}</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close promo banner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;