import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  Plane,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { isDark, useGradients } = useTheme();
  const { language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>{language === 'bn' ? 'লগইন' : 'Login'} | Explore Holidays</title>
      </Helmet>

      <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${isDark ? 'bg-slate-900' : useGradients ? 'bg-gradient-to-br from-primary-50 via-white to-purple-50' : 'bg-gray-50'}`}>
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-10 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative w-full max-w-md p-8 rounded-3xl shadow-2xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${useGradients ? 'bg-gradient-to-br from-primary-500 to-purple-500' : 'bg-primary-500'}`}
            >
              <Plane className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'bn' ? 'স্বাগতম!' : 'Welcome Back!'}
            </h1>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'bn' ? 'আপনার অ্যাকাউন্টে লগইন করুন' : 'Sign in to your account'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'bn' ? 'ইমেইল' : 'Email'}
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 placeholder-gray-400'
                  } focus:border-primary-500 focus:outline-none transition-colors`}
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 placeholder-gray-400'
                  } focus:border-primary-500 focus:outline-none transition-colors`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`w-full py-4 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 ${
                useGradients ? 'bg-gradient-to-r from-primary-500 to-purple-500' : 'bg-primary-500 hover:bg-primary-600'
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  {language === 'bn' ? 'লগইন করুন' : 'Sign In'}
                </>
              )}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <p className={`mt-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language === 'bn' ? 'অ্যাকাউন্ট নেই?' : "Don't have an account?"}{' '}
            <Link to="/signup" className="text-primary-500 hover:text-primary-600 font-semibold">
              {language === 'bn' ? 'সাইন আপ করুন' : 'Sign Up'}
            </Link>
          </p>

          {/* Decorative */}
          <div className="absolute -bottom-4 -right-4 opacity-10">
            <Sparkles className="w-24 h-24 text-primary-500" />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
