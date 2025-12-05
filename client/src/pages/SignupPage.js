import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus,
  User,
  Plane,
  Sparkles,
  Check,
  Phone
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useGradient } from '../context/GradientContext';

const SignupPage = () => {
  const { isDark } = useTheme();
  const { language } = useLanguage();
  const { signup } = useAuth();
  const { useGradients, premium } = useGradient();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { text: 'At least 6 characters', met: formData.password.length >= 6 },
    { text: 'Contains a number', met: /\d/.test(formData.password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'bn' ? 'পাসওয়ার্ড মিলছে না' : 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError(language === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    const result = await signup(formData.name, formData.email, formData.password, formData.phone);
    
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
        <title>{language === 'bn' ? 'সাইন আপ' : 'Sign Up'} | Explore Holidays</title>
      </Helmet>

      <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${
        isDark 
          ? 'bg-slate-950' 
          : useGradients 
            ? 'bg-gradient-to-br from-primary-50 via-white to-purple-50' 
            : 'bg-slate-50'
      }`}>
        {/* Background Decorations - only show with gradients */}
        {useGradients && (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute bottom-20 left-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"
            />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative w-full max-w-md p-8 ${
            useGradients 
              ? 'rounded-3xl shadow-2xl' 
              : 'rounded-2xl shadow-lg border-2'
          } ${
            isDark 
              ? 'bg-slate-900 border-slate-800' 
              : useGradients 
                ? 'bg-white' 
                : 'bg-white border-slate-200'
          }`}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center ${
                useGradients 
                  ? 'rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg' 
                  : 'rounded-xl bg-slate-900 shadow-md'
              }`}
            >
              <Plane className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className={`text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : useGradients ? 'text-gray-900' : 'text-slate-900'
            }`}>
              {language === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}
            </h1>
            <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {language === 'bn' ? 'আপনার ভ্রমণ শুরু করুন' : 'Start your journey today'}
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

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'bn' ? 'পুরো নাম' : 'Full Name'}
              </label>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'bn' ? 'আপনার নাম' : 'Your full name'}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 ${
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
                {language === 'bn' ? 'ইমেইল' : 'Email'}
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 ${
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
                {language === 'bn' ? 'ফোন নম্বর' : 'Phone Number'}
              </label>
              <div className="relative">
                <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 1XXX-XXXXXX"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 ${
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
                  className={`w-full pl-12 pr-12 py-3.5 rounded-2xl border-2 ${
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
              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className={`flex items-center gap-2 text-xs ${req.met ? 'text-green-500' : isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      <Check className={`w-3 h-3 ${req.met ? 'opacity-100' : 'opacity-30'}`} />
                      {req.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {language === 'bn' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password'}
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-500' 
                      : 'bg-gray-50 border-gray-200 placeholder-gray-400'
                  } focus:border-primary-500 focus:outline-none transition-colors`}
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className={`w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-6 ${
                useGradients 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  {language === 'bn' ? 'সাইন আপ করুন' : 'Create Account'}
                </>
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <p className={`mt-8 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {language === 'bn' ? 'অ্যাকাউন্ট আছে?' : 'Already have an account?'}{' '}
            <Link 
              to="/login" 
              className={`font-semibold ${
                useGradients 
                  ? 'text-primary-500 hover:text-primary-600' 
                  : 'text-slate-900 hover:text-slate-700 underline underline-offset-2'
              }`}
            >
              {language === 'bn' ? 'লগইন করুন' : 'Sign In'}
            </Link>
          </p>

          {/* Decorative */}
          <div className="absolute -bottom-4 -left-4 opacity-10">
            <Sparkles className="w-24 h-24 text-purple-500" />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignupPage;
