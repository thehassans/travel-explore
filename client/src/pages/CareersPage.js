import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, Users, Heart, Plane, Globe, Star, ArrowRight, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const CareersPage = () => {
  const { isDark } = useTheme();

  const benefits = [
    { icon: Heart, title: 'Health Insurance', description: 'Comprehensive health coverage for you and your family' },
    { icon: Plane, title: 'Travel Perks', description: 'Discounted travel packages and free trips annually' },
    { icon: Users, title: 'Team Culture', description: 'Work with passionate travel enthusiasts' },
    { icon: Globe, title: 'Growth Opportunities', description: 'Career development and training programs' },
  ];

  const openPositions = [
    {
      title: 'Senior Travel Consultant',
      department: 'Sales',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      description: 'Help customers plan their dream vacations with expert guidance and personalized recommendations.'
    },
    {
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      description: 'Drive our online presence and create engaging campaigns to reach travel enthusiasts worldwide.'
    },
    {
      title: 'Customer Support Executive',
      department: 'Support',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      description: 'Provide exceptional support to our customers before, during, and after their travels.'
    },
    {
      title: 'Visa Processing Officer',
      department: 'Operations',
      location: 'Dhaka, Bangladesh',
      type: 'Full-time',
      description: 'Handle visa applications and documentation with precision and efficiency.'
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-accent-600" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Build Your Career With Us
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join Bangladesh's leading travel agency and help people explore the world while growing your career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why Work With Us?
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              We offer competitive benefits and a supportive work environment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl text-center ${
                    isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow-lg'
                  }`}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {benefit.title}
                  </h3>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className={`py-20 ${isDark ? 'bg-slate-800/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Open Positions
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Explore our current openings and find your perfect role
            </p>
          </motion.div>

          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${
                  isDark ? 'bg-slate-800 border border-slate-700' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {position.title}
                      </h3>
                      <span className="px-3 py-1 bg-primary-500/10 text-primary-500 text-sm rounded-full">
                        {position.department}
                      </span>
                    </div>
                    <p className={`mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {position.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className={`flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        <MapPin className="w-4 h-4" /> {position.location}
                      </span>
                      <span className={`flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        <Clock className="w-4 h-4" /> {position.type}
                      </span>
                    </div>
                  </div>
                  <motion.a
                    href={`mailto:careers@exploreholidays.com?subject=Application for ${position.title}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl flex items-center gap-2"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-10 rounded-3xl ${
              isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white shadow-xl'
            }`}
          >
            <Mail className="w-16 h-16 mx-auto mb-6 text-primary-500" />
            <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Don't See a Perfect Fit?
            </h2>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:careers@exploreholidays.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
            >
              <Mail className="w-5 h-5" />
              Send Your Resume
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
