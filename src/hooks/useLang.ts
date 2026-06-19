import { useState, useCallback, createContext, useContext } from 'react';
import type { Lang } from '@/translations';

interface LangContextValue {
  lang: Lang;
  toggleLang: () => void;
}

export const LangContext = createContext<LangContextValue>({
  lang: 'en',
  toggleLang: () => {},
});

export function useLang() {
  return useContext(LangContext);
}

export function useLangState() {
  const [lang, setLang] = useState<Lang>('en');
  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  }, []);
  return { lang, toggleLang };
}
