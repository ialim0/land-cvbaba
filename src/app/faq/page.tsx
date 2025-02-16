"use client";

import React from "react";
import Footer from "../components/Footer";
import FAQComponent from "../components/Faq/FAQComponent";
import { useTranslation } from "../i18n/i18n";
import Navbar from "../components/Navbar";

interface HeaderProps {
  t: (key: string) => string;
}

const Header: React.FC<HeaderProps> = ({ t }) => (
  <header className="w-full px-4 sm:px-6 lg:px-8 mx-auto text-center py-8 sm:py-12 lg:py-16">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 sm:mb-6">
      {t('faq.secondTitle')}
    </h2>
    <p className="text-lg sm:text-xl mt-4 sm:mt-6 mb-6 sm:mb-8 text-gray-200 px-4">
      {t('faq.subtitle')}
    </p>
  </header>
);

const FAQPage: React.FC = () => {
  const { t } = useTranslation('home');
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white w-full pt-20">
        <Navbar />
      </div>
      <div className="bg-gradient-to-b from-slate-800 to-slate-900">
        <Header t={t} />
      </div>
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white w-full">
        <FAQComponent t={t} />
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;