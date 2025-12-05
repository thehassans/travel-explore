import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GradientContext = createContext();

export const useGradient = () => {
  const context = useContext(GradientContext);
  if (!context) {
    return { 
      useGradients: true, 
      gradientClass: (gradient, solid) => gradient,
      getButtonClass: () => '',
      getCardClass: () => '',
      getSectionClass: () => '',
      premium: {}
    };
  }
  return context;
};

export const GradientProvider = ({ children }) => {
  const [useGradients, setUseGradients] = useState(() => {
    const settings = localStorage.getItem('siteSettings');
    if (settings) {
      const parsed = JSON.parse(settings);
      return parsed.useGradients !== false;
    }
    return true;
  });

  useEffect(() => {
    const checkGradient = () => {
      const settings = localStorage.getItem('siteSettings');
      if (settings) {
        const parsed = JSON.parse(settings);
        const newValue = parsed.useGradients !== false;
        setUseGradients(prev => prev !== newValue ? newValue : prev);
      }
    };

    const interval = setInterval(checkGradient, 100);
    window.addEventListener('storage', checkGradient);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkGradient);
    };
  }, []);

  // Helper function to return appropriate class
  const gradientClass = useCallback((gradientClasses, solidClasses) => {
    return useGradients ? gradientClasses : solidClasses;
  }, [useGradients]);

  // ULTRA PREMIUM PROFESSIONAL THEME (when gradients off)
  // Monochromatic, clean, minimal with subtle elegance
  const premium = {
    // Primary button - sleek black/dark
    button: {
      primary: useGradients 
        ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:shadow-primary-500/25'
        : 'bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg border border-slate-700',
      secondary: useGradients
        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
        : 'bg-white text-slate-900 shadow-sm hover:shadow-md border-2 border-slate-900 hover:bg-slate-50',
      outline: useGradients
        ? 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white'
        : 'border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white',
      accent: useGradients
        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
        : 'bg-slate-800 text-white hover:bg-slate-700',
    },
    // Card styles - clean, minimal shadows
    card: {
      base: useGradients
        ? 'bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-200'
        : 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300',
      dark: useGradients
        ? 'bg-slate-800 border border-slate-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/10'
        : 'bg-slate-900 border border-slate-800 shadow-sm hover:shadow-md hover:border-slate-700',
      featured: useGradients
        ? 'bg-gradient-to-br from-primary-50 to-purple-50 border-2 border-primary-200'
        : 'bg-slate-50 border-2 border-slate-900',
    },
    // Section backgrounds
    section: {
      hero: useGradients
        ? 'bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600'
        : 'bg-slate-900',
      light: useGradients
        ? 'bg-gradient-to-br from-primary-50 via-white to-purple-50'
        : 'bg-slate-50',
      dark: useGradients
        ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900'
        : 'bg-slate-950',
    },
    // Text styles
    text: {
      heading: useGradients
        ? 'bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent'
        : 'text-slate-900',
      accent: useGradients
        ? 'text-primary-500'
        : 'text-slate-700',
      muted: useGradients
        ? 'text-gray-500'
        : 'text-slate-500',
    },
    // Badge/tag styles
    badge: {
      primary: useGradients
        ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white'
        : 'bg-slate-900 text-white',
      secondary: useGradients
        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
        : 'bg-slate-700 text-white',
      outline: useGradients
        ? 'border-2 border-primary-500 text-primary-500'
        : 'border-2 border-slate-900 text-slate-900',
    },
    // Icon containers
    icon: {
      primary: useGradients
        ? 'bg-gradient-to-br from-primary-500 to-purple-500 text-white shadow-lg'
        : 'bg-slate-900 text-white shadow-md',
      light: useGradients
        ? 'bg-gradient-to-br from-primary-100 to-purple-100 text-primary-600'
        : 'bg-slate-100 text-slate-700',
    },
    // Input styles
    input: {
      base: useGradients
        ? 'border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
        : 'border-2 border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10',
    },
    // Dividers
    divider: useGradients
      ? 'border-gray-200'
      : 'border-slate-200',
    // Navbar
    navbar: {
      bg: useGradients
        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100'
        : 'bg-white border-b-2 border-slate-100',
      bgDark: useGradients
        ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-800'
        : 'bg-slate-950 border-b-2 border-slate-800',
    },
  };

  // Legacy support
  const getButtonClass = useCallback((variant = 'primary') => {
    return premium.button[variant] || premium.button.primary;
  }, [useGradients]);

  const getCardClass = useCallback((isDark = false) => {
    return isDark ? premium.card.dark : premium.card.base;
  }, [useGradients]);

  const getSectionClass = useCallback((variant = 'hero') => {
    return premium.section[variant] || premium.section.hero;
  }, [useGradients]);

  const getIconClass = useCallback(() => {
    return premium.icon.primary;
  }, [useGradients]);

  return (
    <GradientContext.Provider value={{ 
      useGradients, 
      setUseGradients,
      gradientClass,
      getButtonClass,
      getCardClass,
      getSectionClass,
      getIconClass,
      premium
    }}>
      {children}
    </GradientContext.Provider>
  );
};

export default GradientContext;
