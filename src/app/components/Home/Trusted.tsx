'use client';

import { Briefcase, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/Badge';

interface Company {
  name: string;
  logo: string;
}

interface Tip {
  category: string;
  tip: string;
  impact?: string;
}

interface TipsTranslations {
  [key: string]: {
    category: string;
    tip: string;
    impact?: string;
  };
}

const COMPANIES: Company[] = [
  { "name": "Google", "logo": "/svgs/google.svg" },
  { "name": "Goldman Sachs", "logo": "/svgs/goldman-sachs.svg" },
  { "name": "Nike", "logo": "/svgs/nike.svg" },
  { "name": "Netflix", "logo": "/svgs/netflix.svg" },
  { "name": "Deloitte", "logo": "/svgs/deloitte.svg" },
  { "name": "Tesla", "logo": "/svgs/tesla.svg" },
  { "name": "Apple", "logo": "/svgs/apple.svg" },
  { "name": "Microsoft", "logo": "/svgs/microsoft.svg" }

];

interface TrustedProps {
  t: (key: string, options?: { [key: string]: string | boolean }) => string;
}

const Trusted: React.FC<TrustedProps> = ({ t }) => {
  const tipsTranslations = t('trusted.tips', { returnObjects: true }) as unknown as TipsTranslations;
  const RESUME_TIPS: Tip[] = Object.values(tipsTranslations);

  const TipCard = ({ tip }: { tip: Tip }) => (
    <div className="group flex-shrink-0 w-[260px] sm:w-[280px] md:w-96 bg-white rounded-2xl shadow-lg border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl flex flex-col">
      <div className="bg-blue-50 p-4 border-b border-blue-100">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Briefcase className="w-5 h-5 shrink-0 text-gray-800" />
            <span className="text-sm font-semibold text-gray-800 truncate">{tip.category}</span>
          </div>
          {tip.impact && (
            <Badge className="shrink-0 bg-blue-50 text-gray-500 border border-blue-200 px-2 text-xs">
              {tip.impact}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 justify-between gap-4 p-4">
        <p className="text-sm text-gray-700 line-clamp-4 md:line-clamp-6">
          {tip.tip}
        </p>

        <a
          href="https://chat.cvbaba.com"
          rel="noopener noreferrer"
          className="block mt-auto"
        >
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-xl font-medium text-white bg-[#1757FF] hover:bg-blue-700 transition-all duration-300 text-sm">
            {t('trusted.tryTipButton')}
            <ChevronRight className="w-4 h-4" />
          </button>
        </a>

      </div>
    </div>
  );

  const CompanyLogo = ({ company }: { company: Company }) => (
    <div className="flex flex-col items-center gap-1 sm:gap-2">
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
      />
    </div>
  );

  return (
    <section className="w-full py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center mb-8 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 mb-4">
          {t('trusted.title')}
        </h2>
        <p className="text-base md:text-lg text-gray-600 ">{t('trusted.description')}</p>
      </div>

      <div className="mb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 justify-items-center">
          {COMPANIES.map((company, index) => (
            <CompanyLogo key={`company-${index}`} company={company} />
          ))}
        </div>
      </div>

      <div className="relative w-full pb-8 overflow-hidden">
        <div className="flex animate-scroll gap-3 sm:gap-4">
          <div className="flex gap-3 sm:gap-4">
            {RESUME_TIPS.map((tip, index) => (
              <TipCard key={`tip-${index}`} tip={tip} />
            ))}
          </div>
          <div className="flex gap-3 sm:gap-4">
            {RESUME_TIPS.map((tip, index) => (
              <TipCard key={`tip-dup-${index}`} tip={tip} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          display: flex;
          animation: scroll 30s linear infinite;
          width: max-content;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Trusted;