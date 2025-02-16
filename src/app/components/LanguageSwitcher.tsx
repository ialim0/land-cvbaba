'use client';

import React from 'react';
import { i18n, supportedLanguages } from '../i18n/i18n';

const LanguageSwitcher: React.FC = () => {
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <select
      id="language-select"
      onChange={(e) => changeLanguage(e.target.value)}
      defaultValue={i18n.language}
    >
      {supportedLanguages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
