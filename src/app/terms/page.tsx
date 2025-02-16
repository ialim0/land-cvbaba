"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/Accordion";
import { Card, CardContent } from "../components/ui/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTranslation } from "../i18n/i18n";

interface HeaderProps {
  t: (key: string, options?: { [key: string]: string | boolean }) => string | string[];
}

const Header: React.FC<HeaderProps> = ({ t }) => (
  <header className="w-full px-4 sm:px-6 lg:px-8 mx-auto text-center py-6 sm:py-12 lg:py-16">
    <h2 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-white mb-4 sm:mb-6 leading-snug">
      {t('termsOfService.header.title')}
    </h2>
    <p className="text-base sm:text-lg lg:text-xl mt-4 sm:mt-6 mb-6 sm:mb-8 text-gray-200 px-2 sm:px-4">
      {t('termsOfService.header.subtitle')}
    </p>
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 lg:p-8">
      <h3 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center leading-snug">
        {t('termsOfService.keyPoints.title') as string}
      </h3>
      <ul className="list-disc pl-5 sm:pl-8 space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-200 mx-auto max-w-2xl">
        {(t('termsOfService.keyPoints.points', { returnObjects: true }) as string[]).map((point, index) => (
          <li key={index} className="text-left">
            {point}
          </li>
        ))}
      </ul>
    </div>
  </header>
);


interface TermsSectionProps {
  title: string;
  children: React.ReactNode;
}

const CustomAccordionTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}> = ({ children, className, isOpen }) => (
  <div className={`${className} flex items-center justify-between`}>
    {children}
    <div className="relative w-4 h-4 flex-shrink-0">
      <div className="absolute top-1/2 left-0 w-4 h-0.5 bg-gray-800 transform -translate-y-1/2" />
      <div
        className={`absolute top-1/2 left-1/2 w-0.5 h-4 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500
          ${isOpen ? 'rotate-90' : 'rotate-0'}`}
      />
    </div>
  </div>
);

const TermsSection = ({ title, children }: TermsSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem value={title} className="bg-white rounded-lg sm:rounded-2xl">
      <AccordionTrigger
        className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 py-3 px-4 w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CustomAccordionTrigger className="w-full" isOpen={isOpen}>
          <span className="flex-grow pr-4">{title}</span>
        </CustomAccordionTrigger>
      </AccordionTrigger>
      <AccordionContent className="text-gray-700 rounded-lg sm:rounded-xl mt-1 sm:mt-2 md:mt-3 bg-gray-100 leading-relaxed text-sm sm:text-base space-y-2 p-4 sm:p-6">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};

interface TermsContentProps {
  t: (key: string, options?: { [key: string]: string | boolean }) => string | object;
}

const TermsContent: React.FC<TermsContentProps> = ({ t }) => {
  const sections = [
    "acceptanceOfTerms",
    "descriptionOfService",
    "userAccounts",
    "userContent",
    "intellectualProperty",
    "termination",
    "disclaimers",
    "limitationOfLiability",
    "governingLaw",
    "changesToTerms",
    "contactUs",
  ];

  return (
    <Card className="mx-4 sm:mx-6 lg:mx-8 mb-8 sm:mb-12 max-w-4xl lg:mx-auto shadow-none border-none">
      <CardContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-6 sm:pt-8">
        <Accordion type="multiple" className="space-y-3 sm:space-y-4">
          {sections.map((section) => (
            <TermsSection
              key={section}
              title={t(`termsOfService.sections.${section}.title`) as string}
            >
              <p dangerouslySetInnerHTML={{ __html: t(`termsOfService.sections.${section}.content`) as string }} />
            </TermsSection>
          ))}
        </Accordion>
      </CardContent>
      <CardContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
        <p className="text-gray-600 text-sm sm:text-base">
          {t('termsOfService.lastUpdated').toString()} 1/23/2025
        </p>
      </CardContent>
    </Card>
  );
};

const TermsOfService = () => {
  const { t } = useTranslation('home');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white w-full">
        <Navbar />
      </div>
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-20">
        <Header t={t} />
      </div>
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white w-full">
        <TermsContent t={t} />
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;