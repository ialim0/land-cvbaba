import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Card, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";

type BillingCycle = "monthly" | "annual";
type PlanType = "free_baba" | "star_baba" | "pro_baba" | "premium_baba";

interface PlanCardsProps {
  billingCycle: BillingCycle;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

interface Plan {
  name: string;
  description: string;
  monthly: number;
  highlight?: boolean;
  hoverColor?: string;
  paymentLinks?: {
    monthly: string;
    annual: string;
  };
}

const PLANS: Record<PlanType, Plan> = {
  free_baba: {
    name: "Free BABA",
    description: "Perfect for individuals getting started",
    monthly: 0,
    hoverColor: "hover:bg-emerald-100 border-emerald-200",
  },
  star_baba: {
    name: "Star BAABA",
    description: "Collaborate with up to 5 members",
    monthly: 10,
    hoverColor: "hover:bg-sky-100 border-sky-200",
    paymentLinks: {
      monthly: "https://pay.cvbaba.com/buy/1418cfa7-1d2e-4c58-9ab6-b994ab197f64",
      annual: "https://pay.cvbaba.com/buy/1c506b82-ba51-4879-8a4c-37f4de86b141"
    }
  },
  pro_baba: {
    name: "Pro BABA ",
    description: "Advanced features for growing teams",
    monthly: 15,
    highlight: true,
    hoverColor: "hover:bg-indigo-100 border-indigo-500",
    paymentLinks: {
      monthly: "https://pay.cvbaba.com/buy/3c3b2e2d-1a0a-465b-8da2-9a4bde41c7e9",
      annual: "https://pay.cvbaba.com/buy/b9ae1ce9-65c4-4319-a577-ffe0029d7060"
    }
  },
  premium_baba: {
    name: "Premium  BABA",
    description: "Custom solutions for large teams",
    monthly: 25,
    hoverColor: "hover:bg-purple-100 border-purple-200",
    paymentLinks: {
      monthly: "https://pay.cvbaba.com/buy/e812b1f6-f235-404c-8eb9-a61fecb4fb9e",
      annual: "https://pay.cvbaba.com/buy/de8dd08a-c813-438e-a3eb-cd0e8f3bcfdd"
    }
  },
};

const MONTHLY_DISCOUNT_PERCENTAGE = 0.5;
const FREE_MONTHS_ANNUAL = 2;

const getDiscountedMonthlyPrice = (originalMonthly: number) =>
  originalMonthly <= 0 ? 0 : originalMonthly * (1 - MONTHLY_DISCOUNT_PERCENTAGE);

const getAnnualPrice = (originalMonthly: number) =>
  getDiscountedMonthlyPrice(originalMonthly) * (12 - FREE_MONTHS_ANNUAL);

const getMonthlyPriceBilledAnnually = (originalMonthly: number) =>
  getAnnualPrice(originalMonthly) / 12;

const getAnnualDiscountPercentage = (originalMonthly: number) =>
  originalMonthly <= 0
    ? 0
    : Math.round(
        ((originalMonthly * 12 - getAnnualPrice(originalMonthly)) /
          (originalMonthly * 12)) *
          100
      );

const PlanCards: React.FC<PlanCardsProps> = ({ billingCycle, t }) => {
  const [hoveredPlan, setHoveredPlan] = useState<PlanType | null>(null);

  const handlePlanClick = (planId: PlanType) => {
    const plan = PLANS[planId];
    
    if (planId === "free_baba") {
      window.location.href = "/login";
      return;
    }

    const paymentLink = plan.paymentLinks?.[billingCycle];
    if (paymentLink) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#6366f1", "#22d3ee"],
      });
      window.location.href = paymentLink;
    }
  };

  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Object.entries(PLANS).map(([planId, plan]) => {
          const originalMonthly = plan.monthly;
          const discountedMonthly = getDiscountedMonthlyPrice(originalMonthly);
          const monthlyPriceBilledAnnually =
            getMonthlyPriceBilledAnnually(originalMonthly);
          const annualDiscountPct = getAnnualDiscountPercentage(originalMonthly);
          const isFreePlan = planId === "free_baba";

          return (
            <Card
              key={planId}
              className={`relative group flex flex-col h-full ${
                billingCycle === 'monthly' ? 'min-h-[320px]' : 'min-h-[400px]'
              } rounded-2xl border transition-all duration-300 
                bg-gradient-to-b from-blue-50 to-white ${plan.hoverColor} 
                ${
                  plan.highlight
                    ? "shadow-2xl border-indigo-500 scale-[1.02]"
                    : "shadow-lg hover:shadow-xl"
                }`}
              onMouseEnter={() => setHoveredPlan(planId as PlanType)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <CardHeader className="pt-6 pb-4 px-6 text-center flex-shrink-0">
                <CardTitle className="text-xl font-extrabold text-gray-900 truncate">
                  {plan.highlight && (
                    <span className="text-indigo-600 mr-2">👑</span>
                  )}
                  {t(`pricing.plans.${planId}.name`, { defaultValue: plan.name })}
                </CardTitle>
                <p className={`text-sm text-gray-600 mt-2 ${
                  billingCycle === 'monthly' 
                    ? 'min-h-[40px] line-clamp-3' 
                    : 'min-h-[60px] line-clamp-4'
                }`}>
                  {t(`pricing.plans.${planId}.description`, {
                    defaultValue: plan.description,
                  })}
                </p>
              </CardHeader>

              <div className="flex-grow flex flex-col items-center justify-center mt-2 px-4 text-center">
                <div className="h-6">
                  <span
                    className={`text-xl font-bold ${
                      isFreePlan ? "invisible" : "text-gray-400 line-through"
                    }`}
                  >
                    {!isFreePlan && `$${originalMonthly.toFixed(2)}`}
                  </span>
                </div>
                <span className="text-4xl font-bold text-gray-800 mb-1">
                  {isFreePlan
                    ? "$0"
                    : billingCycle === "monthly"
                    ? `$${discountedMonthly.toFixed(2)}`
                    : `$${monthlyPriceBilledAnnually.toFixed(2)}`}
                  {!isFreePlan && (
                    <span className="text-lg text-gray-500">/mo</span>
                  )}
                </span>
                {billingCycle === 'annual' && (
                  <>
                    {!isFreePlan && annualDiscountPct > 0 && (
                      <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm mb-1">
                        Save {annualDiscountPct}%
                      </span>
                    )}
                    {!isFreePlan && (
                      <p className="text-xs text-gray-500 text-center">
                        {t(`pricing.plans.billed_at_text`, {
                          price: `$${getAnnualPrice(originalMonthly).toFixed(2)} `,
                        })}
                      </p>
                    )}
                  </>
                )}
              </div>

              <div className="px-6 mb-4 mt-auto">
                <Button
                  className="w-full h-12 rounded-lg text-base font-semibold text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePlanClick(planId as PlanType)}
                >
                  {t(`pricing.plans.${planId}.buttonText`, {
                    defaultValue: isFreePlan ? "Get Started Free" : "Choose Plan",
                  })}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlanCards;