// components/PricingToggle.tsx

"use client"

import React from 'react';

interface PricingToggleProps {
  value: "monthly" | "annual";
  onChange: (val: "monthly" | "annual") => void;
  optionA?: string;
  optionB?: string;
  t: (key: string) => string; 
}

const PricingToggle: React.FC<PricingToggleProps> = ({
  value,
  onChange,
  optionA = "Monthly",
  optionB = "Annually",
  t,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 ">
      <span
        onClick={() => onChange("monthly")}
        className={`cursor-pointer px-3 py-1 rounded-l-full transition 
          ${value === "monthly" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
      >
        {t('pricing.pricingtoggle.monthly')} 
      </span>
      <span
        onClick={() => onChange("annual")}
        className={`cursor-pointer px-3 py-1 rounded-r-full transition 
          ${value === "annual" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
      >
        {t('pricing.pricingtoggle.annual')} 
      </span>
    </div>
  );
};

export default PricingToggle
