import React, { createContext, useContext, useState, useEffect } from 'react';

const SiteSettingsContext = createContext();

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};

const defaultSettings = {
  // General
  siteTitle: 'Explore Holidays',
  tagline: 'Your Premium Travel Partner',
  logo: null,
  favicon: null,
  
  // Contact Info
  phone: '+880 1234-567890',
  email: 'info@exploreholidays.com',
  address: 'House 42, Road 11, Banani, Dhaka 1213',
  
  // Social Links
  facebook: 'https://facebook.com/exploreholidays',
  twitter: 'https://twitter.com/exploreholidays',
  instagram: 'https://instagram.com/exploreholidays',
  youtube: 'https://youtube.com/exploreholidays',
  
  // Theme Colors
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  accentColor: '#06b6d4',
  
  // Footer
  footerText: 'Experience the world with Bangladesh\'s most trusted travel agency.',
  copyrightText: '© 2024 Explore Holidays. All rights reserved.',
  
  // Partners
  partners: {
    banks: [
      { name: 'BRAC Bank', logo: '/logos/partners/brac-bank.png', active: true },
      { name: 'Dutch Bangla Bank', logo: '/logos/partners/dbbl.png', active: true },
      { name: 'City Bank', logo: '/logos/partners/city-bank.png', active: true },
      { name: 'Eastern Bank', logo: '/logos/partners/ebl.png', active: true },
      { name: 'bKash', logo: '/logos/partners/bkash.png', active: true },
      { name: 'Nagad', logo: '/logos/partners/nagad.png', active: true },
    ],
    airlines: [
      { name: 'Biman Bangladesh', logo: '/logos/partners/biman.png', active: true },
      { name: 'Emirates', logo: '/logos/partners/emirates.png', active: true },
      { name: 'Singapore Airlines', logo: '/logos/partners/singapore.png', active: true },
      { name: 'Qatar Airways', logo: '/logos/partners/qatar.png', active: true },
      { name: 'Thai Airways', logo: '/logos/partners/thai.png', active: true },
      { name: 'Malaysia Airlines', logo: '/logos/partners/malaysia.png', active: true },
    ]
  }
};

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('siteSettings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    
    // Update favicon dynamically
    if (settings.favicon) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = settings.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    
    // Update document title
    document.title = settings.siteTitle + ' | Premium Travel Booking';
    
    // Update CSS variables for theme
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updatePartners = (type, partners) => {
    setSettings(prev => ({
      ...prev,
      partners: {
        ...prev.partners,
        [type]: partners
      }
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('siteSettings');
  };

  return (
    <SiteSettingsContext.Provider value={{ 
      settings, 
      updateSettings, 
      updatePartners,
      resetSettings,
      defaultSettings 
    }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export default SiteSettingsContext;
