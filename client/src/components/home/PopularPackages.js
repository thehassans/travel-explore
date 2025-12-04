import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';

const PopularPackages = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('/api/packages?popular=true&limit=6');
        setPackages(response.data.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        // Fallback data
        setPackages([
          {
            id: 1,
            title: "Cox's Bazar Beach Paradise",
            title_bn: "কক্সবাজার সমুদ্র সৈকত প্যারাডাইস",
            destination: "Cox's Bazar, Bangladesh",
            price: 25000,
            duration: "3 Days / 2 Nights",
            image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
            is_popular: true,
            is_featured: true
          },
          {
            id: 2,
            title: "Maldives Luxury Escape",
            title_bn: "মালদ্বীপ বিলাসবহুল অবকাশ",
            destination: "Maldives",
            price: 150000,
            duration: "5 Days / 4 Nights",
            image_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
            is_popular: true,
            is_featured: true
          },
          {
            id: 3,
            title: "Dubai City Explorer",
            title_bn: "দুবাই সিটি এক্সপ্লোরার",
            destination: "Dubai, UAE",
            price: 85000,
            duration: "4 Days / 3 Nights",
            image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
            is_popular: true,
            is_featured: true
          },
          {
            id: 4,
            title: "Thailand Tropical Getaway",
            title_bn: "থাইল্যান্ড ট্রপিক্যাল গেটওয়ে",
            destination: "Thailand",
            price: 65000,
            duration: "5 Days / 4 Nights",
            image_url: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
            is_popular: true,
            is_featured: false
          },
          {
            id: 5,
            title: "Singapore Family Fun",
            title_bn: "সিঙ্গাপুর ফ্যামিলি ফান",
            destination: "Singapore",
            price: 95000,
            duration: "4 Days / 3 Nights",
            image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
            is_popular: false,
            is_featured: true
          },
          {
            id: 6,
            title: "Sundarbans Adventure",
            title_bn: "সুন্দরবন অ্যাডভেঞ্চার",
            destination: "Sundarbans, Bangladesh",
            price: 35000,
            duration: "4 Days / 3 Nights",
            image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
            is_popular: true,
            is_featured: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
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

  return (
    <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('common.popular')}
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('section.popularPackages')}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('section.popularPackagesDesc')}
          </p>
        </motion.div>

        {/* Packages Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden animate-pulse ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                <div className="h-56 bg-gray-300 dark:bg-slate-700" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-300 dark:bg-slate-700 rounded w-3/4" />
                  <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-1/2" />
                </div>
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
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white'
                }`}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={pkg.image_url}
                    alt={language === 'bn' ? pkg.title_bn : pkg.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {pkg.is_popular && (
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {t('common.popular')}
                      </span>
                    )}
                    {pkg.is_featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold rounded-full">
                        {t('common.featured')}
                      </span>
                    )}
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4">
                    <div className="px-4 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl shadow-lg">
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {t('common.from')}
                      </span>
                      <div className="text-xl font-bold text-primary-500">
                        {formatCurrency(pkg.price)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? pkg.title_bn : pkg.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                      {pkg.destination}
                    </div>
                    <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <Clock className="w-4 h-4 mr-1 text-secondary-500" />
                      {pkg.duration}
                    </div>
                  </div>

                  <Link
                    to={`/holidays/${pkg.id}`}
                    className="flex items-center justify-center w-full py-3 rounded-xl bg-primary-500/10 text-primary-500 font-semibold hover:bg-primary-500 hover:text-white transition-all group/btn"
                  >
                    {t('common.viewDetails')}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* See All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/holidays"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg hover:shadow-xl"
          >
            {t('common.seeAll')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularPackages;
