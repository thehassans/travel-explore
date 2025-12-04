import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Award, 
  HeadphonesIcon,
  CreditCard,
  MapPin,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const WhyChooseUs = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: 'Secure Booking',
      title_bn: 'নিরাপদ বুকিং',
      description: 'Your payment and personal data are protected with industry-leading security',
      description_bn: 'আপনার পেমেন্ট এবং ব্যক্তিগত তথ্য শিল্প-নেতৃস্থানীয় নিরাপত্তার সাথে সুরক্ষিত',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Best Price Guarantee',
      title_bn: 'সেরা মূল্যের নিশ্চয়তা',
      description: 'We offer the most competitive prices with price match guarantee',
      description_bn: 'আমরা মূল্য মিলের গ্যারান্টি সহ সবচেয়ে প্রতিযোগিতামূলক মূল্য অফার করি',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Support',
      title_bn: '২৪/৭ সহায়তা',
      description: 'Our dedicated support team is available round the clock to assist you',
      description_bn: 'আমাদের নিবেদিত সহায়তা দল আপনাকে সহায়তা করতে সর্বদা উপলব্ধ',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      title: 'Easy Booking',
      title_bn: 'সহজ বুকিং',
      description: 'Book your travel in just a few clicks with our user-friendly platform',
      description_bn: 'আমাদের ব্যবহারকারী-বান্ধব প্ল্যাটফর্মে মাত্র কয়েকটি ক্লিকে আপনার ভ্রমণ বুক করুন',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      title_bn: 'নমনীয় পেমেন্ট',
      description: 'Multiple payment options including EMI and mobile banking',
      description_bn: 'ইএমআই এবং মোবাইল ব্যাংকিং সহ একাধিক পেমেন্ট অপশন',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: MapPin,
      title: 'Expert Guidance',
      title_bn: 'বিশেষজ্ঞ গাইডেন্স',
      description: 'Travel experts with local knowledge to plan your perfect trip',
      description_bn: 'আপনার নিখুঁত ট্রিপ পরিকল্পনা করতে স্থানীয় জ্ঞান সহ ভ্রমণ বিশেষজ্ঞ',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-800' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ultra Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-500 text-sm font-semibold mb-6"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {language === 'bn' ? 'আমাদের সুবিধা' : 'Our Benefits'}
            <Sparkles className="w-4 h-4 ml-2" />
          </motion.span>
          <h2 className={`text-4xl sm:text-5xl font-black mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'কেন আমাদের বেছে নেবেন?' : 'Why Choose Us?'}
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'bn' 
              ? 'বাংলাদেশের সবচেয়ে বিশ্বস্ত ট্রাভেল এজেন্সি হিসেবে আমরা আপনার ভ্রমণকে অবিস্মরণীয় করে তুলি'
              : "As Bangladesh's most trusted travel agency, we make your journey unforgettable"}
          </p>
        </motion.div>

        {/* Ultra Premium Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative p-8 rounded-3xl transition-all duration-500 overflow-hidden ${
                  isDark 
                    ? 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600' 
                    : 'bg-white hover:shadow-2xl border border-gray-100 hover:border-gray-200'
                }`}
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${feature.color} opacity-40 blur-md`} />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'bn' ? feature.title_bn : feature.title}
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'bn' ? feature.description_bn : feature.description}
                </p>

                {/* Decorative Elements */}
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${feature.color} opacity-5`} />
                <div className={`absolute bottom-0 left-0 w-16 h-16 rounded-tr-full bg-gradient-to-tr ${feature.color} opacity-5`} />
              </motion.div>
            );
          })}
        </div>
        
        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center gap-8 lg:gap-16"
        >
          {[
            { number: '10+', label: language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience' },
            { number: '50K+', label: language === 'bn' ? 'সুখী গ্রাহক' : 'Happy Customers' },
            { number: '100+', label: language === 'bn' ? 'গন্তব্য' : 'Destinations' },
            { number: '99%', label: language === 'bn' ? 'সন্তুষ্টি' : 'Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className={`text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent`}>
                {stat.number}
              </div>
              <div className={`text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
