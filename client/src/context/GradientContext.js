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
      getSectionClass: () => ''
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
    // Listen for changes - faster polling for instant response
    const checkGradient = () => {
      const settings = localStorage.getItem('siteSettings');
      if (settings) {
        const parsed = JSON.parse(settings);
        const newValue = parsed.useGradients !== false;
        setUseGradients(prev => prev !== newValue ? newValue : prev);
      }
    };

    // Check more frequently for instant updates
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

  // Premium button classes with animations
  const getButtonClass = useCallback((variant = 'primary') => {
    const baseClass = 'transform transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl';
    
    const variants = {
      primary: useGradients 
        ? `${baseClass} bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:shadow-blue-500/30`
        : `${baseClass} bg-blue-600 hover:bg-blue-700`,
      secondary: useGradients
        ? `${baseClass} bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:shadow-purple-500/30`
        : `${baseClass} bg-purple-600 hover:bg-purple-700`,
      accent: useGradients
        ? `${baseClass} bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:shadow-orange-500/30`
        : `${baseClass} bg-orange-600 hover:bg-orange-700`,
      success: useGradients
        ? `${baseClass} bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:shadow-green-500/30`
        : `${baseClass} bg-green-600 hover:bg-green-700`,
    };
    
    return variants[variant] || variants.primary;
  }, [useGradients]);

  // Premium card classes with animations
  const getCardClass = useCallback((isDark = false) => {
    const baseClass = 'transform transition-all duration-500 hover:-translate-y-2';
    
    if (useGradients) {
      return isDark
        ? `${baseClass} bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10`
        : `${baseClass} bg-white hover:shadow-2xl hover:shadow-blue-500/10 border border-gray-100 hover:border-blue-200`;
    }
    return isDark
      ? `${baseClass} bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 hover:shadow-xl`
      : `${baseClass} bg-white hover:shadow-xl border border-gray-200 hover:border-gray-300`;
  }, [useGradients]);

  // Premium section background classes
  const getSectionClass = useCallback((variant = 'primary') => {
    const variants = {
      primary: useGradients
        ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600'
        : 'bg-blue-600',
      secondary: useGradients
        ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600'
        : 'bg-purple-600',
      dark: useGradients
        ? 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900'
        : 'bg-slate-900',
    };
    
    return variants[variant] || variants.primary;
  }, [useGradients]);

  // Premium icon container classes
  const getIconClass = useCallback((gradient = 'from-cyan-500 to-blue-500') => {
    const baseClass = 'transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3';
    
    return useGradients
      ? `${baseClass} bg-gradient-to-br ${gradient} shadow-lg`
      : `${baseClass} bg-primary-500 shadow-md`;
  }, [useGradients]);

  return (
    <GradientContext.Provider value={{ 
      useGradients, 
      setUseGradients,
      gradientClass,
      getButtonClass,
      getCardClass,
      getSectionClass,
      getIconClass
    }}>
      {children}
    </GradientContext.Provider>
  );
};

export default GradientContext;
