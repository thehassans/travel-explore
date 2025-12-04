import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plane, Palmtree, FileCheck, Building2, Users, Shield, Car, Compass } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ServicesPage = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const services = [
    { icon: Plane, title: 'Flight Booking', title_bn: 'ফ্লাইট বুকিং', desc: 'Domestic & international flights at best prices', path: '/flights', color: 'from-blue-500 to-cyan-500' },
    { icon: Palmtree, title: 'Holiday Packages', title_bn: 'হলিডে প্যাকেজ', desc: 'Curated vacation packages worldwide', path: '/holidays', color: 'from-green-500 to-emerald-500' },
    { icon: FileCheck, title: 'Visa Services', title_bn: 'ভিসা সেবা', desc: 'Hassle-free visa processing', path: '/visas', color: 'from-purple-500 to-indigo-500' },
    { icon: Building2, title: 'Hotel Booking', title_bn: 'হোটেল বুকিং', desc: 'Premium hotels and resorts', path: '/services', color: 'from-orange-500 to-red-500' },
    { icon: Users, title: 'Group Tours', title_bn: 'গ্রুপ ট্যুর', desc: 'Exciting group travel experiences', path: '/group-tours', color: 'from-pink-500 to-rose-500' },
    { icon: Shield, title: 'Travel Insurance', title_bn: 'ভ্রমণ বীমা', desc: 'Comprehensive coverage', path: '/services', color: 'from-teal-500 to-cyan-500' },
    { icon: Car, title: 'Car Rental', title_bn: 'গাড়ি ভাড়া', desc: 'Comfortable transportation', path: '/services', color: 'from-amber-500 to-yellow-500' },
    { icon: Compass, title: 'Tour Guide', title_bn: 'ট্যুর গাইড', desc: 'Expert local guides', path: '/services', color: 'from-indigo-500 to-purple-500' }
  ];

  return (
    <>
      <Helmet>
        <title>Our Services | Explore Holidays</title>
        <meta name="description" content="Complete travel services including flights, hotels, visas, tours, and more." />
      </Helmet>

      <section className="relative pt-32 pb-16 bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold mb-4">
            {language === 'bn' ? 'আমাদের সেবাসমূহ' : 'Our Services'}
          </motion.h1>
        </div>
      </section>

      <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ y: -8 }}
                  className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? service.title_bn : service.title}
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{service.desc}</p>
                  <Link to={service.path} className="text-primary-500 font-medium hover:text-primary-600">
                    {language === 'bn' ? 'আরও জানুন →' : 'Learn More →'}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
