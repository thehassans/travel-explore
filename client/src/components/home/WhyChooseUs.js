import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Award, 
  HeadphonesIcon,
  CreditCard,
  MapPin
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const WhyChooseUs = () => {
  const { t } = useTranslation();
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
    <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'কেন আমাদের বেছে নেবেন?' : 'Why Choose Us?'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'bn' 
              ? 'বাংলাদেশের সবচেয়ে বিশ্বস্ত ট্রাভেল এজেন্সি হিসেবে আমরা আপনার ভ্রমণকে অবিস্মরণীয় করে তুলি'
              : "As Bangladesh's most trusted travel agency, we make your journey unforgettable"}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`relative p-8 rounded-2xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50' 
                    : 'bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100'
                }`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'bn' ? feature.title_bn : feature.title}
                </h3>
                <p className={`leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'bn' ? feature.description_bn : feature.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl bg-gradient-to-br ${feature.color} opacity-10`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
