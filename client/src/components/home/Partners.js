import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Partners = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const bankPartners = [
    { name: 'BRAC Bank', logo: 'https://via.placeholder.com/150x60/0ea5e9/ffffff?text=BRAC+Bank' },
    { name: 'Dutch Bangla Bank', logo: 'https://via.placeholder.com/150x60/22c55e/ffffff?text=DBBL' },
    { name: 'City Bank', logo: 'https://via.placeholder.com/150x60/8b5cf6/ffffff?text=City+Bank' },
    { name: 'Eastern Bank', logo: 'https://via.placeholder.com/150x60/f97316/ffffff?text=EBL' },
    { name: 'BRAC Bank', logo: 'https://via.placeholder.com/150x60/ec4899/ffffff?text=bKash' },
    { name: 'Nagad', logo: 'https://via.placeholder.com/150x60/ef4444/ffffff?text=Nagad' },
  ];

  const airlinePartners = [
    { name: 'Biman Bangladesh', logo: 'https://via.placeholder.com/150x60/16a34a/ffffff?text=Biman' },
    { name: 'Emirates', logo: 'https://via.placeholder.com/150x60/b91c1c/ffffff?text=Emirates' },
    { name: 'Singapore Airlines', logo: 'https://via.placeholder.com/150x60/0369a1/ffffff?text=SQ' },
    { name: 'Qatar Airways', logo: 'https://via.placeholder.com/150x60/7c2d12/ffffff?text=Qatar' },
    { name: 'Thai Airways', logo: 'https://via.placeholder.com/150x60/7c3aed/ffffff?text=Thai' },
    { name: 'Malaysia Airlines', logo: 'https://via.placeholder.com/150x60/0284c7/ffffff?text=MAS' },
  ];

  const PartnerSlider = ({ partners, direction = 'left' }) => (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex space-x-8"
        animate={{
          x: direction === 'left' ? [0, -1000] : [-1000, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }
        }}
      >
        {[...partners, ...partners].map((partner, index) => (
          <div
            key={index}
            className={`flex-shrink-0 px-8 py-6 rounded-xl transition-all duration-300 ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700' 
                : 'bg-white hover:bg-gray-50'
            } shadow-sm hover:shadow-md`}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-500 text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Trusted
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('section.partners')}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('section.partnersDesc')}
          </p>
        </motion.div>

        {/* Bank Partners */}
        <div className="mb-12">
          <h3 className={`text-xl font-semibold mb-6 text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('section.bankPartners')}
          </h3>
          <PartnerSlider partners={bankPartners} direction="left" />
        </div>

        {/* Airline Partners */}
        <div>
          <h3 className={`text-xl font-semibold mb-6 text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {t('section.airlinePartners')}
          </h3>
          <PartnerSlider partners={airlinePartners} direction="right" />
        </div>
      </div>
    </section>
  );
};

export default Partners;
