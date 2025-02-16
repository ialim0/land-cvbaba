// components/PricingHero.tsx

import React from "react"

interface PrincingHeroProps {
  t: (key: string) => string;
}
const PricingHero: React.FC<PrincingHeroProps> = ({ t }) => (
    <div className="text-center pb-4 px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white sm:mb-6">
        {t('pricing.pricingHero.title')}
        </h2>
        <p className="text-xl mt-6 text-white/90  ">
        {t('pricing.pricingHero.subtitle')}
        </p>
    </div>
)

export default PricingHero
