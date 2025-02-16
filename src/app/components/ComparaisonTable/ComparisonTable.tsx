"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { COMPARISON_FEATURES } from "./data/comparisonFeatures";

const MONTHLY_DISCOUNT_PERCENTAGE = 0.5;
const FREE_MONTHS_ANNUAL = 2;

function getDiscountedMonthlyPrice(originalMonthly: number) {
  if (originalMonthly <= 0) return 0;
  return originalMonthly * (1 - MONTHLY_DISCOUNT_PERCENTAGE);
}

function getAnnualPrice(originalMonthly: number) {
  const discountedMonthly = getDiscountedMonthlyPrice(originalMonthly);
  const monthsPaid = 12 - FREE_MONTHS_ANNUAL;
  return discountedMonthly * monthsPaid;
}

function getMonthlyPriceBilledAnnually(originalMonthly: number) {
  return getAnnualPrice(originalMonthly) / 12;
}

function getAnnualDiscountPercentage(originalMonthly: number) {
  if (originalMonthly <= 0) return 0;
  const fullYearCostNoDiscount = originalMonthly * 12;
  const newAnnualCost = getAnnualPrice(originalMonthly);
  const saved = fullYearCostNoDiscount - newAnnualCost;
  return Math.round((saved / fullYearCostNoDiscount) * 100);
}

interface ComparisonTableProps {
  billingCycle: "monthly" | "annual";
  t(key: string, options?: { [key: string]: string }): string;
}

const ComparisonTable = ({ billingCycle, t }: ComparisonTableProps) => {
  const plans = [
    { 
      id: "star", 
      name: "Baba Star", 
      monthly: 10,
      paymentLinks: {
        monthly: "https://pay.cvbaba.com/buy/1418cfa7-1d2e-4c58-9ab6-b994ab197f64",
        annual: "https://pay.cvbaba.com/buy/1c506b82-ba51-4879-8a4c-37f4de86b141"
      }
    },
    { 
      id: "pro", 
      name: "Baba Pro", 
      monthly: 15,
      paymentLinks: {
        monthly: "https://pay.cvbaba.com/buy/3c3b2e2d-1a0a-465b-8da2-9a4bde41c7e9",
        annual: "https://pay.cvbaba.com/buy/b9ae1ce9-65c4-4319-a577-ffe0029d7060"
      }
    },
    { 
      id: "premium", 
      name: "Baba Premium", 
      monthly: 25,
      paymentLinks: {
        monthly: "https://pay.cvbaba.com/buy/e812b1f6-f235-404c-8eb9-a61fecb4fb9e",
        annual: "https://pay.cvbaba.com/buy/de8dd08a-c813-438e-a3eb-cd0e8f3bcfdd"
      }
    },
  ];

  const handlePlanClick = (plan: typeof plans[0], e: React.MouseEvent) => {
    e.preventDefault();
    const paymentLink = plan.paymentLinks[billingCycle];
    window.location.href = paymentLink;
  };

  return (
    <div className="w-full">
    

      <div className="w-full overflow-x-auto rounded-xl shadow-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100">
        <table className="w-full text-left text-sm border-collapse min-w-[900px]">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr className="border-b border-blue-200">
              <th className="p-4 sm:p-6 font-semibold w-1/3">{t("pricing.comparisonTable.features.feature")}</th>
              <th className="p-4 sm:p-6 font-semibold text-center text-gray-800 w-1/6">{t("pricing.comparisonTable.features.free")}</th>
              <th className="p-4 sm:p-6 font-semibold text-gray-800 text-center w-1/6">
                {t("pricing.comparisonTable.features.basic.label")}
              </th>
              <th className="p-4 sm:p-6 font-semibold text-gray-800 text-center w-1/6">
                {t("pricing.comparisonTable.features.pro.label")}
              </th>
              <th className="p-4 sm:p-6 font-semibold text-center text-gray-800 w-1/6">
                {t("pricing.comparisonTable.features.premium.label")}
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-blue-100">
            {COMPARISON_FEATURES.map((row, idx) => (
              <tr key={idx} className="hover:bg-blue-50/50">
                <td className="p-4 sm:p-6 text-gray-700 font-medium">{t(row.feature)}</td>
                <td className="p-4 sm:p-6 text-center font-normal">
                  {typeof row.free === "boolean" ? (
                    row.free ? (
                      <Check className="inline-block h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                    ) : (
                      <X className="inline-block h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                    )
                  ) : (
                    <span className="text-blue-600 font-medium">{t(row.free)}</span>
                  )}
                </td>
                <td className="p-4 sm:p-6 text-center font-normal">
                  {typeof row.basic === "boolean" ? (
                    row.basic ? (
                      <Check className="inline-block h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                    ) : (
                      <X className="inline-block h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                    )
                  ) : (
                    <span className="text-blue-600 font-medium">{t(row.basic)}</span>
                  )}
                </td>
                <td className="p-4 sm:p-6 text-center font-normal">
                  {typeof row.pro === "boolean" ? (
                    row.pro ? (
                      <Check className="inline-block h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                    ) : (
                      <X className="inline-block h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                    )
                  ) : (
                    <span className="text-blue-600 font-medium">{t(row.pro)}</span>
                  )}
                </td>
                <td className="p-4 sm:p-6 text-center font-normal">
                  {typeof row.premium === "boolean" ? (
                    row.premium ? (
                      <Check className="inline-block h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                    ) : (
                      <X className="inline-block h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                    )
                  ) : (
                    <span className="text-blue-600 font-medium">{t(row.premium)}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-12 w-full max-w-4xl mx-auto px-4">
        {plans.map((plan) => {
          if (billingCycle === "monthly") {
            const monthlyDiscounted = getDiscountedMonthlyPrice(plan.monthly);

            return (
              <a
                key={plan.id}
                href={plan.paymentLinks[billingCycle]}
                onClick={(e) => handlePlanClick(plan, e)}
                className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-center text-base sm:text-lg hover:from-blue-600 hover:to-blue-700 transition-colors duration-300 ease-in-out"
              >
                <div>
                  {t("pricing.comparisonTable.plans.cta", {
                    name: plan.name,
                    price: monthlyDiscounted.toFixed(2),
                  })}
                </div>
              </a>
            );
          } else {
            const totalAnnualPrice = getAnnualPrice(plan.monthly);
            const monthlyPriceAnnually = getMonthlyPriceBilledAnnually(plan.monthly);
            const annualDiscountPct = getAnnualDiscountPercentage(plan.monthly);

            return (
              <a
                key={plan.id}
                href={plan.paymentLinks[billingCycle]}
                onClick={(e) => handlePlanClick(plan, e)}
                className="w-full sm:w-auto min-w-[200px] bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-center hover:from-blue-600 hover:to-blue-700 transition-colors duration-300 ease-in-out"
              >
                <div className="text-base sm:text-lg">
                  {t("pricing.comparisonTable.plans.cta", {
                    name: plan.name,
                    price: monthlyPriceAnnually.toFixed(2),
                  })}
                </div>
                <div className="text-xs sm:text-sm font-normal opacity-90 mt-1">
                  {t("pricing.comparisonTable.plans.billedAnnually.text", {
                    price: totalAnnualPrice.toFixed(2),
                    discount: annualDiscountPct.toString(),
                  })}
                </div>
              </a>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ComparisonTable;