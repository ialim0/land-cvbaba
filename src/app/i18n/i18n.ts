// src/i18n/i18n.ts
import i18next, { i18n as I18nInstance, InitOptions } from 'i18next';
import { initReactI18next, useTranslation as useTranslationAlias } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const fallbackLng = 'en';
export const supportedLanguages = ['en', 'fr', 'de', 'es', 'it'] as const;
export type LocaleTypes = (typeof supportedLanguages)[number];
export const defaultNamespace = 'home';

const isServer = typeof window === 'undefined';

const defaultOptions: InitOptions = {
  supportedLngs: supportedLanguages,
  fallbackLng,
  fallbackNS: defaultNamespace,
  defaultNS: defaultNamespace,
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
    lookupLocalStorage: 'preferredLanguage',
  },
  debug: process.env.NODE_ENV === 'development',
};

export const i18nInstance = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      import(`../../../public/locales/${language}/${namespace}.json`)
    )
  );

i18nInstance.init(defaultOptions);

export function useTranslation(ns: string = defaultNamespace) {
  const translation = useTranslationAlias(ns);
  return translation;
}

export function formatLanguage(lang: string): LocaleTypes {
  const shortLang = lang.split('-')[0];
  return supportedLanguages.includes(shortLang as LocaleTypes)
    ? (shortLang as LocaleTypes)
    : fallbackLng;
}

export { i18nInstance as i18n };