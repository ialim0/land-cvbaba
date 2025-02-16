

'use client';

import React from 'react';
import { useTranslation } from './i18n/i18n';
import { PromoBannerProvider } from './contexts/PromoBannerContext';
import PromoBanner from './components/Pricing/PromoBanner';
import Navbar from './components/Navbar';
import Hero from './components/Home/Hero';
import Trusted from './components/Home/Trusted';
import Features from './components/Home/Features';
import Pricing from './components/Pricing/Pricing';
import CallToAction from './components/Home/CallToAction';
import FAQComponent from './components/Faq/FAQComponent';
import Footer from './components/Footer';



export default function LandingPage() {
  const { t } = useTranslation('home');

  return (
    <PromoBannerProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 overflow-x-hidden">
        <PromoBanner t={t} />
        <Navbar />

        <div className={`bg-gradient-to-b from-blue-50 to-white ${t('pricing.promoBanner.title') ? 'pt-20' : 'pt-10'} scroll-smooth`}>
          <Hero t={t} />
          <Trusted t={t} />
        </div>

        <main className="flex-grow space-y-16 md:space-y-24 lg:space-y-32">
          <div className="container mx-auto px-4">
            <Features t={t} />
          </div>

          <div className="container mx-auto px-4">
            <Pricing />
          </div>

          <div className="bg-gradient-to-b from-blue-50 to-white py-16">
            <div className="container mx-auto px-4">
              <CallToAction t={t} />
              <FAQComponent t={t} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PromoBannerProvider>
  );
}
