import React from 'react';
import { motion } from 'framer-motion';
import { Award, Plane, Building2, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Partners = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  // Partner data with icons/initials for premium display
  const bankPartners = [
    { name: 'BRAC Bank', initials: 'BB', color: '#00529b', gradient: 'from-blue-600 to-blue-800' },
    { name: 'Dutch Bangla', initials: 'DBBL', color: '#004d2b', gradient: 'from-green-700 to-green-900' },
    { name: 'City Bank', initials: 'CB', color: '#003366', gradient: 'from-indigo-600 to-indigo-800' },
    { name: 'Eastern Bank', initials: 'EBL', color: '#f47920', gradient: 'from-orange-500 to-orange-700' },
    { name: 'bKash', initials: 'bK', color: '#e2136e', gradient: 'from-pink-500 to-pink-700' },
    { name: 'Nagad', initials: 'N', color: '#ee7023', gradient: 'from-orange-400 to-red-500' },
  ];

  const airlinePartners = [
    { name: 'Biman Bangladesh', initials: 'BG', color: '#006747', gradient: 'from-emerald-600 to-emerald-800' },
    { name: 'Emirates', initials: 'EK', color: '#d71921', gradient: 'from-red-500 to-red-700' },
    { name: 'Singapore Airlines', initials: 'SQ', color: '#1a3b73', gradient: 'from-blue-700 to-blue-900' },
    { name: 'Qatar Airways', initials: 'QR', color: '#5c0931', gradient: 'from-purple-800 to-purple-950' },
    { name: 'Thai Airways', initials: 'TG', color: '#4b2d84', gradient: 'from-violet-600 to-violet-800' },
    { name: 'Malaysia Airlines', initials: 'MH', color: '#c5112e', gradient: 'from-red-600 to-red-800' },
  ];

  const PartnerSlider = ({ partners, direction = 'left' }) => (
    <div className="relative overflow-hidden py-4">
      {/* Gradient Fades */}
      <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r ${isDark ? 'from-slate-900' : 'from-gray-50'} to-transparent`} />
      <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l ${isDark ? 'from-slate-800' : 'from-white'} to-transparent`} />
      
      <motion.div
        className="flex space-x-6"
        animate={{
          x: direction === 'left' ? [0, -1200] : [-1200, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear"
          }
        }}
      >
        {[...partners, ...partners, ...partners].map((partner, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`flex-shrink-0 px-6 py-4 rounded-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50' 
                : 'bg-white hover:shadow-xl border border-gray-100'
            } shadow-lg min-w-[180px] flex items-center gap-3`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.gradient} flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold text-sm">{partner.initials}</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {partner.name}
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Partner
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className={`py-24 relative overflow-hidden ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ultra Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-500 text-sm font-semibold mb-6"
          >
            <Award className="w-4 h-4 mr-2" />
            {language === 'bn' ? 'বিশ্বস্ত অংশীদার' : 'Trusted Partners'}
            <Sparkles className="w-4 h-4 ml-2" />
          </motion.span>
          <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'আমাদের অংশীদার' : 'Our Partners'}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'bn' 
              ? 'বিশ্বের শীর্ষস্থানীয় ব্যাংক এবং এয়ারলাইন্সের সাথে আমাদের অংশীদারিত্ব'
              : 'Partnered with world-leading banks and airlines for your convenience'}
          </p>
        </motion.div>

        {/* Bank Partners */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Building2 className={`w-6 h-6 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {language === 'bn' ? 'ব্যাংক পার্টনার' : 'Banking Partners'}
            </h3>
          </div>
          <PartnerSlider partners={bankPartners} direction="left" />
        </div>

        {/* Airline Partners */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-8">
            <Plane className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {language === 'bn' ? 'এয়ারলাইন পার্টনার' : 'Airline Partners'}
            </h3>
          </div>
          <PartnerSlider partners={airlinePartners} direction="right" />
        </div>
      </div>
    </section>
  );
};

export default Partners;
