import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Palmtree, 
  FileCheck, 
  HeadphonesIcon, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/flights', label: t('nav.flights'), icon: Plane },
    { path: '/holidays', label: t('nav.holidays'), icon: Palmtree },
    { path: '/visas', label: t('nav.visas'), icon: FileCheck },
    { path: '/support', label: t('nav.support'), icon: HeadphonesIcon },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDark 
            ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-slate-700/50' 
            : 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg"
            >
              <Plane className="w-6 h-6 text-white transform -rotate-45" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold ${
                isScrolled || isDark ? 'text-primary-500' : 'text-white'
              } group-hover:text-primary-400 transition-colors`}>
                Explore Holidays
              </h1>
              <p className={`text-xs ${
                isScrolled 
                  ? isDark ? 'text-slate-400' : 'text-gray-500'
                  : 'text-white/70'
              }`}>
                {language === 'bn' ? 'আপনার ভ্রমণ সঙ্গী' : 'Your Travel Partner'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-primary-500 bg-primary-500/10'
                      : isScrolled || isDark
                        ? 'text-gray-700 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-500/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl transition-all duration-300 ${
                isScrolled || isDark
                  ? 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="Toggle Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'বাং' : 'EN'}</span>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 ${
                isScrolled || isDark
                  ? 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="Toggle Theme"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                isScrolled || isDark
                  ? 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300'
                  : 'bg-white/10 text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden overflow-hidden ${
              isDark ? 'bg-slate-900' : 'bg-white'
            } border-t ${isDark ? 'border-slate-700' : 'border-gray-100'}`}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive
                          ? 'bg-primary-500 text-white'
                          : isDark
                            ? 'text-gray-300 hover:bg-slate-800'
                            : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
