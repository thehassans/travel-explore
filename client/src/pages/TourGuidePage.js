import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Star,
  Clock,
  Globe,
  MessageCircle,
  Award,
  Camera,
  Heart,
  Phone,
  Mail,
  Sparkles,
  Check,
  Calendar,
  Languages
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useGradient } from '../context/GradientContext';

const TourGuidePage = () => {
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { useGradients } = useGradient();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Guides', name_bn: 'সব গাইড' },
    { id: 'city', name: 'City Tours', name_bn: 'সিটি ট্যুর' },
    { id: 'adventure', name: 'Adventure', name_bn: 'অ্যাডভেঞ্চার' },
    { id: 'cultural', name: 'Cultural', name_bn: 'সাংস্কৃতিক' },
    { id: 'food', name: 'Food Tours', name_bn: 'ফুড ট্যুর' },
  ];

  const guides = [
    {
      id: 1,
      name: 'Rafiq Ahmed',
      name_bn: 'রফিক আহমেদ',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      category: 'city',
      speciality: "Cox's Bazar & Chittagong",
      speciality_bn: "কক্সবাজার ও চট্টগ্রাম",
      languages: ['Bengali', 'English', 'Hindi'],
      experience: 12,
      rating: 4.9,
      reviews: 248,
      tours: 520,
      price: 3000,
      priceUnit: 'day',
      bio: 'Expert guide with deep knowledge of coastal Bangladesh. Specialized in beach tours and local culture.',
      bio_bn: 'উপকূলীয় বাংলাদেশের গভীর জ্ঞান সম্পন্ন বিশেষজ্ঞ গাইড। সৈকত ভ্রমণ এবং স্থানীয় সংস্কৃতিতে বিশেষজ্ঞ।',
      verified: true
    },
    {
      id: 2,
      name: 'Fatema Begum',
      name_bn: 'ফাতেমা বেগম',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      category: 'cultural',
      speciality: 'Old Dhaka Heritage',
      speciality_bn: 'পুরান ঢাকা ঐতিহ্য',
      languages: ['Bengali', 'English', 'Arabic'],
      experience: 8,
      rating: 4.8,
      reviews: 186,
      tours: 340,
      price: 2500,
      priceUnit: 'day',
      bio: 'Passionate about Dhaka\'s rich history and culture. Expert in heritage walks and traditional crafts.',
      bio_bn: 'ঢাকার সমৃদ্ধ ইতিহাস ও সংস্কৃতির প্রতি আবেগী। ঐতিহ্যবাহী হাঁটা এবং ঐতিহ্যবাহী কারুশিল্পে বিশেষজ্ঞ।',
      verified: true
    },
    {
      id: 3,
      name: 'Kamal Hossain',
      name_bn: 'কামাল হোসেন',
      photo: 'https://randomuser.me/api/portraits/men/67.jpg',
      category: 'adventure',
      speciality: 'Sundarbans & Wildlife',
      speciality_bn: 'সুন্দরবন ও বন্যপ্রাণী',
      languages: ['Bengali', 'English'],
      experience: 15,
      rating: 4.9,
      reviews: 312,
      tours: 680,
      price: 4000,
      priceUnit: 'day',
      bio: 'Wildlife expert and certified Sundarbans guide. Passionate about conservation and eco-tourism.',
      bio_bn: 'বন্যপ্রাণী বিশেষজ্ঞ এবং প্রত্যয়িত সুন্দরবন গাইড। সংরক্ষণ এবং ইকো-ট্যুরিজমের প্রতি আবেগী।',
      verified: true
    },
    {
      id: 4,
      name: 'Shakil Rahman',
      name_bn: 'শাকিল রহমান',
      photo: 'https://randomuser.me/api/portraits/men/45.jpg',
      category: 'food',
      speciality: 'Bengali Cuisine Tours',
      speciality_bn: 'বাঙালি রন্ধনশৈলী ট্যুর',
      languages: ['Bengali', 'English'],
      experience: 6,
      rating: 4.7,
      reviews: 145,
      tours: 220,
      price: 2000,
      priceUnit: 'day',
      bio: 'Food enthusiast specializing in authentic Bengali street food and traditional cuisine experiences.',
      bio_bn: 'খাদ্য উৎসাহী যিনি খাঁটি বাঙালি স্ট্রিট ফুড এবং ঐতিহ্যবাহী রন্ধনশৈলীতে বিশেষজ্ঞ।',
      verified: true
    },
    {
      id: 5,
      name: 'Nadia Islam',
      name_bn: 'নাদিয়া ইসলাম',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      category: 'city',
      speciality: 'Sylhet Tea Gardens',
      speciality_bn: 'সিলেট চা বাগান',
      languages: ['Bengali', 'English', 'Hindi'],
      experience: 10,
      rating: 4.8,
      reviews: 198,
      tours: 410,
      price: 3500,
      priceUnit: 'day',
      bio: 'Sylhet native with extensive knowledge of tea gardens, waterfalls, and natural beauty of the region.',
      bio_bn: 'চা বাগান, জলপ্রপাত এবং অঞ্চলের প্রাকৃতিক সৌন্দর্যের ব্যাপক জ্ঞান সম্পন্ন সিলেটের স্থানীয়।',
      verified: true
    },
    {
      id: 6,
      name: 'Imran Khan',
      name_bn: 'ইমরান খান',
      photo: 'https://randomuser.me/api/portraits/men/52.jpg',
      category: 'adventure',
      speciality: 'Hill Tracts Trekking',
      speciality_bn: 'পার্বত্য চট্টগ্রাম ট্রেকিং',
      languages: ['Bengali', 'English', 'Chakma'],
      experience: 9,
      rating: 4.9,
      reviews: 167,
      tours: 290,
      price: 4500,
      priceUnit: 'day',
      bio: 'Adventure specialist for Bandarban, Rangamati, and Khagrachhari. Expert in hill trekking and tribal culture.',
      bio_bn: 'বান্দরবান, রাঙ্গামাটি এবং খাগড়াছড়ির জন্য অ্যাডভেঞ্চার বিশেষজ্ঞ। পাহাড়ি ট্রেকিং এবং উপজাতীয় সংস্কৃতিতে বিশেষজ্ঞ।',
      verified: true
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Certified Guides',
      title_bn: 'প্রত্যয়িত গাইড',
      description: 'All guides are licensed and verified',
      description_bn: 'সব গাইড লাইসেন্সপ্রাপ্ত এবং যাচাইকৃত'
    },
    {
      icon: Globe,
      title: 'Local Expertise',
      title_bn: 'স্থানীয় দক্ষতা',
      description: 'Deep knowledge of local culture and history',
      description_bn: 'স্থানীয় সংস্কৃতি ও ইতিহাসের গভীর জ্ঞান'
    },
    {
      icon: Languages,
      title: 'Multilingual',
      title_bn: 'বহুভাষী',
      description: 'Guides fluent in multiple languages',
      description_bn: 'একাধিক ভাষায় দক্ষ গাইড'
    },
    {
      icon: Camera,
      title: 'Photo Support',
      title_bn: 'ফটো সাপোর্ট',
      description: 'Help capture your best travel moments',
      description_bn: 'আপনার সেরা ভ্রমণ মুহূর্ত ক্যাপচার করতে সাহায্য'
    }
  ];

  const filteredGuides = selectedCategory === 'all' 
    ? guides 
    : guides.filter(guide => guide.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>{language === 'bn' ? 'ট্যুর গাইড' : 'Tour Guides'} | Explore Holidays</title>
      </Helmet>

      <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
        {/* Hero Section */}
        <section className={`relative pt-24 pb-32 overflow-hidden ${
          isDark 
            ? 'bg-slate-900' 
            : useGradients 
              ? 'bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700'
              : 'bg-slate-900'
        }`}>
          {useGradients && (
            <div className="absolute inset-0">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
            </div>
          )}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center ${
                  useGradients ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/10'
                }`}
              >
                <Users className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                {language === 'bn' ? 'বিশেষজ্ঞ ট্যুর গাইড' : 'Expert Tour Guides'}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                {language === 'bn' 
                  ? 'স্থানীয় বিশেষজ্ঞদের সাথে বাংলাদেশ আবিষ্কার করুন যারা প্রতিটি ভ্রমণকে অবিস্মরণীয় করে তোলে'
                  : 'Discover Bangladesh with local experts who make every journey unforgettable'}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span>{language === 'bn' ? '৫০+ যাচাইকৃত গাইড' : '50+ Verified Guides'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>{language === 'bn' ? '৪.৮+ গড় রেটিং' : '4.8+ Avg Rating'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-yellow-400" />
                  <span>{language === 'bn' ? 'সারা বাংলাদেশে' : 'All Over Bangladesh'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 -mt-16">
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
                    isDark ? 'bg-slate-800' : 'bg-white shadow-xl'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                    useGradients 
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
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

        {/* Category Filter */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    selectedCategory === cat.id
                      ? useGradients
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
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

        {/* Guides Grid */}
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
                  ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-purple-600'
                  : 'bg-slate-900 text-white'
              }`}>
                <Sparkles className="w-4 h-4 mr-2" />
                {language === 'bn' ? 'আমাদের গাইড' : 'Our Guides'}
              </span>
              <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'আপনার গাইড বেছে নিন' : 'Choose Your Guide'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`group rounded-3xl overflow-hidden shadow-xl ${
                    isDark ? 'bg-slate-800' : 'bg-white'
                  } hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Header */}
                  <div className={`relative p-6 ${
                    useGradients 
                      ? 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10'
                      : isDark ? 'bg-slate-700/50' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-start gap-4">
                      {/* Photo */}
                      <div className="relative">
                        <img 
                          src={guide.photo} 
                          alt={guide.name}
                          className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                        />
                        {guide.verified && (
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                            useGradients ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-green-500'
                          }`}>
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {language === 'bn' ? guide.name_bn : guide.name}
                        </h3>
                        <p className={`text-sm mb-2 ${useGradients ? 'text-purple-600' : isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                          {language === 'bn' ? guide.speciality_bn : guide.speciality}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className={`ml-1 font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {guide.rating}
                            </span>
                          </div>
                          <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            ({guide.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {language === 'bn' ? guide.bio_bn : guide.bio}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Clock className="w-4 h-4 mr-1" />
                        {guide.experience} {language === 'bn' ? 'বছর' : 'years'}
                      </div>
                      <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <MapPin className="w-4 h-4 mr-1" />
                        {guide.tours} {language === 'bn' ? 'ট্যুর' : 'tours'}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.languages.map((lang) => (
                        <span 
                          key={lang}
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {lang}
                        </span>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                      <div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'bn' ? 'প্রতি দিন' : 'per day'}
                        </span>
                        <p className={`text-2xl font-black ${
                          useGradients 
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent'
                            : isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {formatCurrency(guide.price)}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-5 py-2.5 rounded-xl font-bold text-white ${
                          useGradients 
                            ? 'bg-gradient-to-r from-purple-500 to-indigo-600'
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

        {/* How It Works */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'কীভাবে কাজ করে' : 'How It Works'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: 1, title: 'Choose Guide', title_bn: 'গাইড বাছাই', desc: 'Browse profiles and pick your perfect guide', desc_bn: 'প্রোফাইল দেখুন এবং আপনার পছন্দের গাইড বাছাই করুন' },
                { step: 2, title: 'Book & Pay', title_bn: 'বুক ও পেমেন্ট', desc: 'Select dates and complete secure payment', desc_bn: 'তারিখ নির্বাচন করুন এবং নিরাপদ পেমেন্ট সম্পন্ন করুন' },
                { step: 3, title: 'Enjoy Tour', title_bn: 'ট্যুর উপভোগ', desc: 'Meet your guide and explore!', desc_bn: 'আপনার গাইডের সাথে দেখা করুন এবং অন্বেষণ করুন!' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl font-black text-white ${
                    useGradients 
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                      : 'bg-slate-900'
                  }`}>
                    {item.step}
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
            ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600'
            : 'bg-slate-900'
        }`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              {language === 'bn' ? 'গাইড হতে চান?' : 'Want to Become a Guide?'}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {language === 'bn' 
                ? 'আমাদের টিমে যোগ দিন এবং পর্যটকদের বাংলাদেশ দেখান'
                : 'Join our team and show tourists the beauty of Bangladesh'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+8801234567890"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                +880 1234-567890
              </motion.a>
              <motion.a
                href="mailto:guides@exploreholidays.com"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                <Mail className="w-5 h-5" />
                guides@exploreholidays.com
              </motion.a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TourGuidePage;
