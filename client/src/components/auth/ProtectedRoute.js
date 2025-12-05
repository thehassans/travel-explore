import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Lock, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const { isDark } = useTheme();
  const { language } = useLanguage();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`max-w-md w-full p-8 rounded-3xl text-center ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-2xl`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
          >
            <Lock className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'লগইন প্রয়োজন' : 'Login Required'}
          </h1>

          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'bn' 
              ? 'এই পেজে অ্যাক্সেস করতে আপনাকে লগইন করতে হবে। আপনার অ্যাকাউন্টে লগইন করুন অথবা নতুন অ্যাকাউন্ট তৈরি করুন।'
              : 'You need to be logged in to access this page. Please login to your account or create a new one.'}
          </p>

          <div className="space-y-3">
            <Link
              to="/login"
              state={{ from: location.pathname }}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <LogIn className="w-5 h-5" />
              {language === 'bn' ? 'লগইন করুন' : 'Login'}
            </Link>

            <Link
              to="/signup"
              state={{ from: location.pathname }}
              className={`flex items-center justify-center gap-2 w-full py-3 px-6 font-semibold rounded-xl transition-all ${
                isDark 
                  ? 'bg-slate-700 text-white hover:bg-slate-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <UserPlus className="w-5 h-5" />
              {language === 'bn' ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}
            </Link>
          </div>

          <p className={`mt-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {language === 'bn' 
              ? 'আপনার তথ্য সুরক্ষিত এবং গোপনীয়'
              : 'Your information is secure and private'}
          </p>
        </motion.div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
