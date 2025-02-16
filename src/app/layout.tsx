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
  
  const conversationalDesc = "One conversation can change everything. Transform your career path through meaningful dialogue - we'll help you discover opportunities you never knew existed. No more generic applications; let's have the career conversation you've been waiting for.";
  
  return (
    <>
      <title>
        {t('meta.title', 'CVBABA: Transform Your Career Through Conversation')}
      </title>
      <meta
        name="description"
        content={t('meta.description', conversationalDesc)}
      />
      <meta 
        property="og:title" 
        content={t('meta.og.title', 'One Conversation Can Change Your Career | CVBABA')}
      />
      <meta
        property="og:description"
        content={t('meta.og.description', 'Stop job hunting. Start career designing. Let\'s have the conversation that transforms your professional future. AI-powered guidance for your next career move.')}
      />
      <meta property="og:image" content="/images/babaai.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta 
        property="og:image:alt" 
        content={t('meta.og.imageAlt', 'Transform Your Career Through Meaningful Conversation')}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta 
        name="twitter:title" 
        content={t('meta.twitter.title', 'Turn Career Dreams Into Reality Through Conversation | CVBABA')}
      />
      <meta
        name="twitter:description"
        content={t('meta.twitter.description', 'Ready for a career transformation? One conversation could change everything. Let\'s discuss your future, powered by AI-driven insights and real human understanding.')}
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