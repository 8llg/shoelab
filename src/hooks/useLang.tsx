import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L } from '../data/catalog';
import { readStore, writeStore } from './storage';

export type Lang = 'en' | 'ar';

type LangValue = {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (text: L) => string;
  num: (n: number) => string;
  sar: (n: number) => string;
};

const LangContext = createContext<LangValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readStore<Lang>('shoelab-lang', 'en'));
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    writeStore('shoelab-lang', lang);
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'ar' : 'en')), []);
  const t = useCallback((text: L) => text[lang], [lang]);
  const num = useCallback((n: number) => Math.round(n).toLocaleString('en-US'), []);
  const sar = useCallback((n: number) => (lang === 'ar' ? `${Math.round(n).toLocaleString('en-US')} ر.س` : `SAR ${Math.round(n).toLocaleString('en-US')}`), [lang]);

  const value = useMemo(() => ({ lang, dir, setLang, toggle, t, num, sar }) as LangValue, [lang, dir, setLang, toggle, t, num, sar]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
