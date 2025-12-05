import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Check, 
  X,
  Plane,
  Heart,
  Briefcase,
  AlertTriangle,
  Phone,
  FileText,
  Clock,
  Globe,
  Users,
  Star,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Mail,
  CheckCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useGradient } from '../context/GradientContext';

const TravelInsurancePage = () => {
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { useGradients } = useGradient();
  const [selectedPlan, setSelectedPlan] = useState('standard');

  const insurancePlans = [
    {
      id: 'basic',
      name: 'Basic',
      name_bn: 'বেসিক',
      price: 500,
      duration: 'per trip',
      color: 'from-green-500 to-emerald-500',
      popular: false,
      coverage: [
        { item: 'Medical Expenses', amount: '৳500,000', included: true },
        { item: 'Trip Cancellation', amount: '৳100,000', included: true },
        { item: 'Lost Baggage', amount: '৳50,000', included: true },
        { item: 'Flight Delay', amount: '৳10,000', included: true },
        { item: 'Emergency Evacuation', amount: '-', included: false },
        { item: 'Adventure Sports', amount: '-', included: false },
        { item: '24/7 Assistance', amount: '-', included: false },
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      name_bn: 'স্ট্যান্ডার্ড',
      price: 1200,
      duration: 'per trip',
      color: 'from-blue-500 to-indigo-500',
      popular: true,
      coverage: [
        { item: 'Medical Expenses', amount: '৳1,500,000', included: true },
        { item: 'Trip Cancellation', amount: '৳300,000', included: true },
        { item: 'Lost Baggage', amount: '৳100,000', included: true },
        { item: 'Flight Delay', amount: '৳25,000', included: true },
        { item: 'Emergency Evacuation', amount: '৳500,000', included: true },
        { item: 'Adventure Sports', amount: '-', included: false },
        { item: '24/7 Assistance', amount: 'Included', included: true },
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      name_bn: 'প্রিমিয়াম',
      price: 2500,
      duration: 'per trip',
      color: 'from-purple-500 to-pink-500',
      popular: false,
      coverage: [
        { item: 'Medical Expenses', amount: '৳5,000,000', included: true },
        { item: 'Trip Cancellation', amount: '৳500,000', included: true },
        { item: 'Lost Baggage', amount: '৳200,000', included: true },
        { item: 'Flight Delay', amount: '৳50,000', included: true },
        { item: 'Emergency Evacuation', amount: 'Unlimited', included: true },
        { item: 'Adventure Sports', amount: 'Included', included: true },
        { item: '24/7 Assistance', amount: 'Priority', included: true },
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Medical Coverage',
      title_bn: 'চিকিৎসা কভারেজ',
      description: 'Comprehensive medical expense coverage worldwide',
      description_bn: 'বিশ্বব্যাপী ব্যাপক চিকিৎসা খরচ কভারেজ'
    },
    {
      icon: Plane,
      title: 'Trip Protection',
      title_bn: 'ট্রিপ প্রোটেকশন',
      description: 'Coverage for cancellation, delays and interruptions',
      description_bn: 'বাতিল, বিলম্ব এবং বাধার জন্য কভারেজ'
    },
    {
      icon: Briefcase,
      title: 'Baggage Protection',
      title_bn: 'ব্যাগেজ প্রোটেকশন',
      description: 'Lost, stolen or damaged baggage compensation',
      description_bn: 'হারানো, চুরি বা ক্ষতিগ্রস্ত ব্যাগেজের ক্ষতিপূরণ'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Evacuation',
      title_bn: 'জরুরি সরিয়ে নেওয়া',
      description: 'Emergency medical evacuation and repatriation',
      description_bn: 'জরুরি চিকিৎসা সরিয়ে নেওয়া এবং প্রত্যাবর্তন'
    },
    {
      icon: Phone,
      title: '24/7 Assistance',
      title_bn: '২৪/৭ সহায়তা',
      description: 'Round the clock global assistance hotline',
      description_bn: 'সার্বক্ষণিক বিশ্বব্যাপী সহায়তা হটলাইন'
    },
    {
      icon: FileText,
      title: 'Easy Claims',
      title_bn: 'সহজ দাবি',
      description: 'Simple and fast claims processing',
      description_bn: 'সহজ এবং দ্রুত দাবি প্রক্রিয়াকরণ'
    }
  ];

  const faqs = [
    {
      q: 'What does travel insurance cover?',
      q_bn: 'ভ্রমণ বীমা কী কভার করে?',
      a: 'Our travel insurance covers medical expenses, trip cancellation, lost baggage, flight delays, emergency evacuation, and more depending on your plan.',
      a_bn: 'আমাদের ভ্রমণ বীমা চিকিৎসা খরচ, ট্রিপ বাতিল, হারানো ব্যাগেজ, ফ্লাইট বিলম্ব, জরুরি সরিয়ে নেওয়া এবং আপনার প্ল্যান অনুযায়ী আরও অনেক কিছু কভার করে।'
    },
    {
      q: 'When should I buy travel insurance?',
      q_bn: 'কখন ভ্রমণ বীমা কিনব?',
      a: 'We recommend purchasing travel insurance as soon as you book your trip to ensure maximum coverage for trip cancellation benefits.',
      a_bn: 'ট্রিপ বাতিল সুবিধার জন্য সর্বাধিক কভারেজ নিশ্চিত করতে আপনার ট্রিপ বুক করার সাথে সাথেই ভ্রমণ বীমা কেনার পরামর্শ দিই।'
    },
    {
      q: 'How do I file a claim?',
      q_bn: 'কীভাবে দাবি করব?',
      a: 'You can file a claim through our online portal or by contacting our 24/7 assistance hotline. Keep all receipts and documentation.',
      a_bn: 'আপনি আমাদের অনলাইন পোর্টালের মাধ্যমে বা আমাদের ২৪/৭ সহায়তা হটলাইনে যোগাযোগ করে দাবি করতে পারেন। সমস্ত রসিদ এবং ডকুমেন্টেশন রাখুন।'
    }
  ];

  return (
    <>
      <Helmet>
        <title>{language === 'bn' ? 'ভ্রমণ বীমা' : 'Travel Insurance'} | Explore Holidays</title>
      </Helmet>

      <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-gray-50'}`}>
        {/* Hero Section */}
        <section className={`relative pt-24 pb-32 overflow-hidden ${
          isDark 
            ? 'bg-slate-900' 
            : useGradients 
              ? 'bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700'
              : 'bg-slate-900'
        }`}>
          {useGradients && (
            <div className="absolute inset-0">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl" />
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
                <Shield className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                {language === 'bn' ? 'ভ্রমণ বীমা' : 'Travel Insurance'}
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                {language === 'bn' 
                  ? 'আপনার ভ্রমণকে সুরক্ষিত করুন ব্যাপক কভারেজের সাথে। নিশ্চিন্তে ভ্রমণ করুন।'
                  : 'Protect your journey with comprehensive coverage. Travel with peace of mind.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{language === 'bn' ? 'তাৎক্ষণিক কভারেজ' : 'Instant Coverage'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{language === 'bn' ? 'বিশ্বব্যাপী' : 'Worldwide'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>{language === 'bn' ? '২৪/৭ সহায়তা' : '24/7 Support'}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 -mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl ${
                    isDark ? 'bg-slate-800' : 'bg-white shadow-xl'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    useGradients 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                      : 'bg-slate-900'
                  }`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? benefit.title_bn : benefit.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'bn' ? benefit.description_bn : benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className={`py-20 ${isDark ? 'bg-slate-900/50' : useGradients ? 'bg-gradient-to-b from-gray-50 to-white' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                useGradients 
                  ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600'
                  : 'bg-slate-900 text-white'
              }`}>
                <Sparkles className="w-4 h-4 mr-2" />
                {language === 'bn' ? 'প্ল্যান সমূহ' : 'Insurance Plans'}
              </span>
              <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'আপনার জন্য সঠিক প্ল্যান বেছে নিন' : 'Choose the Right Plan for You'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insurancePlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`relative rounded-3xl overflow-hidden ${
                    plan.popular 
                      ? useGradients 
                        ? 'ring-2 ring-blue-500 shadow-xl shadow-blue-500/20'
                        : 'ring-2 ring-slate-900'
                      : ''
                  } ${isDark ? 'bg-slate-800' : 'bg-white shadow-xl'}`}
                >
                  {plan.popular && (
                    <div className={`absolute top-0 left-0 right-0 py-2 text-center text-sm font-bold text-white ${
                      useGradients ? `bg-gradient-to-r ${plan.color}` : 'bg-slate-900'
                    }`}>
                      {language === 'bn' ? 'সবচেয়ে জনপ্রিয়' : 'Most Popular'}
                    </div>
                  )}
                  
                  <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                    <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'bn' ? plan.name_bn : plan.name}
                    </h3>
                    <div className="flex items-baseline mb-6">
                      <span className={`text-4xl font-black ${
                        useGradients 
                          ? `bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`
                          : isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {formatCurrency(plan.price)}
                      </span>
                      <span className={`ml-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        /{plan.duration}
                      </span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.coverage.map((item, i) => (
                        <li key={i} className="flex items-center justify-between">
                          <div className="flex items-center">
                            {item.included ? (
                              <Check className="w-5 h-5 text-green-500 mr-2" />
                            ) : (
                              <X className="w-5 h-5 text-gray-400 mr-2" />
                            )}
                            <span className={`text-sm ${
                              item.included 
                                ? isDark ? 'text-gray-300' : 'text-gray-700'
                                : isDark ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                              {item.item}
                            </span>
                          </div>
                          <span className={`text-sm font-medium ${
                            item.included 
                              ? useGradients ? 'text-green-500' : isDark ? 'text-white' : 'text-slate-900'
                              : isDark ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {item.amount}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-xl font-bold transition-all ${
                        plan.popular
                          ? useGradients
                            ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg`
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                          : isDark
                            ? 'bg-slate-700 text-white hover:bg-slate-600'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {language === 'bn' ? 'এখনই কিনুন' : 'Buy Now'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'সচরাচর জিজ্ঞাসা' : 'Frequently Asked Questions'}
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white shadow-lg'}`}
                >
                  <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? faq.q_bn : faq.q}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {language === 'bn' ? faq.a_bn : faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-20 ${
          useGradients 
            ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600'
            : 'bg-slate-900'
        }`}>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
              {language === 'bn' ? 'সাহায্য দরকার?' : 'Need Help?'}
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              {language === 'bn' 
                ? 'আমাদের বিশেষজ্ঞরা আপনাকে সঠিক বীমা প্ল্যান বেছে নিতে সাহায্য করবে'
                : 'Our experts will help you choose the right insurance plan'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+8801234567890"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                +880 1234-567890
              </motion.a>
              <motion.a
                href="mailto:insurance@exploreholidays.com"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                <Mail className="w-5 h-5" />
                insurance@exploreholidays.com
              </motion.a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TravelInsurancePage;
