'use client';

import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing/Pricing";
import { useTranslation } from '../i18n/i18n';
import FAQComponent from "../components/Faq/FAQComponent";
import CallToAction from "../components/Home/CallToAction";
import { PromoBannerProvider } from "../contexts/PromoBannerContext";
import PromoBanner from "../components/Pricing/PromoBanner";
import Navbar from "../components/Navbar";



const PricingPage = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Head>
        <title>{t('pricing.meta.title')}</title>
        <meta name="description" content={t('pricing.meta.description')} />
        <meta property="og:title" content={t('pricing.meta.og.title')} />
        <meta property="og:description" content={t('pricing.meta.og.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/babaai.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={t('pricing.meta.og.imageAlt')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('pricing.meta.twitter.title')} />
        <meta name="twitter:description" content={t('pricing.meta.twitter.description')} />
        <meta name="twitter:image" content="/images/babaai.png" />
      </Head>

      <PromoBannerProvider>
        <div className="flex flex-col bg-gradient-to-b from-slate-800 to-slate-900 min-h-screen">
          <PromoBanner t={t} />

          <div className="bg-gradient-to-b from-blue-50 to-white">
            <Navbar />
          </div>

          <div className="flex-grow pt-40">
            <Pricing />
          </div>

          <div className="bg-gradient-to-b from-blue-50 to-white p-10">
            <CallToAction t={t} />
            <FAQComponent t={t} />
          </div>

          <Footer />
        </div>
      </PromoBannerProvider>
    </>
  );
};

export default PricingPage;