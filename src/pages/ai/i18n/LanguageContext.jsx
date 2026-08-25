import React, { createContext, useContext, useState } from "react";
import { translations } from "./translations";
import { extra } from "./sections-extra";

const LanguageContext = createContext(null);
const STORAGE_KEY = "b2g-ai-lang";

export const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "de", label: "DE", name: "Deutsch" },
  { code: "es", label: "ES", name: "Español" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "sv", label: "SV", name: "Svenska" },
  { code: "ru", label: "RU", name: "Русский" },
];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(STORAGE_KEY) || "en";
    }
    return "en";
  });

  const setLang = (l) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx || { lang: "en", setLang: () => {} };
}

export function useT() {
  const { lang } = useLanguage();
  const base = translations[lang] || translations.en;
  const ext = extra[lang] || extra.en;
  return { ...base, ...ext };
}