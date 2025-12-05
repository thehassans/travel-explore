import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock,
  Users,
  Fuel,
  Settings,
  Shield,
  Star,
  Check,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  Gauge,
  Snowflake,
  Radio,
  Navigation
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useGradient } from '../context/GradientContext';

const CarRentalPage = () => {
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { useGradients } = useGradient();
  const [searchData, setSearchData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    returnDate: '',
    carType: 'all'
  });

  const carCategories = [
    { id: 'all', name: 'All Cars', name_bn: 'সব গাড়ি' },
    { id: 'economy', name: 'Economy', name_bn: 'ইকোনমি' },
    { id: 'sedan', name: 'Sedan', name_bn: 'সেডান' },
    { id: 'suv', name: 'SUV', name_bn: 'এসইউভি' },
    { id: 'luxury', name: 'Luxury', name_bn: 'বিলাসবহুল' },
    { id: 'van', name: 'Van/Minibus', name_bn: 'ভ্যান/মিনিবাস' },
  ];

  const cars = [
    {
      id: 1,
      name: 'Toyota Corolla',
      category: 'sedan',
      image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=800',
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol',
      price: 3500,
      priceUnit: 'day',
      features: ['ac', 'gps', 'bluetooth', 'airbag'],
      rating: 4.8,
      reviews: 245
    },
    {
      id: 2,
      name: 'Toyota Land Cruiser',
      category: 'suv',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      seats: 7,
      transmission: 'Automatic',
      fuel: 'Diesel',
      price: 12000,
      priceUnit: 'day',
      features: ['ac', 'gps', 'bluetooth', 'airbag', '4wd'],
      rating: 4.9,
      reviews: 180
    },
    {
      id: 3,
      name: 'Honda Civic',
      category: 'sedan',
      image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800',
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol',
      price: 4000,
      priceUnit: 'day',
      features: ['ac', 'gps', 'bluetooth', 'airbag'],
      rating: 4.7,
      reviews: 198
    },
    {
      id: 4,
      name: 'Toyota Hiace',
      category: 'van',
      image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800',
      seats: 12,
      transmission: 'Manual',
      fuel: 'Diesel',
      price: 8000,
      priceUnit: 'day',
      features: ['ac', 'spacious'],
      rating: 4.6,
      reviews: 156
    },
    {
      id: 5,
      name: 'BMW 5 Series',
      category: 'luxury',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol',
      price: 18000,
      priceUnit: 'day',
      features: ['ac', 'gps', 'bluetooth', 'airbag', 'leather', 'sunroof'],
      rating: 4.9,
      reviews: 89
    },
    {
      id: 6,
      name: 'Toyota Noah',
      category: 'van',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
      seats: 8,
      transmission: 'Automatic',
      fuel: 'Hybrid',
      price: 6000,
      priceUnit: 'day',
      features: ['ac', 'gps', 'bluetooth', 'airbag'],
      rating: 4.7,
      reviews: 167
    }
  ];

  const featureIcons = {
    ac: Snowflake,
    gps: Navigation,
    bluetooth: Radio,
    airbag: Shield,
    '4wd': Settings,
    leather: Star,
    sunroof: Star,
    spacious: Users
  };

  const benefits = [
    {
      icon: Shield,
      title: 'Full Insurance',
      title_bn: 'সম্পূর্ণ বীমা',
      description: 'Comprehensive coverage included',
      description_bn: 'ব্যাপক কভারেজ অন্তর্ভুক্ত'
    },
    {
      icon: Clock,
      title: '24/7 Roadside Help',
      title_bn: '২৪/৭ রোডসাইড সাহায্য',
      description: 'Emergency assistance anytime',
      description_bn: 'যেকোনো সময় জরুরি সহায়তা'
    },
    {
      icon: Car,
      title: 'Well Maintained',
      title_bn: 'ভালোভাবে রক্ষণাবেক্ষণ',
      description: 'Regularly serviced vehicles',
      description_bn: 'নিয়মিত সার্ভিসকৃত গাড়ি'
    },
    {
      icon: Users,
      title: 'Driver Available',
      title_bn: 'ড্রাইভার পাওয়া যায়',
      description: 'Professional drivers on request',
      description_bn: 'অনুরোধে পেশাদার ড্রাইভার'
    }
  ];

  const filteredCars = searchData.carType === 'all' 
    ? cars 
    : cars.filter(car => car.category === searchData.carType);

  return (
    <>
      <Helmet>
        <title>{language === 'bn' ? 'গাড়ি ভাড়া' : 'Car Rental'} | Explore Holidays</title>
      </Helmet>

      <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
        {/* Hero Section */}
        <section className={`relative pt-24 pb-32 overflow-hidden ${
          isDark 
            ? 'bg-slate-900' 
            : useGradients 
              ? 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-600'
              : 'bg-slate-900'
        }`}>
          {useGradients && (
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl" />
            </div>
          )}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center ${
                  useGradients ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/10'
                }`}
              >
                <Car className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                {language === 'bn' ? 'গাড়ি ভাড়া সেবা' : 'Car Rental Service'}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {language === 'bn' 
                  ? 'আরামদায়ক এবং নির্ভরযোগ্য গাড়ি ভাড়া করুন সেরা মূল্যে'
                  : 'Rent comfortable and reliable cars at the best prices'}
              </p>
            </motion.div>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`max-w-5xl mx-auto p-6 rounded-3xl shadow-2xl ${
                isDark ? 'bg-slate-800/90' : 'bg-white/95'
              } backdrop-blur-xl`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {language === 'bn' ? 'পিকআপ লোকেশন' : 'Pickup Location'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'bn' ? 'শহর বা এয়ারপোর্ট' : 'City or Airport'}
                    value={searchData.pickupLocation}
                    onChange={(e) => setSearchData({...searchData, pickupLocation: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      isDark 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : useGradients 
                          ? 'bg-white border-gray-200' 
                          : 'bg-slate-50 border-slate-300'
                    } focus:outline-none focus:border-orange-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {language === 'bn' ? 'পিকআপ তারিখ' : 'Pickup Date'}
                  </label>
                  <input
                    type="date"
                    value={searchData.pickupDate}
                    onChange={(e) => setSearchData({...searchData, pickupDate: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      isDark 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : useGradients 
                          ? 'bg-white border-gray-200' 
                          : 'bg-slate-50 border-slate-300'
                    } focus:outline-none focus:border-orange-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {language === 'bn' ? 'রিটার্ন তারিখ' : 'Return Date'}
                  </label>
                  <input
                    type="date"
                    value={searchData.returnDate}
                    onChange={(e) => setSearchData({...searchData, returnDate: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      isDark 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : useGradients 
                          ? 'bg-white border-gray-200' 
                          : 'bg-slate-50 border-slate-300'
                    } focus:outline-none focus:border-orange-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Car className="w-4 h-4 inline mr-1" />
                    {language === 'bn' ? 'গাড়ির ধরন' : 'Car Type'}
                  </label>
                  <select
                    value={searchData.carType}
                    onChange={(e) => setSearchData({...searchData, carType: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      isDark 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : useGradients 
                          ? 'bg-white border-gray-200' 
                          : 'bg-slate-50 border-slate-300'
                    } focus:outline-none focus:border-orange-500`}
                  >
                    {carCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {language === 'bn' ? cat.name_bn : cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-6 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 ${
                  useGradients 
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-lg hover:shadow-orange-500/30'
                    : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                <Car className="w-5 h-5" />
                {language === 'bn' ? 'গাড়ি খুঁজুন' : 'Search Cars'}
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 -mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-5 rounded-2xl text-center ${
                    isDark ? 'bg-slate-800' : 'bg-white shadow-lg'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                    useGradients 
                      ? 'bg-gradient-to-br from-orange-500 to-red-600'
                      : 'bg-slate-900'
                  }`}>
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`font-bold text-sm mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? benefit.title_bn : benefit.title}
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'bn' ? benefit.description_bn : benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Car Categories Filter */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {carCategories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchData({...searchData, carType: cat.id})}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    searchData.carType === cat.id
                      ? useGradients
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                        : 'bg-slate-900 text-white'
                      : isDark
                        ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {language === 'bn' ? cat.name_bn : cat.name}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Cars Grid */}
        <section className={`py-16 ${isDark ? 'bg-slate-900/50' : useGradients ? 'bg-gradient-to-b from-gray-50 to-white' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                useGradients 
                  ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600'
                  : 'bg-slate-900 text-white'
              }`}>
                <Sparkles className="w-4 h-4 mr-2" />
                {language === 'bn' ? 'আমাদের গাড়ি' : 'Our Fleet'}
              </span>
              <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'আপনার পছন্দের গাড়ি বেছে নিন' : 'Choose Your Perfect Ride'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map((car, index) => (
                <motion.div
                  key={car.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`group rounded-3xl overflow-hidden shadow-xl ${
                    isDark ? 'bg-slate-800' : 'bg-white'
                  } hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white ${
                      useGradients ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-slate-900'
                    }`}>
                      {car.category.toUpperCase()}
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 rounded-lg bg-white/20 backdrop-blur-sm">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-bold text-sm">{car.rating}</span>
                      <span className="text-white/70 text-xs">({car.reviews})</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {car.name}
                    </h3>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Users className="w-4 h-4 mr-1" />
                        {car.seats} {language === 'bn' ? 'সিট' : 'Seats'}
                      </div>
                      <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Settings className="w-4 h-4 mr-1" />
                        {car.transmission}
                      </div>
                      <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Fuel className="w-4 h-4 mr-1" />
                        {car.fuel}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {car.features.slice(0, 4).map((feature) => {
                        const Icon = featureIcons[feature] || Check;
                        return (
                          <div 
                            key={feature}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDark ? 'bg-slate-700' : 'bg-gray-100'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${useGradients ? 'text-orange-500' : 'text-slate-600'}`} />
                          </div>
                        );
                      })}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                      <div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'bn' ? 'প্রতি দিন' : 'per day'}
                        </span>
                        <p className={`text-2xl font-black ${
                          useGradients 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'
                            : isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {formatCurrency(car.price)}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2.5 rounded-xl font-bold text-white ${
                          useGradients 
                            ? 'bg-gradient-to-r from-orange-500 to-red-600'
                            : 'bg-slate-900 hover:bg-slate-800'
                        }`}
                      >
                        {language === 'bn' ? 'বুক করুন' : 'Book Now'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-20 ${
          useGradients 
            ? 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-600'
            : 'bg-slate-900'
        }`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              {language === 'bn' ? 'কাস্টম প্যাকেজ দরকার?' : 'Need a Custom Package?'}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {language === 'bn' 
                ? 'গ্রুপ ট্রাভেল বা দীর্ঘমেয়াদী ভাড়ার জন্য বিশেষ রেট পান'
                : 'Get special rates for group travel or long-term rentals'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+8801234567890"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                +880 1234-567890
              </motion.a>
              <motion.a
                href="mailto:cars@exploreholidays.com"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                <Mail className="w-5 h-5" />
                cars@exploreholidays.com
              </motion.a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CarRentalPage;
