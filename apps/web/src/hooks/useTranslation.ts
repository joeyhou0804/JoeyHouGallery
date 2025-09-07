"use client";

import { useAtomValue } from 'jotai';
import { languageAtom, translations, TranslationKey } from '@joey/atoms';

export function useTranslation() {
  const language = useAtomValue(languageAtom);
  
  const t = (key: TranslationKey | string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, language };
}