import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const ContactPage = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+880 1234-567890', value2: '+880 9876-543210' },
    { icon: Mail, label: 'Email', value: 'info@exploreholidays.com', value2: 'support@exploreholidays.com' },
    { icon: MapPin, label: 'Address', value: 'House 42, Road 11', value2: 'Banani, Dhaka 1213' },
    { icon: Clock, label: 'Hours', value: 'Sat - Thu: 9AM - 8PM', value2: 'Friday: Closed' }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Explore Holidays</title>
        <meta name="description" content="Get in touch with Explore Holidays. Contact us for bookings, inquiries, and support." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Us'}
            </h1>
            <p className="text-xl text-white/80">
              {language === 'bn' 
                ? 'আমরা আপনার কাছ থেকে শুনতে চাই'
                : "We'd love to hear from you"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'যোগাযোগের তথ্য' : 'Contact Information'}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-start space-x-4 p-4 rounded-xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary-500" />
                      </div>
                      <div>
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.label}</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.value}</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.value2}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className={`font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'bn' ? 'আমাদের অনুসরণ করুন' : 'Follow Us'}
                </h3>
                <div className="flex space-x-3">
                  {[Facebook, Instagram, Twitter].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-slate-800 hover:bg-primary-500' : 'bg-white hover:bg-primary-500'
                      } hover:text-white transition-colors shadow-lg`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className={`p-8 rounded-3xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}
              >
                <h2 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'bn' ? 'মেসেজ পাঠান' : 'Send a Message'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'bn' ? 'আপনার নাম' : 'Your Name'} *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200'
                      } focus:border-primary-500 focus:outline-none transition-colors`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'bn' ? 'ইমেইল' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200'
                      } focus:border-primary-500 focus:outline-none transition-colors`}
                      required
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200'
                      } focus:border-primary-500 focus:outline-none transition-colors`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'bn' ? 'বিষয়' : 'Subject'} *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200'
                      } focus:border-primary-500 focus:outline-none transition-colors`}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {language === 'bn' ? 'আপনার মেসেজ' : 'Your Message'} *
                  </label>
                  <textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200'
                    } focus:border-primary-500 focus:outline-none transition-colors resize-none`}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {language === 'bn' ? 'মেসেজ পাঠান' : 'Send Message'}
                </motion.button>
              </motion.form>
            </div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-3xl overflow-hidden shadow-xl h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5886666666667!2d90.4!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzAwLjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
