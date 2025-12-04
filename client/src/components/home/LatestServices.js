import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Palmtree, 
  FileCheck, 
  Building2, 
  Users, 
  Shield,
  ArrowRight,
  Zap
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';

const iconMap = {
  Plane: Plane,
  Palmtree: Palmtree,
  FileCheck: FileCheck,
  Building2: Building2,
  Users: Users,
  Shield: Shield
};

const LatestServices = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services?latest=true');
        setServices(response.data.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        // Fallback data
        setServices([
          {
            id: 1,
            title: "Flight Booking",
            title_bn: "ফ্লাইট বুকিং",
            description: "Book domestic and international flights at best prices",
            description_bn: "সেরা মূল্যে দেশীয় এবং আন্তর্জাতিক ফ্লাইট বুক করুন",
            icon: "Plane",
            path: "/flights"
          },
          {
            id: 2,
            title: "Holiday Packages",
            title_bn: "হলিডে প্যাকেজ",
            description: "Curated holiday packages for every budget",
            description_bn: "প্রতিটি বাজেটের জন্য বিশেষভাবে সাজানো হলিডে প্যাকেজ",
            icon: "Palmtree",
            path: "/holidays"
          },
          {
            id: 3,
            title: "Visa Services",
            title_bn: "ভিসা সেবা",
            description: "Hassle-free visa processing for all countries",
            description_bn: "সব দেশের জন্য ঝামেলামুক্ত ভিসা প্রসেসিং",
            icon: "FileCheck",
            path: "/visas"
          },
          {
            id: 4,
            title: "Hotel Booking",
            title_bn: "হোটেল বুকিং",
            description: "Premium hotels and resorts worldwide",
            description_bn: "বিশ্বব্যাপী প্রিমিয়াম হোটেল এবং রিসোর্ট",
            icon: "Building2",
            path: "/services"
          },
          {
            id: 5,
            title: "Group Tours",
            title_bn: "গ্রুপ ট্যুর",
            description: "Exciting group tour packages with experienced guides",
            description_bn: "অভিজ্ঞ গাইড সহ উত্তেজনাপূর্ণ গ্রুপ ট্যুর প্যাকেজ",
            icon: "Users",
            path: "/group-tours"
          },
          {
            id: 6,
            title: "Travel Insurance",
            title_bn: "ভ্রমণ বীমা",
            description: "Comprehensive travel insurance coverage",
            description_bn: "ব্যাপক ভ্রমণ বীমা কভারেজ",
            icon: "Shield",
            path: "/services"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const gradientColors = [
    'from-blue-500 to-cyan-500',
    'from-orange-500 to-red-500',
    'from-purple-500 to-indigo-500',
    'from-green-500 to-emerald-500',
    'from-pink-500 to-rose-500',
    'from-yellow-500 to-orange-500'
  ];

  return (
    <section className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-500/10 text-secondary-500 text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            {t('common.new')}
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('section.latestServices')}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('section.latestServicesDesc')}
          </p>
        </motion.div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`rounded-2xl p-8 animate-pulse ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                <div className="w-16 h-16 rounded-2xl bg-gray-300 dark:bg-slate-600 mb-6" />
                <div className="h-6 bg-gray-300 dark:bg-slate-600 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-300 dark:bg-slate-600 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Plane;
              const gradient = gradientColors[index % gradientColors.length];
              
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group relative p-8 rounded-2xl transition-all duration-300 ${
                    isDark 
                      ? 'bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 hover:border-slate-500' 
                      : 'bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100 hover:border-gray-200'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? service.title_bn : service.title}
                  </h3>
                  <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'bn' ? service.description_bn : service.description}
                  </p>

                  {/* Link */}
                  <Link
                    to={service.path || '/services'}
                    className={`inline-flex items-center font-semibold ${
                      isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-500 hover:text-primary-600'
                    } transition-colors group/link`}
                  >
                    {t('common.learnMore')}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-2 transition-transform" />
                  </Link>

                  {/* Decorative Corner */}
                  <div className={`absolute top-0 right-0 w-20 h-20 opacity-10 bg-gradient-to-br ${gradient} rounded-bl-full`} />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-16 p-8 lg:p-12 rounded-3xl bg-gradient-to-r from-primary-500 to-accent-500 text-white text-center`}
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            {language === 'bn' ? 'আপনার স্বপ্নের ছুটি পরিকল্পনা করতে প্রস্তুত?' : 'Ready to Plan Your Dream Vacation?'}
          </h3>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {language === 'bn' 
              ? 'আমাদের ভ্রমণ বিশেষজ্ঞরা আপনার জন্য সেরা ট্যুর তৈরি করতে প্রস্তুত'
              : 'Our travel experts are ready to create the perfect tour for you'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
            </Link>
            <Link
              to="/holidays"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/30"
            >
              {language === 'bn' ? 'প্যাকেজ দেখুন' : 'Browse Packages'}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestServices;
