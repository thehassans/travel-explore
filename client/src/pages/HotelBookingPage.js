import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Wifi, 
  Car, 
  UtensilsCrossed,
  Waves,
  Dumbbell,
  SpadeIcon,
  Coffee,
  Tv,
  Wind,
  Search,
  Filter,
  ChevronDown,
  Heart,
  ArrowRight,
  Check,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useGradient } from '../context/GradientContext';

const HotelBookingPage = () => {
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { useGradients } = useGradient();
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });

  const featuredHotels = [
    {
      id: 1,
      name: "The Westin Dhaka",
      name_bn: "দ্য ওয়েস্টিন ঢাকা",
      location: "Gulshan, Dhaka",
      rating: 5,
      reviews: 1250,
      price: 25000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'parking'],
      discount: 20
    },
    {
      id: 2,
      name: "Pan Pacific Sonargaon",
      name_bn: "প্যান প্যাসিফিক সোনারগাঁও",
      location: "Karwan Bazar, Dhaka",
      rating: 5,
      reviews: 980,
      price: 22000,
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      amenities: ['wifi', 'pool', 'gym', 'restaurant', 'parking'],
      discount: 15
    },
    {
      id: 3,
      name: "Radisson Blu Chittagong",
      name_bn: "র‍্যাডিসন ব্লু চট্টগ্রাম",
      location: "Chittagong",
      rating: 5,
      reviews: 650,
      price: 18000,
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      amenities: ['wifi', 'pool', 'gym', 'restaurant'],
      discount: 10
    },
    {
      id: 4,
      name: "Royal Tulip Sea Pearl Beach",
      name_bn: "রয়্যাল টিউলিপ সী পার্ল বীচ",
      location: "Cox's Bazar",
      rating: 5,
      reviews: 890,
      price: 20000,
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      amenities: ['wifi', 'pool', 'spa', 'beach', 'restaurant', 'parking'],
      discount: 25
    },
    {
      id: 5,
      name: "Long Beach Hotel",
      name_bn: "লং বীচ হোটেল",
      location: "Cox's Bazar",
      rating: 4,
      reviews: 720,
      price: 12000,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      amenities: ['wifi', 'pool', 'beach', 'restaurant'],
      discount: 0
    },
    {
      id: 6,
      name: "Le Méridien Dhaka",
      name_bn: "লে মেরিডিয়ান ঢাকা",
      location: "Nikunja, Dhaka",
      rating: 5,
      reviews: 540,
      price: 28000,
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'parking'],
      discount: 18
    }
  ];

  const amenityIcons = {
    wifi: Wifi,
    pool: Waves,
    spa: SpadeIcon,
    gym: Dumbbell,
    restaurant: UtensilsCrossed,
    parking: Car,
    beach: Waves,
    coffee: Coffee,
    tv: Tv,
    ac: Wind
  };

  const hotelTypes = [
    { id: 'luxury', label: '5 Star Luxury', label_bn: '৫ তারা বিলাসবহুল' },
    { id: 'business', label: 'Business Hotels', label_bn: 'বিজনেস হোটেল' },
    { id: 'resort', label: 'Beach Resorts', label_bn: 'বীচ রিসোর্ট' },
    { id: 'budget', label: 'Budget Friendly', label_bn: 'বাজেট ফ্রেন্ডলি' },
  ];

  return (
    <>
      <Helmet>
        <title>{language === 'bn' ? 'হোটেল বুকিং' : 'Hotel Booking'} | Explore Holidays</title>
      </Helmet>

      <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
        {/* Hero Section */}
        <section className={`relative pt-24 pb-32 overflow-hidden ${
          isDark 
            ? 'bg-slate-900' 
            : useGradients 
              ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700'
              : 'bg-slate-900'
        }`}>
          {useGradients && (
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl" />
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
                <Building2 className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                {language === 'bn' ? 'প্রিমিয়াম হোটেল বুকিং' : 'Premium Hotel Booking'}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {language === 'bn' 
                  ? 'বিশ্বের সেরা হোটেল এবং রিসোর্টে আপনার থাকার ব্যবস্থা করুন সেরা মূল্যে'
                  : 'Book your stay at the world\'s finest hotels and resorts at the best prices'}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="lg:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {language === 'bn' ? 'গন্তব্য' : 'Destination'}
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'bn' ? 'শহর বা হোটেল খুঁজুন' : 'Search city or hotel'}
                    value={searchData.destination}
                    onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      isDark 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : useGradients 
                          ? 'bg-white border-gray-200' 
                          : 'bg-slate-50 border-slate-300'
                    } focus:outline-none focus:border-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {language === 'bn' ? 'চেক-ইন' : 'Check-in'}
                  </label>
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      isDark 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : useGradients 
                          ? 'bg-white border-gray-200' 
                          : 'bg-slate-50 border-slate-300'
                    } focus:outline-none focus:border-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {language === 'bn' ? 'চেক-আউট' : 'Check-out'}
                  </label>
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      isDark 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : useGradients 
                          ? 'bg-white border-gray-200' 
                          : 'bg-slate-50 border-slate-300'
                    } focus:outline-none focus:border-blue-500`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <Users className="w-4 h-4 inline mr-1" />
                    {language === 'bn' ? 'অতিথি' : 'Guests'}
                  </label>
                  <select
                    value={searchData.guests}
                    onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      isDark 
                        ? 'bg-slate-700 border-slate-600 text-white' 
                        : useGradients 
                          ? 'bg-white border-gray-200' 
                          : 'bg-slate-50 border-slate-300'
                    } focus:outline-none focus:border-blue-500`}
                  >
                    {[1,2,3,4,5,6].map(n => (
                      <option key={n} value={n}>{n} {language === 'bn' ? 'জন' : 'Guest(s)'}</option>
                    ))}
                  </select>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full mt-6 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 ${
                  useGradients 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30'
                    : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                <Search className="w-5 h-5" />
                {language === 'bn' ? 'হোটেল খুঁজুন' : 'Search Hotels'}
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Hotel Types */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {hotelTypes.map((type, index) => (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    useGradients 
                      ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-600 hover:from-blue-500 hover:to-indigo-500 hover:text-white'
                      : isDark 
                        ? 'bg-slate-800 text-white hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {language === 'bn' ? type.label_bn : type.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Hotels */}
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
                  ? 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600'
                  : 'bg-slate-900 text-white'
              }`}>
                <Sparkles className="w-4 h-4 mr-2" />
                {language === 'bn' ? 'বিশেষ হোটেল' : 'Featured Hotels'}
              </span>
              <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'সেরা হোটেল সমূহ' : 'Top Rated Hotels'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredHotels.map((hotel, index) => (
                <motion.div
                  key={hotel.id}
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
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Discount Badge */}
                    {hotel.discount > 0 && (
                      <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold text-white ${
                        useGradients ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-red-500'
                      }`}>
                        {hotel.discount}% OFF
                      </div>
                    )}
                    
                    {/* Wishlist */}
                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                      <Heart className="w-5 h-5 text-white" />
                    </button>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/20 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white font-bold">{hotel.rating}.0</span>
                      </div>
                      <span className="text-white/80 text-sm">({hotel.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'bn' ? hotel.name_bn : hotel.name}
                    </h3>
                    <div className={`flex items-center mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((amenity) => {
                        const Icon = amenityIcons[amenity] || Check;
                        return (
                          <div 
                            key={amenity}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDark ? 'bg-slate-700' : 'bg-gray-100'
                            }`}
                          >
                            <Icon className={`w-4 h-4 ${useGradients ? 'text-blue-500' : 'text-slate-600'}`} />
                          </div>
                        );
                      })}
                      {hotel.amenities.length > 4 && (
                        <div className={`px-2 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                          isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          +{hotel.amenities.length - 4}
                        </div>
                      )}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                      <div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'bn' ? 'প্রতি রাত' : 'per night'}
                        </span>
                        <p className={`text-2xl font-black ${
                          useGradients 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent'
                            : isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {formatCurrency(hotel.price)}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2.5 rounded-xl font-bold text-white ${
                          useGradients 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
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

        {/* Why Book With Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-black mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'কেন আমাদের সাথে বুক করবেন?' : 'Why Book With Us?'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Check, title: 'Best Price Guarantee', title_bn: 'সেরা মূল্যের নিশ্চয়তা', desc: 'We match any lower price', desc_bn: 'আমরা যেকোনো কম মূল্যের সাথে মিলিয়ে দিই' },
                { icon: Star, title: 'Verified Reviews', title_bn: 'যাচাইকৃত রিভিউ', desc: 'Real reviews from real guests', desc_bn: 'প্রকৃত অতিথিদের প্রকৃত রিভিউ' },
                { icon: Phone, title: '24/7 Support', title_bn: '২৪/৭ সহায়তা', desc: 'Round the clock assistance', desc_bn: 'সার্বক্ষণিক সহায়তা' },
                { icon: Building2, title: '50,000+ Hotels', title_bn: '৫০,০০০+ হোটেল', desc: 'Worldwide coverage', desc_bn: 'বিশ্বব্যাপী কভারেজ' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl text-center ${
                    isDark ? 'bg-slate-800/50' : 'bg-white shadow-lg'
                  }`}
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    useGradients 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      : 'bg-slate-900'
                  }`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? item.title_bn : item.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'bn' ? item.desc_bn : item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-20 ${
          useGradients 
            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
            : 'bg-slate-900'
        }`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              {language === 'bn' ? 'সেরা ডিল পেতে যোগাযোগ করুন' : 'Contact Us for Best Deals'}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {language === 'bn' 
                ? 'আমাদের টিম আপনাকে সেরা হোটেল খুঁজে পেতে সাহায্য করবে'
                : 'Our team will help you find the perfect hotel at the best price'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+8801234567890"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                +880 1234-567890
              </motion.a>
              <motion.a
                href="mailto:hotels@exploreholidays.com"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                <Mail className="w-5 h-5" />
                hotels@exploreholidays.com
              </motion.a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HotelBookingPage;
