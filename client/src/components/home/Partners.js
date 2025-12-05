import React from 'react';
import { motion } from 'framer-motion';
import { Award, Plane, Building2, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Partners = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  // Using reliable CDN-hosted brand logos
  const bankPartners = [
    { name: 'BRAC Bank', logo: 'https://companieslogo.com/img/orig/BRAC.NS-d0daef8c.png?t=1660580539', color: '#00529b' },
    { name: 'Dutch Bangla Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Dutch-Bangla_Bank_logo.svg/1200px-Dutch-Bangla_Bank_logo.svg.png', color: '#004d2b' },
    { name: 'City Bank', logo: 'https://companieslogo.com/img/orig/CITYBANK.NS-f3e20a11.png?t=1709709844', color: '#003366' },
    { name: 'Eastern Bank', logo: 'https://companieslogo.com/img/orig/EBL.NS-f5c5c8ec.png?t=1720244492', color: '#f47920' },
    { name: 'bKash', logo: 'https://freepnglogo.com/images/all_img/bkash-icon.png', color: '#e2136e' },
    { name: 'Nagad', logo: 'https://freepnglogo.com/images/all_img/nagad-apps-logo.png', color: '#ee7023' },
  ];

  const airlinePartners = [
    { name: 'Biman', logo: 'https://companieslogo.com/img/orig/BIMAN.NS_BIG.D-a83eb9b0.png?t=1720244491', color: '#006747' },
    { name: 'Emirates', logo: 'https://companieslogo.com/img/orig/EMIRATES.NS_BIG-dd28eb03.png?t=1664877105', color: '#d71921' },
    { name: 'Singapore Air', logo: 'https://companieslogo.com/img/orig/C6L.SI-3f351bf4.png?t=1720244491', color: '#1a3b73' },
    { name: 'Qatar Airways', logo: 'https://companieslogo.com/img/orig/QGMD.NS_BIG-f45ff9d9.png?t=1720244493', color: '#5c0931' },
    { name: 'Thai Airways', logo: 'https://companieslogo.com/img/orig/THAI.BK_BIG-56e23987.png?t=1720244494', color: '#4b2d84' },
    { name: 'Malaysia Air', logo: 'https://companieslogo.com/img/orig/MH.NS_BIG-2fc8e29f.png?t=1720244492', color: '#c5112e' },
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
            className={`flex-shrink-0 px-8 py-5 rounded-2xl transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700/50' 
                : 'bg-white hover:shadow-xl border border-gray-100'
            } shadow-lg min-w-[160px] flex items-center justify-center`}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-10 w-auto max-w-[130px] object-contain transition-all duration-500"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div 
              className="hidden h-10 items-center justify-center px-4 py-2 rounded-lg font-bold text-white text-sm"
              style={{ backgroundColor: partner.color || '#6366f1' }}
            >
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
