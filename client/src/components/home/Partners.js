import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Plane, Building2, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Partners = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  // Default partners with real logo URLs from Clearbit (free API)
  const defaultBanks = [
    { id: 1, name: 'BRAC Bank', logo: 'https://logo.clearbit.com/bracbank.com', initials: 'BB', gradient: 'from-blue-600 to-blue-800', active: true },
    { id: 2, name: 'Dutch Bangla', logo: 'https://logo.clearbit.com/dutchbanglabank.com', initials: 'DBBL', gradient: 'from-green-700 to-green-900', active: true },
    { id: 3, name: 'City Bank', logo: 'https://logo.clearbit.com/thecitybank.com', initials: 'CB', gradient: 'from-indigo-600 to-indigo-800', active: true },
    { id: 4, name: 'Eastern Bank', logo: 'https://logo.clearbit.com/ebl.com.bd', initials: 'EBL', gradient: 'from-orange-500 to-orange-700', active: true },
    { id: 5, name: 'bKash', logo: 'https://logo.clearbit.com/bkash.com', initials: 'bK', gradient: 'from-pink-500 to-pink-700', active: true },
    { id: 6, name: 'Nagad', logo: 'https://logo.clearbit.com/nagad.com.bd', initials: 'N', gradient: 'from-orange-400 to-red-500', active: true },
  ];

  const defaultAirlines = [
    { id: 1, name: 'Biman Bangladesh', logo: 'https://logo.clearbit.com/bfrmnl.biman-airlines.com', initials: 'BG', gradient: 'from-emerald-600 to-emerald-800', active: true },
    { id: 2, name: 'Emirates', logo: 'https://logo.clearbit.com/emirates.com', initials: 'EK', gradient: 'from-red-500 to-red-700', active: true },
    { id: 3, name: 'Singapore Airlines', logo: 'https://logo.clearbit.com/singaporeair.com', initials: 'SQ', gradient: 'from-blue-700 to-blue-900', active: true },
    { id: 4, name: 'Qatar Airways', logo: 'https://logo.clearbit.com/qatarairways.com', initials: 'QR', gradient: 'from-purple-800 to-purple-950', active: true },
    { id: 5, name: 'Thai Airways', logo: 'https://logo.clearbit.com/thaiairways.com', initials: 'TG', gradient: 'from-violet-600 to-violet-800', active: true },
    { id: 6, name: 'Malaysia Airlines', logo: 'https://logo.clearbit.com/malaysiaairlines.com', initials: 'MH', gradient: 'from-red-600 to-red-800', active: true },
  ];

  const [partners, setPartners] = useState({ banks: defaultBanks, airlines: defaultAirlines });

  useEffect(() => {
    const saved = localStorage.getItem('sitePartners');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to ensure gradients exist
      setPartners({
        banks: parsed.banks?.map((p, i) => ({ ...defaultBanks[i], ...p, gradient: defaultBanks[i]?.gradient || 'from-gray-600 to-gray-800', initials: p.name?.substring(0, 2).toUpperCase() })) || defaultBanks,
        airlines: parsed.airlines?.map((p, i) => ({ ...defaultAirlines[i], ...p, gradient: defaultAirlines[i]?.gradient || 'from-gray-600 to-gray-800', initials: p.name?.substring(0, 2).toUpperCase() })) || defaultAirlines
      });
    }
  }, []);

  const bankPartners = partners.banks.filter(p => p.active);
  const airlinePartners = partners.airlines.filter(p => p.active);

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
            {partner.logo ? (
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="w-10 h-10 object-contain"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                />
                <div className={`hidden w-full h-full rounded-xl bg-gradient-to-br ${partner.gradient || 'from-gray-600 to-gray-800'} items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{partner.initials}</span>
                </div>
              </div>
            ) : (
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.gradient || 'from-gray-600 to-gray-800'} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-sm">{partner.initials}</span>
              </div>
            )}
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
