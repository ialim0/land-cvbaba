'use client';

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "./components/ui/Tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useTranslation } from "./i18n/i18n";

const inter = Inter({ subsets: ["latin"] });

function MetadataWrapper() {
  const { t } = useTranslation('home');
  
 
  return (
    <>
      <title>{t('meta.title', 'CVBABA: Effortless CVs and Cover Letters for Worldwide Jobs')}</title>
      <meta 
        name="description" 
        content={t('meta.description', 'Get job-ready in minutes with CVBABA! Our AI-powered platform helps you create professional CVs and cover letters tailored for global opportunities. Fast, easy, and designed to help you succeed.')} 
      />
      <meta property="og:title" content={t('meta.og.title', 'CVBABA: Effortless CVs and Cover Letters for Worldwide Jobs')} />
      <meta 
        property="og:description" 
        content={t('meta.og.description', 'Get job-ready in minutes with CVBABA! Our AI-powered platform helps you create professional CVs and cover letters tailored for global opportunities. Fast, easy, and designed to help you succeed.')}
      />
      <meta property="og:image" content="/images/babaai.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={t('meta.og.imageAlt', 'CVBABA Open Graph Image')} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={t('meta.twitter.title', 'CVBABA: Effortless CVs and Cover Letters for Worldwide Jobs')} />
      <meta 
        name="twitter:description" 
        content={t('meta.twitter.description', 'Get job-ready in minutes with CVBABA! Our AI-powered platform helps you create professional CVs and cover letters tailored for global opportunities. Fast, easy, and designed to help you succeed.')}
      />
      <meta name="twitter:image" content="/images/babaai.png" />
      <link rel="icon" href="/images/babaai.png" />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslation('metadata');
  
  return (
    <html lang={t('meta.language', 'en')}>
      <head>
        <MetadataWrapper />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}