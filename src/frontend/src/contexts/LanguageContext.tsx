import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { type TranslationKey, createTranslator } from "../i18n/translations";
import type { Language } from "../types";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isHindi: boolean;
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  isHindi: false,
});

const LANG_KEY = "ihs_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem(LANG_KEY);
    return stored === "hi" ? "hi" : "en";
  });

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    localStorage.setItem(LANG_KEY, next);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => createTranslator(lang)(key),
    [lang],
  );

  // Sync html lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t, isHindi: lang === "hi" }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
