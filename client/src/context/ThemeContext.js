import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return false;
  });

  const [useGradients, setUseGradients] = useState(() => {
    const settings = localStorage.getItem('siteSettings');
    if (settings) {
      const parsed = JSON.parse(settings);
      return parsed.useGradients !== false;
    }
    return true;
  });

  // Listen for settings changes
  useEffect(() => {
    const checkSettings = () => {
      const settings = localStorage.getItem('siteSettings');
      if (settings) {
        const parsed = JSON.parse(settings);
        setUseGradients(parsed.useGradients !== false);
      }
    };
    
    // Check on mount and set up interval
    checkSettings();
    const interval = setInterval(checkSettings, 500);
    
    // Listen for storage events from other tabs
    window.addEventListener('storage', checkSettings);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkSettings);
    };
  }, []);

  useEffect(() => {
    const root = document.body;
    if (isDark) {
      root.classList.remove('light');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const toggleGradients = () => {
    setUseGradients(prev => !prev);
  };

  // Helper function to get button/element classes based on gradient setting
  const getGradientClass = (gradientClass, solidClass) => {
    return useGradients ? gradientClass : solidClass;
  };

  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light',
    useGradients,
    toggleGradients,
    getGradientClass
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
