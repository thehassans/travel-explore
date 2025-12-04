import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    
    // Update document direction and font for Bangla
    if (language === 'bn') {
      document.documentElement.classList.add('font-bangla');
    } else {
      document.documentElement.classList.remove('font-bangla');
    }
  }, [language, i18n]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'bn' : 'en');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Currency formatting for Bangladesh
  const formatCurrency = (amount, currency = 'BDT') => {
    if (currency === 'BDT') {
      return new Intl.NumberFormat(language === 'bn' ? 'bn-BD' : 'en-BD', {
        style: 'currency',
        currency: 'BDT',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Format number for Bangladesh
  const formatNumber = (num) => {
    return new Intl.NumberFormat(language === 'bn' ? 'bn-BD' : 'en-BD').format(num);
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    toggleLanguage,
    isEnglish: language === 'en',
    isBangla: language === 'bn',
    formatCurrency,
    formatNumber
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
