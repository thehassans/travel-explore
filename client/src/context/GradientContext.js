import React, { createContext, useContext, useState, useEffect } from 'react';

const GradientContext = createContext();

export const useGradient = () => {
  const context = useContext(GradientContext);
  if (!context) {
    return { useGradients: true, gradientClass: (gradient, solid) => gradient };
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
    // Listen for changes
    const checkGradient = () => {
      const settings = localStorage.getItem('siteSettings');
      if (settings) {
        const parsed = JSON.parse(settings);
        setUseGradients(parsed.useGradients !== false);
      }
    };

    // Check periodically for updates from admin
    const interval = setInterval(checkGradient, 500);
    window.addEventListener('storage', checkGradient);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkGradient);
    };
  }, []);

  // Helper function to return appropriate class
  const gradientClass = (gradientClasses, solidClasses) => {
    return useGradients ? gradientClasses : solidClasses;
  };

  // Helper for background styles
  const bgStyle = (gradientStyle, solidColor) => {
    return useGradients ? gradientStyle : { backgroundColor: solidColor };
  };

  return (
    <GradientContext.Provider value={{ 
      useGradients, 
      setUseGradients,
      gradientClass,
      bgStyle
    }}>
      {children}
    </GradientContext.Provider>
  );
};

export default GradientContext;
