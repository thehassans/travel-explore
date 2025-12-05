import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Cookie, Mail, Phone, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const PrivacyPage = () => {
  const { isDark } = useTheme();

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, phone number, address)',
        'Passport and travel document details for bookings',
        'Payment information for transactions',
        'Travel preferences and booking history',
        'Device and browser information for website optimization'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Processing travel bookings and reservations',
        'Communicating about your bookings and inquiries',
        'Sending promotional offers and travel deals (with your consent)',
        'Improving our services and user experience',
        'Complying with legal obligations'
      ]
    },
    {
      icon: Shield,
      title: 'Data Protection',
      content: [
        'We use SSL encryption to protect data transmission',
        'Secure storage with industry-standard security measures',
        'Limited access to personal data on a need-to-know basis',
        'Regular security audits and updates',
        'Compliance with international data protection standards'
      ]
    },
    {
      icon: Lock,
      title: 'Data Sharing',
      content: [
        'Airlines and hotels for booking confirmations',
        'Visa processing authorities as required',
        'Payment processors for secure transactions',
        'We never sell your personal information to third parties',
        'Partners are bound by strict confidentiality agreements'
      ]
    },
    {
      icon: Cookie,
      title: 'Cookies & Tracking',
      content: [
        'We use cookies to improve website functionality',
        'Analytics cookies help us understand user behavior',
        'You can control cookie preferences in your browser',
        'Essential cookies are required for basic functionality',
        'Marketing cookies are optional and consent-based'
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
            <p className="mt-4 text-sm text-white/60">
              Last updated: December 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl ${
              isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow-lg'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Commitment to Privacy
            </h2>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              At Explore Holidays, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. By using our services, you consent to the practices described in this policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-2xl ${
                  isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow-lg'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3 ml-16">
                  {section.content.map((item, i) => (
                    <li 
                      key={i}
                      className={`flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Your Rights */}
      <section className={`py-16 ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Your Rights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Access your personal data',
                'Request correction of inaccurate data',
                'Request deletion of your data',
                'Opt-out of marketing communications',
                'Data portability rights',
                'Lodge a complaint with authorities'
              ].map((right, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    isDark ? 'bg-slate-700' : 'bg-gray-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-green-500" />
                  </div>
                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{right}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-8 rounded-2xl text-center ${
              isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow-lg'
            }`}
          >
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Questions About Privacy?
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              If you have any questions about this Privacy Policy or our data practices, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:privacy@exploreholidays.com"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl"
              >
                <Mail className="w-5 h-5" />
                privacy@exploreholidays.com
              </a>
              <a
                href="tel:+8801234567890"
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border ${
                  isDark ? 'border-slate-600 text-gray-300' : 'border-gray-300 text-gray-700'
                }`}
              >
                <Phone className="w-5 h-5" />
                +880 1234-567890
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
