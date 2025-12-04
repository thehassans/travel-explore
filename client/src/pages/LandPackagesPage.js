import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const LandPackagesPage = () => {
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();

  const packages = [
    {
      id: 1,
      title: "Cox's Bazar Complete Package",
      title_bn: "কক্সবাজার সম্পূর্ণ প্যাকেজ",
      destination: "Cox's Bazar",
      price: 15000,
      duration: "3 Days / 2 Nights",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      includes: ['Hotel', 'Transport', 'Meals', 'Sightseeing'],
      rating: 4.8
    },
    {
      id: 2,
      title: "Sylhet Tea Garden Tour",
      title_bn: "সিলেট চা বাগান ট্যুর",
      destination: "Sylhet",
      price: 12000,
      duration: "2 Days / 1 Night",
      image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=800",
      includes: ['Hotel', 'Transport', 'Breakfast'],
      rating: 4.6
    },
    {
      id: 3,
      title: "Bandarban Hill Trek",
      title_bn: "বান্দরবান হিল ট্রেক",
      destination: "Bandarban",
      price: 18000,
      duration: "4 Days / 3 Nights",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      includes: ['Resort', 'Transport', 'Guide', 'Meals'],
      rating: 4.9
    },
    {
      id: 4,
      title: "Sundarbans Expedition",
      title_bn: "সুন্দরবন অভিযান",
      destination: "Sundarbans",
      price: 25000,
      duration: "3 Days / 2 Nights",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
      includes: ['Boat Stay', 'Guide', 'All Meals', 'Permit'],
      rating: 4.7
    },
    {
      id: 5,
      title: "Rangamati Lake Tour",
      title_bn: "রাঙামাটি লেক ট্যুর",
      destination: "Rangamati",
      price: 14000,
      duration: "2 Days / 1 Night",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800",
      includes: ['Hotel', 'Boat Ride', 'Transport'],
      rating: 4.5
    },
    {
      id: 6,
      title: "Sajek Valley Adventure",
      title_bn: "সাজেক ভ্যালি অ্যাডভেঞ্চার",
      destination: "Sajek",
      price: 16000,
      duration: "3 Days / 2 Nights",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      includes: ['Cottage', 'Jeep', 'Breakfast', 'Campfire'],
      rating: 4.8
    }
  ];

  return (
    <>
      <Helmet>
        <title>Land Packages | Explore Holidays</title>
        <meta name="description" content="Explore Bangladesh with our curated land packages. Visit Cox's Bazar, Sundarbans, Sylhet, and more." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {language === 'bn' ? 'ল্যান্ড প্যাকেজ' : 'Land Packages'}
            </h1>
            <p className="text-xl text-white/80">
              {language === 'bn' 
                ? 'বাংলাদেশের সৌন্দর্য অন্বেষণ করুন'
                : 'Explore the beauty of Bangladesh'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`rounded-2xl overflow-hidden shadow-lg ${isDark ? 'bg-slate-800' : 'bg-white'}`}
              >
                <div className="relative h-48">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 flex items-center px-2 py-1 bg-black/50 backdrop-blur rounded-lg text-white text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {pkg.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? pkg.title_bn : pkg.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <MapPin className="w-4 h-4 mr-1 text-primary-500" />
                      {pkg.destination}
                    </span>
                    <span className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Clock className="w-4 h-4 mr-1" />
                      {pkg.duration}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.includes.map((item, i) => (
                      <span key={i} className={`px-2 py-1 text-xs rounded-full ${isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Starting from</span>
                      <p className="text-2xl font-bold text-primary-500">{formatCurrency(pkg.price)}</p>
                    </div>
                    <Link
                      to={`/land-packages/${pkg.id}`}
                      className="px-6 py-2 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
                    >
                      {language === 'bn' ? 'বুক করুন' : 'Book Now'}
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

export default LandPackagesPage;
