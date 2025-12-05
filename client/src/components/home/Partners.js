import React from 'react';
import { motion } from 'framer-motion';
import { Award, Plane, Building2, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Partners = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const bankPartners = [
    { name: 'BRAC Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/69/BRAC_Bank_logo.svg/200px-BRAC_Bank_logo.svg.png' },
    { name: 'Dutch Bangla Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Dutch-Bangla_Bank_logo.svg/200px-Dutch-Bangla_Bank_logo.svg.png' },
    { name: 'City Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/67/City_Bank_Logo.svg/200px-City_Bank_Logo.svg.png' },
    { name: 'Eastern Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Eastern_Bank_Limited_logo.svg/200px-Eastern_Bank_Limited_logo.svg.png' },
    { name: 'bKash', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Bkash_Logo.svg/200px-Bkash_Logo.svg.png' },
    { name: 'Nagad', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Nagad_logo.svg/200px-Nagad_logo.svg.png' },
  ];

  const airlinePartners = [
    { name: 'Biman Bangladesh', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Biman_Bangladesh_Airlines_Logo.svg/200px-Biman_Bangladesh_Airlines_Logo.svg.png' },
    { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png' },
    { name: 'Singapore Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/200px-Singapore_Airlines_Logo_2.svg.png' },
    { name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png' },
    { name: 'Thai Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Thai_Airways_logo.svg/200px-Thai_Airways_logo.svg.png' },
    { name: 'Malaysia Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Malaysia_Airlines_Logo.svg/200px-Malaysia_Airlines_Logo.svg.png' },
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
            className={`flex-shrink-0 px-10 py-6 rounded-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50' 
                : 'bg-white hover:shadow-xl border border-gray-100'
            } shadow-lg`}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 w-auto max-w-[140px] object-contain transition-all duration-500 hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden h-12 w-[140px] items-center justify-center text-sm font-semibold text-gray-500">
              {partner.name}
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
