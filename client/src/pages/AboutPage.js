import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Globe, 
  Heart,
  Target,
  Eye,
  CheckCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const AboutPage = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();

  const stats = [
    { number: '50,000+', label: 'Happy Travelers', label_bn: 'সুখী ভ্রমণকারী' },
    { number: '100+', label: 'Destinations', label_bn: 'গন্তব্য' },
    { number: '10+', label: 'Years Experience', label_bn: 'বছরের অভিজ্ঞতা' },
    { number: '24/7', label: 'Support', label_bn: 'সহায়তা' }
  ];

  const values = [
    { icon: Heart, title: 'Customer First', title_bn: 'গ্রাহক প্রথম', desc: 'Your satisfaction is our top priority', desc_bn: 'আপনার সন্তুষ্টি আমাদের শীর্ষ অগ্রাধিকার' },
    { icon: Award, title: 'Quality Service', title_bn: 'মানসম্মত সেবা', desc: 'Premium travel experiences guaranteed', desc_bn: 'প্রিমিয়াম ভ্রমণ অভিজ্ঞতার নিশ্চয়তা' },
    { icon: Globe, title: 'Global Reach', title_bn: 'বৈশ্বিক পরিধি', desc: 'Connections worldwide for best deals', desc_bn: 'সেরা ডিলের জন্য বিশ্বব্যাপী সংযোগ' },
    { icon: Users, title: 'Expert Team', title_bn: 'বিশেষজ্ঞ দল', desc: 'Experienced travel consultants', desc_bn: 'অভিজ্ঞ ভ্রমণ পরামর্শদাতা' }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Explore Holidays</title>
        <meta name="description" content="Learn about Explore Holidays - Bangladesh's premier travel agency with 10+ years of experience serving travelers." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {language === 'bn' 
                ? 'বাংলাদেশের সবচেয়ে বিশ্বস্ত ট্রাভেল এজেন্সি'
                : "Bangladesh's Most Trusted Travel Agency"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className={`py-12 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-500 mb-2">{stat.number}</div>
                <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {language === 'bn' ? stat.label_bn : stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'আমাদের গল্প' : 'Our Story'}
              </h2>
              <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'bn' 
                  ? 'এক্সপ্লোর হলিডেস ২০১৪ সালে প্রতিষ্ঠিত হয়েছিল একটি সহজ মিশন নিয়ে: বাংলাদেশের মানুষদের বিশ্বমানের ভ্রমণ অভিজ্ঞতা প্রদান করা। এক দশকের বেশি সময় ধরে, আমরা হাজার হাজার ভ্রমণকারীকে তাদের স্বপ্নের গন্তব্যে পৌঁছাতে সাহায্য করেছি।'
                  : 'Explore Holidays was founded in 2014 with a simple mission: to provide world-class travel experiences to the people of Bangladesh. For over a decade, we have helped thousands of travelers reach their dream destinations.'}
              </p>
              <p className={`mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'bn' 
                  ? 'আমাদের অভিজ্ঞ দল ফ্লাইট বুকিং, হোটেল রিজার্ভেশন, ভিসা প্রসেসিং এবং কাস্টম ট্যুর প্যাকেজ সহ সম্পূর্ণ ভ্রমণ সমাধান প্রদান করে।'
                  : 'Our experienced team provides complete travel solutions including flight bookings, hotel reservations, visa processing, and custom tour packages.'}
              </p>
              <ul className="space-y-3">
                {['IATA Certified Agency', 'Government Licensed', 'Award Winning Service', 'Best Price Guarantee'].map((item, i) => (
                  <li key={i} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Our Team"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'আমাদের মিশন' : 'Our Mission'}
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {language === 'bn' 
                  ? 'সাশ্রয়ী মূল্যে বিশ্বমানের ভ্রমণ অভিজ্ঞতা প্রদান করা এবং প্রতিটি ভ্রমণকারীর জন্য স্মরণীয় মুহূর্ত তৈরি করা।'
                  : 'To provide world-class travel experiences at affordable prices and create memorable moments for every traveler.'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`p-8 rounded-3xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'আমাদের ভিশন' : 'Our Vision'}
              </h3>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {language === 'bn' 
                  ? 'বাংলাদেশের এক নম্বর ট্রাভেল এজেন্সি হিসেবে পরিচিত হওয়া এবং দক্ষিণ এশিয়ার শীর্ষস্থানীয় ট্রাভেল কোম্পানিতে পরিণত হওয়া।'
                  : 'To be recognized as the #1 travel agency in Bangladesh and become a leading travel company in South Asia.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'আমাদের মূল্যবোধ' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl text-center ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? value.title_bn : value.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'bn' ? value.desc_bn : value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
