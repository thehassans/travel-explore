import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, Plane, Star, Shield, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Partners = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const bankPartners = [
    { name: 'BRAC Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/BRAC_Bank_logo.svg/200px-BRAC_Bank_logo.svg.png', color: '#003366' },
    { name: 'Dutch Bangla Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Dutch-Bangla_Bank_logo.svg/200px-Dutch-Bangla_Bank_logo.svg.png', color: '#00A650' },
    { name: 'City Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/The_City_Bank_Limited_logo.svg/200px-The_City_Bank_Limited_logo.svg.png', color: '#003087' },
    { name: 'Eastern Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Eastern_Bank_Limited_logo.svg/200px-Eastern_Bank_Limited_logo.svg.png', color: '#0066B3' },
    { name: 'bKash', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/BKash_Logo.svg/200px-BKash_Logo.svg.png', color: '#E2136E' },
    { name: 'Nagad', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Nagad_Logo.svg/200px-Nagad_Logo.svg.png', color: '#FF6600' },
  ];

  const airlinePartners = [
    { name: 'Biman Bangladesh', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Biman_Bangladesh_Airlines_Logo.svg/200px-Biman_Bangladesh_Airlines_Logo.svg.png', color: '#006747' },
    { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png', color: '#D71921' },
    { name: 'Singapore Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/200px-Singapore_Airlines_Logo_2.svg.png', color: '#FDB813' },
    { name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/200px-Qatar_Airways_Logo.svg.png', color: '#5C0632' },
    { name: 'Thai Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Thai_Airways_logo.svg/200px-Thai_Airways_logo.svg.png', color: '#660099' },
    { name: 'Malaysia Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Malaysia_Airlines_Logo.svg/200px-Malaysia_Airlines_Logo.svg.png', color: '#D4161C' },
  ];

  // Card Component for each partner
  const PartnerCard = ({ partner, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
        isDark 
          ? 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-slate-600' 
          : 'bg-white hover:bg-gray-50 border border-gray-100 hover:border-gray-200'
      } shadow-lg hover:shadow-2xl`}
    >
      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at center, ${partner.color}, transparent)` }}
      />
      
      <div className="relative flex items-center justify-center h-16">
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-h-12 max-w-[120px] object-contain transition-all duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback */}
        <div 
          className="hidden items-center justify-center px-4 py-2 rounded-lg text-white font-bold text-sm"
          style={{ backgroundColor: partner.color }}
        >
          {partner.name}
        </div>
      </div>
      <p className={`text-center mt-3 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'} group-hover:text-primary-500 transition-colors`}>
        {partner.name}
      </p>
    </motion.div>
  );

  return (
    <section className={`py-24 relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-gradient-to-b from-white to-gray-50'}`}>
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      
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
            className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-6"
          >
            <Shield className="w-4 h-4 mr-2" />
            {language === 'bn' ? 'বিশ্বস্ত অংশীদার' : 'Trusted Partners'}
            <Star className="w-4 h-4 ml-2 fill-current" />
          </motion.span>
          <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'আমাদের অংশীদার' : 'Our Partners'}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'bn' 
              ? 'বিশ্বের সেরা ব্যাংক এবং এয়ারলাইন্সের সাথে আমাদের অংশীদারিত্ব'
              : 'Partnered with world-class banks and airlines for your convenience'}
          </p>
        </motion.div>

        {/* Bank Partners */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'bn' ? 'ব্যাংক অংশীদার' : 'Bank Partners'}
            </h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bankPartners.map((partner, index) => (
              <PartnerCard key={partner.name} partner={partner} index={index} />
            ))}
          </div>
        </div>

        {/* Airline Partners */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'bn' ? 'এয়ারলাইন অংশীদার' : 'Airline Partners'}
            </h3>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {airlinePartners.map((partner, index) => (
              <PartnerCard key={partner.name} partner={partner} index={index} />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: Shield, text: language === 'bn' ? '১০০% নিরাপদ' : '100% Secure', color: 'from-green-500 to-emerald-500' },
            { icon: Star, text: language === 'bn' ? '৫ স্টার রেটেড' : '5-Star Rated', color: 'from-amber-500 to-orange-500' },
            { icon: Sparkles, text: language === 'bn' ? 'প্রিমিয়াম সার্ভিস' : 'Premium Service', color: 'from-purple-500 to-pink-500' },
          ].map((badge, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${
                isDark ? 'bg-slate-800/80' : 'bg-white'
              } shadow-lg border ${isDark ? 'border-slate-700' : 'border-gray-100'}`}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center`}>
                <badge.icon className="w-4 h-4 text-white" />
              </div>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
