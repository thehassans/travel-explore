import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const PartnersPage = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const bankPartners = [
    { name: 'BRAC Bank', logo: 'https://via.placeholder.com/200x80/0ea5e9/ffffff?text=BRAC+Bank' },
    { name: 'Dutch Bangla Bank', logo: 'https://via.placeholder.com/200x80/22c55e/ffffff?text=DBBL' },
    { name: 'City Bank', logo: 'https://via.placeholder.com/200x80/8b5cf6/ffffff?text=City+Bank' },
    { name: 'Eastern Bank', logo: 'https://via.placeholder.com/200x80/f97316/ffffff?text=EBL' },
    { name: 'bKash', logo: 'https://via.placeholder.com/200x80/ec4899/ffffff?text=bKash' },
    { name: 'Nagad', logo: 'https://via.placeholder.com/200x80/ef4444/ffffff?text=Nagad' },
  ];

  const airlinePartners = [
    { name: 'Biman Bangladesh', logo: 'https://via.placeholder.com/200x80/16a34a/ffffff?text=Biman' },
    { name: 'Emirates', logo: 'https://via.placeholder.com/200x80/b91c1c/ffffff?text=Emirates' },
    { name: 'Singapore Airlines', logo: 'https://via.placeholder.com/200x80/0369a1/ffffff?text=Singapore+Air' },
    { name: 'Qatar Airways', logo: 'https://via.placeholder.com/200x80/7c2d12/ffffff?text=Qatar' },
    { name: 'Thai Airways', logo: 'https://via.placeholder.com/200x80/7c3aed/ffffff?text=Thai' },
    { name: 'Malaysia Airlines', logo: 'https://via.placeholder.com/200x80/0284c7/ffffff?text=Malaysia' },
  ];

  return (
    <>
      <Helmet>
        <title>Our Partners | Explore Holidays</title>
      </Helmet>

      <section className="relative pt-32 pb-16 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <Handshake className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-4">
            {language === 'bn' ? 'আমাদের অংশীদার' : 'Our Partners'}
          </motion.h1>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`} id="banks">
            {language === 'bn' ? 'ব্যাংক অংশীদার' : 'Bank Partners'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
            {bankPartners.map((partner, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg flex items-center justify-center`}>
                <img src={partner.logo} alt={partner.name} className="h-12 object-contain" />
              </motion.div>
            ))}
          </div>

          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`} id="airlines">
            {language === 'bn' ? 'এয়ারলাইন অংশীদার' : 'Airline Partners'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {airlinePartners.map((partner, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className={`p-6 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg flex items-center justify-center`}>
                <img src={partner.logo} alt={partner.name} className="h-12 object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnersPage;
