import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Plane,
  ArrowRightLeft,
  ChevronDown,
  Minus,
  Plus
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const HeroBanner = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { language } = useLanguage();
  
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [showPassengers, setShowPassengers] = useState(false);
  const [passengers, setPassengers] = useState({ adults: 1, children: 0 });

  const popularOrigins = [
    { code: 'DAC', name: 'Dhaka', name_bn: 'ঢাকা' },
    { code: 'CGP', name: 'Chittagong', name_bn: 'চট্টগ্রাম' },
    { code: 'SPD', name: 'Sylhet', name_bn: 'সিলেট' },
  ];

  const popularDestinations = [
    { code: 'DXB', name: 'Dubai', name_bn: 'দুবাই' },
    { code: 'SIN', name: 'Singapore', name_bn: 'সিঙ্গাপুর' },
    { code: 'BKK', name: 'Bangkok', name_bn: 'ব্যাংকক' },
    { code: 'KUL', name: 'Kuala Lumpur', name_bn: 'কুয়ালালামপুর' },
    { code: 'MLE', name: 'Maldives', name_bn: 'মালদ্বীপ' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ origin, destination, departDate, returnDate, passengers });
    // Navigate to search results
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const updatePassengers = (type, action) => {
    setPassengers(prev => ({
      ...prev,
      [type]: action === 'add' 
        ? prev[type] + 1 
        : Math.max(type === 'adults' ? 1 : 0, prev[type] - 1)
    }));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 to-accent-900/30" />
      </div>

      {/* Animated Background Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 left-10 w-20 h-20 opacity-20"
      >
        <Plane className="w-full h-full text-white" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute top-1/3 right-20 w-16 h-16 opacity-20"
      >
        <Plane className="w-full h-full text-white transform -rotate-45" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {t('banner.title')}
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t('banner.subtitle')}
          </motion.p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <form 
            onSubmit={handleSearch}
            className={`${
              isDark ? 'bg-slate-900/90' : 'bg-white/95'
            } backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl border ${
              isDark ? 'border-slate-700/50' : 'border-white/50'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
              {/* Origin */}
              <div className="lg:col-span-3 relative">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <MapPin className="w-4 h-4 inline mr-1 text-primary-500" />
                  {t('banner.origin')}
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-primary-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                  } focus:outline-none transition-colors appearance-none cursor-pointer`}
                >
                  <option value="">{t('banner.selectOrigin')}</option>
                  {popularOrigins.map(loc => (
                    <option key={loc.code} value={loc.code}>
                      {language === 'bn' ? loc.name_bn : loc.name} ({loc.code})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-11 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Swap Button */}
              <div className="lg:col-span-1 flex items-end justify-center pb-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={swapLocations}
                  className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Destination */}
              <div className="lg:col-span-3 relative">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <MapPin className="w-4 h-4 inline mr-1 text-secondary-500" />
                  {t('banner.destination')}
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-primary-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                  } focus:outline-none transition-colors appearance-none cursor-pointer`}
                >
                  <option value="">{t('banner.selectDestination')}</option>
                  {popularDestinations.map(loc => (
                    <option key={loc.code} value={loc.code}>
                      {language === 'bn' ? loc.name_bn : loc.name} ({loc.code})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-11 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Depart Date */}
              <div className="lg:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Calendar className="w-4 h-4 inline mr-1 text-primary-500" />
                  {t('banner.departDate')}
                </label>
                <DatePicker
                  selected={departDate}
                  onChange={setDepartDate}
                  minDate={new Date()}
                  placeholderText={t('banner.selectDate')}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-primary-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                  } focus:outline-none transition-colors`}
                  dateFormat="dd MMM yyyy"
                />
              </div>

              {/* Return Date */}
              <div className="lg:col-span-2">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Calendar className="w-4 h-4 inline mr-1 text-secondary-500" />
                  {t('banner.returnDate')}
                </label>
                <DatePicker
                  selected={returnDate}
                  onChange={setReturnDate}
                  minDate={departDate || new Date()}
                  placeholderText={t('banner.selectDate')}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-primary-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                  } focus:outline-none transition-colors`}
                  dateFormat="dd MMM yyyy"
                />
              </div>

              {/* Passengers */}
              <div className="lg:col-span-1 relative">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Users className="w-4 h-4 inline mr-1 text-primary-500" />
                  {t('banner.passengers')}
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassengers(!showPassengers)}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-primary-500' 
                      : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                  } focus:outline-none transition-colors text-left flex items-center justify-between`}
                >
                  <span>{passengers.adults + passengers.children}</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {/* Passengers Dropdown */}
                {showPassengers && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute top-full left-0 right-0 mt-2 p-4 rounded-xl shadow-xl z-50 ${
                      isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    {/* Adults */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {t('banner.adults')}
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updatePassengers('adults', 'subtract')}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{passengers.adults}</span>
                        <button
                          type="button"
                          onClick={() => updatePassengers('adults', 'add')}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {t('banner.children')}
                      </span>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => updatePassengers('children', 'subtract')}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{passengers.children}</span>
                        <button
                          type="button"
                          onClick={() => updatePassengers('children', 'add')}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span className="text-lg">{t('banner.search')}</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '50K+', label: 'Happy Travelers', label_bn: 'সুখী ভ্রমণকারী' },
            { number: '100+', label: 'Destinations', label_bn: 'গন্তব্য' },
            { number: '24/7', label: 'Support', label_bn: 'সহায়তা' },
            { number: '99%', label: 'Satisfaction', label_bn: 'সন্তুষ্টি' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-white/70 text-sm">
                {language === 'bn' ? stat.label_bn : stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
