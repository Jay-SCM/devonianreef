import React, { createContext, useContext, useEffect, useState } from 'react';

interface TranslationContextType {
  t: (key: string) => string;
  changeLocale: (locale: string) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string>('gooniyandi');
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/api/translations?locale=${locale}`);
        if (!response.ok) {
          throw new Error('Failed to fetch translations');
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };

    fetchTranslations();
  }, [locale]);

  const t = (key: string) => translations[key] || key;

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
  };

  return (
    <TranslationContext.Provider value={{ t, changeLocale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

