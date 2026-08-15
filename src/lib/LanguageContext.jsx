import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { TRANSLATIONS, LANGUAGES, DEFAULT_LANG } from '@/lib/translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'b2g_lang';

function detectInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && TRANSLATIONS[saved]) return saved;
  } catch (e) { /* ignore */ }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang);

  const setLang = useCallback((code) => {
    if (!TRANSLATIONS[code]) return;
    setLangState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch (e) { /* ignore */ }
    document.documentElement.setAttribute('lang', code);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const value = {
    lang,
    setLang,
    t: TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG],
    languages: LANGUAGES,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback so a component rendered outside the provider doesn't crash
    return { lang: DEFAULT_LANG, setLang: () => {}, t: TRANSLATIONS[DEFAULT_LANG], languages: LANGUAGES };
  }
  return ctx;
}