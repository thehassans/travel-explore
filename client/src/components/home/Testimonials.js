import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Testimonials = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Rashid Ahmed',
      name_bn: 'রশিদ আহমেদ',
      role: 'Business Traveler',
      role_bn: 'ব্যবসায়িক ভ্রমণকারী',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 5,
      review: 'Exceptional service! Explore Holidays made my Dubai business trip seamless. Highly recommended for corporate travel.',
      review_bn: 'অসাধারণ সেবা! এক্সপ্লোর হলিডেস আমার দুবাই ব্যবসায়িক ট্রিপ নির্বিঘ্ন করেছে। কর্পোরেট ভ্রমণের জন্য অত্যন্ত সুপারিশকৃত।'
    },
    {
      id: 2,
      name: 'Fatima Khan',
      name_bn: 'ফাতিমা খান',
      role: 'Family Vacation',
      role_bn: 'পারিবারিক ছুটি',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 5,
      review: 'Our family trip to Maldives was absolutely magical. The team took care of every detail. Best travel agency in Bangladesh!',
      review_bn: 'মালদ্বীপে আমাদের পারিবারিক ট্রিপ একেবারে জাদুকরী ছিল। টিম প্রতিটি বিস্তারিত যত্ন নিয়েছে। বাংলাদেশের সেরা ট্রাভেল এজেন্সি!'
    },
    {
      id: 3,
      name: 'Mohammad Hasan',
      name_bn: 'মোহাম্মদ হাসান',
      role: 'Adventure Seeker',
      role_bn: 'অ্যাডভেঞ্চার সন্ধানী',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      rating: 5,
      review: 'From visa processing to hotel booking, everything was perfect. The Thailand package exceeded all my expectations!',
      review_bn: 'ভিসা প্রসেসিং থেকে হোটেল বুকিং পর্যন্ত, সবকিছু নিখুঁত ছিল। থাইল্যান্ড প্যাকেজ আমার সমস্ত প্রত্যাশা ছাড়িয়ে গেছে!'
    },
    {
      id: 4,
      name: 'Nusrat Jahan',
      name_bn: 'নুসরাত জাহান',
      role: 'Honeymoon Trip',
      role_bn: 'হানিমুন ট্রিপ',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      rating: 5,
      review: 'Our honeymoon in Singapore was unforgettable thanks to Explore Holidays. The attention to detail was impressive!',
      review_bn: 'এক্সপ্লোর হলিডেসের কারণে সিঙ্গাপুরে আমাদের হানিমুন অবিস্মরণীয় ছিল। বিস্তারিত মনোযোগ চিত্তাকর্ষক ছিল!'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className={`py-20 ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'আমাদের সুখী ভ্রমণকারীরা' : 'Our Happy Travelers'}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'bn' 
              ? 'আমাদের গ্রাহকরা যা বলছেন তা দেখুন'
              : 'See what our customers have to say about their experience'}
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`p-8 lg:p-12 rounded-3xl ${
                isDark ? 'bg-slate-900' : 'bg-white'
              } shadow-xl`}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className={`w-20 h-20 ${isDark ? 'text-primary-500' : 'text-primary-400'}`} />
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={language === 'bn' ? testimonials[currentIndex].name_bn : testimonials[currentIndex].name}
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                      <Quote className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Rating */}
                  <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Review */}
                  <p className={`text-lg lg:text-xl leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    "{language === 'bn' ? testimonials[currentIndex].review_bn : testimonials[currentIndex].review}"
                  </p>

                  {/* Author */}
                  <div>
                    <h4 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'bn' ? testimonials[currentIndex].name_bn : testimonials[currentIndex].name}
                    </h4>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {language === 'bn' ? testimonials[currentIndex].role_bn : testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-500 w-8'
                      : isDark
                        ? 'bg-slate-600 hover:bg-slate-500'
                        : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
