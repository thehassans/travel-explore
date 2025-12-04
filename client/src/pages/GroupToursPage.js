import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const GroupToursPage = () => {
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();

  const tours = [
    {
      id: 1,
      title: "Dubai Shopping Festival Group Tour",
      title_bn: "দুবাই শপিং ফেস্টিভ্যাল গ্রুপ ট্যুর",
      destination: "Dubai, UAE",
      price: 75000,
      duration: "5 Days / 4 Nights",
      groupSize: "20-30 persons",
      nextDate: "15 Jan 2025",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      highlights: ['Burj Khalifa', 'Desert Safari', 'Shopping Malls', 'Dubai Frame']
    },
    {
      id: 2,
      title: "Thailand Explorer Group Tour",
      title_bn: "থাইল্যান্ড এক্সপ্লোরার গ্রুপ ট্যুর",
      destination: "Bangkok & Pattaya",
      price: 55000,
      duration: "6 Days / 5 Nights",
      groupSize: "25-35 persons",
      nextDate: "20 Jan 2025",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
      highlights: ['Grand Palace', 'Coral Island', 'Thai Massage', 'Night Market']
    },
    {
      id: 3,
      title: "Malaysia Singapore Combo Tour",
      title_bn: "মালয়েশিয়া সিঙ্গাপুর কম্বো ট্যুর",
      destination: "KL & Singapore",
      price: 85000,
      duration: "7 Days / 6 Nights",
      groupSize: "20-25 persons",
      nextDate: "01 Feb 2025",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
      highlights: ['Petronas Towers', 'Genting', 'USS', 'Marina Bay']
    },
    {
      id: 4,
      title: "Kashmir Paradise Group Tour",
      title_bn: "কাশ্মীর প্যারাডাইস গ্রুপ ট্যুর",
      destination: "Srinagar, Kashmir",
      price: 45000,
      duration: "5 Days / 4 Nights",
      groupSize: "15-25 persons",
      nextDate: "10 Feb 2025",
      image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800",
      highlights: ['Dal Lake', 'Gulmarg', 'Shikara Ride', 'Mughal Gardens']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Group Tours | Explore Holidays</title>
        <meta name="description" content="Join our exciting group tours to international destinations. Affordable packages with experienced guides." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {language === 'bn' ? 'গ্রুপ ট্যুর' : 'Group Tours'}
            </h1>
            <p className="text-xl text-white/80">
              {language === 'bn' 
                ? 'একসাথে ভ্রমণ করুন, স্মৃতি তৈরি করুন'
                : 'Travel together, create memories'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`py-12 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Experienced Guide', label_bn: 'অভিজ্ঞ গাইড' },
              { label: 'Group Discount', label_bn: 'গ্রুপ ডিসকাউন্ট' },
              { label: 'All Inclusive', label_bn: 'সব অন্তর্ভুক্ত' },
              { label: 'Safe Travel', label_bn: 'নিরাপদ ভ্রমণ' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl text-center ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}
              >
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language === 'bn' ? item.label_bn : item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours */}
      <section className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {tours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-lg ${isDark ? 'bg-slate-800' : 'bg-white'}`}
              >
                <div className="lg:w-1/3 h-64 lg:h-auto">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                </div>
                <div className="lg:w-2/3 p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-medium rounded-full flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {tour.nextDate}
                    </span>
                    <span className="px-3 py-1 bg-primary-500/10 text-primary-500 text-sm font-medium rounded-full flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {tour.groupSize}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? tour.title_bn : tour.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                      {tour.destination}
                    </span>
                    <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Clock className="w-4 h-4 mr-1" />
                      {tour.duration}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tour.highlights.map((item, i) => (
                      <span key={i} className={`px-3 py-1 text-sm rounded-full ${isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Per Person</span>
                      <p className="text-3xl font-bold text-primary-500">{formatCurrency(tour.price)}</p>
                    </div>
                    <Link
                      to={`/group-tours/${tour.id}`}
                      className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
                    >
                      {language === 'bn' ? 'যোগ দিন' : 'Join Now'}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GroupToursPage;
