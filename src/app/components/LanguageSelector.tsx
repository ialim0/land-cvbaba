import React, { useState, useMemo, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { LocaleTypes } from '@/app/i18n/i18n';

interface Language {
  code: LocaleTypes;
  name: string;
}

const FLAG_BASE_URL = 'https://flagcdn.com/w20/';

const languageToCountryCode: Record<LocaleTypes, string> = {
  en: 'us',
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
};

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
];

interface LanguageSelectorProps {
  mode?: 'client' | 'server';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ mode: forcedMode }) => {
  const { language, setLanguage, isLoading, isSyncing, mode: contextMode } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentMode = forcedMode || contextMode;

  const selectedLanguage = useMemo(
    () => languages.find((lang) => lang.code === language) || languages[0],
    [language]
  );

  const handleLanguageChange = useCallback(
    async (code: LocaleTypes) => {
      if (code === language || isSyncing) return;

      try {
        await setLanguage(code, currentMode);
        setIsOpen(false);
      } catch (error) {
        console.error('Failed to change language:', error);
      }
    },
    [language, setLanguage, currentMode, isSyncing]
  );

  const renderLanguageOptions = useMemo(
    () =>
      languages.map(({ code, name }) => (
        <li
          key={code}
          className={`flex items-center p-2 cursor-pointer transition-colors duration-200
            ${isSyncing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white'}
            ${language === code ? 'bg-blue-600 text-white' : 'text-gray-700'}
            ${isSyncing && code === language ? 'animate-pulse' : ''}`}
          onClick={() => !isSyncing && handleLanguageChange(code)}
          role="option"
          aria-selected={language === code}
          aria-disabled={isSyncing}
        >
          <img
            src={`${FLAG_BASE_URL}${languageToCountryCode[code]}.png`}
            alt={`${name} flag`}
            className="w-5 h-5"
          />
          <span className="ml-2 text-sm md:text-base">{name}</span>
          {currentMode === 'server' && language === code && (
            <span className="ml-auto text-xs opacity-50">Synced</span>
          )}
        </li>
      )),
    [handleLanguageChange, language, isSyncing, currentMode]
  );

  if (isLoading) {
    return (
      <div className="w-12 h-10 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        className={`flex items-center rounded-md p-2 focus:outline-none focus:ring-2 
          focus:ring-blue-500 w-12 justify-center transition-colors duration-200
          ${isSyncing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:text-white'}`}
        onClick={() => !isSyncing && setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={isSyncing}
      >
        <img
          src={`${FLAG_BASE_URL}${languageToCountryCode[selectedLanguage.code]}.png`}
          alt={`${selectedLanguage.name} flag`}
          className={`w-5 h-5 ${isSyncing ? 'opacity-50' : ''}`}
        />
        <span className="ml-1">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {isOpen && (
        <ul
          className="absolute z-10 mt-2 bg-white border border-gray-200 
            rounded-md shadow-lg max-h-60 overflow-y-auto w-40 md:w-48"
          role="listbox"
        >
          {renderLanguageOptions}
        </ul>
      )}
    </div>
  );
};

export default React.memo(LanguageSelector);