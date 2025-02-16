"use client";
import React, { useState } from "react";
import PricingHero from "./PricingHero";
import PromoBanner from "./PromoBanner";
import PricingToggle from "./PricingToggle";
import PlanCards from "./PlanCards";
import ComparisonTable from "../ComparaisonTable/ComparisonTable";
import { useTranslation } from '../../i18n/i18n';

interface PricingProps {
  showHero?: boolean;
  showPromoBanner?: boolean;
  showComparisonTable?: boolean;
}

const Pricing = ({
  showHero = true,
  showPromoBanner = false,
  showComparisonTable = true,
}: PricingProps) => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const { t } = useTranslation('home');

  return (
    <div id="pricing-section" className="min-h-screen w-full  ">
      {showHero && (
        <div className="border-b border-slate-700/50">
          <PricingHero t={t}/>
        </div>
      )}
      
      {showPromoBanner && (
        <div className="container mx-auto px-4 py-8 border-b border-slate-700/50">
          <PromoBanner t={t}/>
        </div>
      )}
      
      <div className="w-full py-6 sm:py-8 border-b border-slate-700/50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <PricingToggle
              value={billingCycle}
              onChange={(val) => setBillingCycle(val)}
              optionA="Monthly"
              optionB="Annually"
              t={t}
            />
          </div>
          <div>
            <PlanCards billingCycle={billingCycle} t={t} />
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-center text-white mt-4">
        {t("pricing.comparisonTable.title")}
      </h3>
      </div>
      
      {showComparisonTable && (
        <div className="w-full py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <ComparisonTable billingCycle={billingCycle} t={t} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Pricing;