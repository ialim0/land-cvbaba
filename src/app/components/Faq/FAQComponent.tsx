"use client";

import React, { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/Accordion";
import Link from "next/link";

interface FAQItemProps {
  question: string;
  answer: string;
}

interface FAQComponentProps {
  t: (key: string, options?: { [key: string]: string | boolean }) => string;
}

const CONTACT_EMAIL = "support@cvbaba.com";

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

const FAQSection: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AccordionItem value={question} className="bg-white rounded-lg sm:rounded-2xl">
      <AccordionTrigger
        className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 py-3 px-4 w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CustomAccordionTrigger className="w-full" isOpen={isOpen}>
          <span className="flex-grow pr-4">{question}</span>
        </CustomAccordionTrigger>
      </AccordionTrigger>
      <AccordionContent className="text-gray-700 rounded-lg sm:rounded-xl mt-1 sm:mt-2 md:mt-3 bg-gray-100 leading-relaxed text-sm sm:text-base space-y-2 p-4 sm:p-6">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

const FAQComponent: React.FC<FAQComponentProps> = ({ t }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = t('faq.questions', { returnObjects: true }) as unknown as FAQItemProps[];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <CardHeader className="p-0 pb-4 sm:pb-6 text-center">
      
      </CardHeader>

      <CardContent className="p-0">
        <Accordion
          type="multiple"
          value={expandedSections}
          onValueChange={setExpandedSections}
          className="space-y-3 sm:space-y-4"
        >
          {filteredFAQs.map((faq, index) => (
            <FAQSection key={index} question={faq.question} answer={faq.answer} />
          ))}
        </Accordion>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-4 sm:py-6">
            <p className="text-gray-600 text-sm mb-2">
              {t('faq.noResults.message')}
            </p>
            <p className="text-gray-600 text-xs">
              {t('faq.noResults.subMessage')}
            </p>
          </div>
        )}
      </CardContent>

      <CardContent className="px-0 pt-4 sm:pt-6">
        <p className="text-gray-600 text-sm text-center">
          {t('faq.footer.text')}{" "}
          <Link
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-blue-600 hover:text-blue-700 transition-colors duration-300 underline inline-flex items-center gap-1"
          >
            {t('faq.footer.link')}
          </Link>
        </p>
      </CardContent>
    </div>
  );
};

export default FAQComponent;