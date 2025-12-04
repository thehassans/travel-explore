import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FileCheck, 
  Clock, 
  CheckCircle, 
  Globe,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const VisasPage = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState(null);

  const visaData = [
    { 
      country: 'UAE', 
      flag: '🇦🇪',
      processing: '3-5 days', 
      price: 8000, 
      requirements: ['Valid Passport', 'Passport Photo', 'Bank Statement', 'Hotel Booking'],
      requirements_bn: ['বৈধ পাসপোর্ট', 'পাসপোর্ট ফটো', 'ব্যাংক স্টেটমেন্ট', 'হোটেল বুকিং']
    },
    { 
      country: 'Singapore', 
      flag: '🇸🇬',
      processing: '5-7 days', 
      price: 5000, 
      requirements: ['Valid Passport', 'Photo', 'Hotel Booking', 'Return Ticket'],
      requirements_bn: ['বৈধ পাসপোর্ট', 'ফটো', 'হোটেল বুকিং', 'রিটার্ন টিকেট']
    },
    { 
      country: 'Thailand', 
      flag: '🇹🇭',
      processing: 'On Arrival', 
      price: 3500, 
      requirements: ['Valid Passport', 'Photo', 'Return Ticket', 'Hotel Booking'],
      requirements_bn: ['বৈধ পাসপোর্ট', 'ফটো', 'রিটার্ন টিকেট', 'হোটেল বুকিং']
    },
    { 
      country: 'Malaysia', 
      flag: '🇲🇾',
      processing: '3-5 days', 
      price: 4500, 
      requirements: ['Valid Passport', 'Photo', 'Bank Statement', 'Employment Letter'],
      requirements_bn: ['বৈধ পাসপোর্ট', 'ফটো', 'ব্যাংক স্টেটমেন্ট', 'কর্মসংস্থান পত্র']
    },
    { 
      country: 'India', 
      flag: '🇮🇳',
      processing: '2-3 days', 
      price: 2500, 
      requirements: ['Valid Passport', 'Photo', 'Application Form'],
      requirements_bn: ['বৈধ পাসপোর্ট', 'ফটো', 'আবেদন ফর্ম']
    },
    { 
      country: 'UK', 
      flag: '🇬🇧',
      processing: '15-20 days', 
      price: 15000, 
      requirements: ['Valid Passport', 'Photo', 'Financial Documents', 'Travel Insurance', 'Itinerary'],
      requirements_bn: ['বৈধ পাসপোর্ট', 'ফটো', 'আর্থিক নথি', 'ভ্রমণ বীমা', 'ভ্রমণসূচী']
    },
    { 
      country: 'USA', 
      flag: '🇺🇸',
      processing: 'Interview Based', 
      price: 18000, 
      requirements: ['Valid Passport', 'Photo', 'DS-160 Form', 'Interview', 'Financial Documents'],
      requirements_bn: ['বৈধ পাসপোর্ট', 'ফটো', 'ডিএস-১৬০ ফর্ম', 'সাক্ষাৎকার', 'আর্থিক নথি']
    },
    { 
      country: 'Schengen', 
      flag: '🇪🇺',
      processing: '10-15 days', 
      price: 12000, 
      requirements: ['Valid Passport', 'Photo', 'Travel Insurance', 'Itinerary', 'Hotel Booking'],
      requirements_bn: ['বৈধ পাসপোর্ট', 'ফটো', 'ভ্রমণ বীমা', 'ভ্রমণসূচী', 'হোটেল বুকিং']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Visa Services | Explore Holidays</title>
        <meta name="description" content="Professional visa processing services for all countries from Bangladesh. Fast, reliable, and hassle-free." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-purple-600 via-violet-500 to-indigo-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FileCheck className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {language === 'bn' ? 'ভিসা সেবা' : 'Visa Services'}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              {language === 'bn' 
                ? 'সব দেশের জন্য ঝামেলামুক্ত ভিসা প্রসেসিং। আমাদের বিশেষজ্ঞ দল আপনার জন্য কাজ করবে।'
                : 'Hassle-free visa processing for all countries. Our expert team handles everything for you.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Visa Cards */}
      <section className={`py-16 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visaData.map((visa, index) => (
              <motion.div
                key={visa.country}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedCountry(selectedCountry === visa.country ? null : visa.country)}
                className={`p-6 rounded-2xl cursor-pointer transition-all ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:shadow-xl'
                } ${selectedCountry === visa.country ? 'ring-2 ring-primary-500' : ''} shadow-lg`}
              >
                <div className="text-4xl mb-4">{visa.flag}</div>
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {visa.country}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-primary-500" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {visa.processing}
                  </span>
                </div>

                <div className="mb-4">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'bn' ? 'প্রসেসিং ফি' : 'Processing Fee'}
                  </span>
                  <p className="text-2xl font-bold text-primary-500">
                    {formatCurrency(visa.price)}
                  </p>
                </div>

                {/* Expanded Requirements */}
                {selectedCountry === visa.country && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600"
                  >
                    <p className={`font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'bn' ? 'প্রয়োজনীয় ডকুমেন্ট:' : 'Required Documents:'}
                    </p>
                    <ul className="space-y-2">
                      {(language === 'bn' ? visa.requirements_bn : visa.requirements).map((req, i) => (
                        <li key={i} className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <button className="w-full mt-4 py-3 bg-primary-500/10 text-primary-500 font-medium rounded-xl hover:bg-primary-500 hover:text-white transition-all flex items-center justify-center">
                  {language === 'bn' ? 'আবেদন করুন' : 'Apply Now'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className={`py-16 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'ভিসা প্রসেস' : 'Visa Process'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Submit Documents', title_bn: 'ডকুমেন্ট জমা দিন', icon: '📄' },
              { step: 2, title: 'Verification', title_bn: 'যাচাইকরণ', icon: '✅' },
              { step: 3, title: 'Processing', title_bn: 'প্রসেসিং', icon: '⏳' },
              { step: 4, title: 'Visa Ready', title_bn: 'ভিসা প্রস্তুত', icon: '🎉' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'bn' ? item.title_bn : item.title}
                </h3>
                {index < 3 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-slate-600 -z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default VisasPage;
