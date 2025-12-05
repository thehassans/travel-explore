import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  ChevronRight,
  Ticket,
  Globe,
  Package,
  Filter,
  Search,
  RefreshCw,
  FileText,
  CreditCard,
  Star,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useGradient } from '../context/GradientContext';

const MyBookingsPage = () => {
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const { bookings, cancelBooking, loading } = useBooking();
  const { useGradients } = useGradient();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/my-bookings' } });
    }
  }, [isAuthenticated, navigate]);

  const tabs = [
    { id: 'all', label: language === 'bn' ? 'সব বুকিং' : 'All Bookings', icon: Package },
    { id: 'flight', label: language === 'bn' ? 'ফ্লাইট' : 'Flights', icon: Plane },
    { id: 'package', label: language === 'bn' ? 'প্যাকেজ' : 'Packages', icon: Globe },
    { id: 'visa', label: language === 'bn' ? 'ভিসা' : 'Visas', icon: FileText },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-500 bg-green-500/10';
      case 'pending': return 'text-amber-500 bg-amber-500/10';
      case 'cancelled': return 'text-red-500 bg-red-500/10';
      case 'completed': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return Clock;
      case 'cancelled': return XCircle;
      case 'completed': return CheckCircle;
      default: return AlertCircle;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'flight': return Plane;
      case 'package': return Globe;
      case 'visa': return FileText;
      default: return Package;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'flight': return useGradients ? 'from-blue-500 to-cyan-500' : 'bg-slate-900';
      case 'package': return useGradients ? 'from-purple-500 to-pink-500' : 'bg-slate-800';
      case 'visa': return useGradients ? 'from-green-500 to-emerald-500' : 'bg-slate-700';
      default: return useGradients ? 'from-gray-500 to-slate-500' : 'bg-slate-600';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.type === activeTab;
    const matchesSearch = searchQuery === '' || 
      booking.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.destination?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleCancelBooking = (bookingId) => {
    setCancellingId(bookingId);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (cancellingId) {
      cancelBooking(cancellingId);
      setShowCancelModal(false);
      setCancellingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Empty state
  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center ${
        useGradients ? 'bg-gradient-to-br from-primary-500/20 to-purple-500/20' : 'bg-slate-100'
      }`}>
        <Package className={`w-12 h-12 ${useGradients ? 'text-primary-500' : 'text-slate-400'}`} />
      </div>
      <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {language === 'bn' ? 'কোনো বুকিং নেই' : 'No Bookings Yet'}
      </h3>
      <p className={`mb-8 max-w-md mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {language === 'bn' 
          ? 'আপনার এখনো কোনো বুকিং নেই। আমাদের আকর্ষণীয় প্যাকেজগুলো দেখুন!'
          : "You haven't made any bookings yet. Explore our amazing travel packages!"}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/flights"
          className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
            useGradients 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          <Plane className="w-5 h-5 mr-2" />
          {language === 'bn' ? 'ফ্লাইট খুঁজুন' : 'Search Flights'}
        </Link>
        <Link
          to="/holidays"
          className={`inline-flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
            useGradients 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30'
              : 'bg-slate-800 text-white hover:bg-slate-700'
          }`}
        >
          <Globe className="w-5 h-5 mr-2" />
          {language === 'bn' ? 'প্যাকেজ দেখুন' : 'View Packages'}
        </Link>
      </div>
    </motion.div>
  );

  // Booking Card Component
  const BookingCard = ({ booking, index }) => {
    const TypeIcon = getTypeIcon(booking.type);
    const StatusIcon = getStatusIcon(booking.status);
    const typeColor = getTypeColor(booking.type);
    const statusColor = getStatusColor(booking.status);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -4 }}
        className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
          isDark 
            ? 'bg-slate-800/80 border border-slate-700/50 hover:border-slate-600' 
            : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl'
        }`}
      >
        {/* Type Badge */}
        <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 ${
          useGradients ? `bg-gradient-to-r ${typeColor}` : typeColor
        }`}>
          <TypeIcon className="w-3.5 h-3.5" />
          {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
        </div>

        {/* Image/Header */}
        <div className="relative h-40 overflow-hidden">
          {booking.image ? (
            <img 
              src={booking.image} 
              alt={booking.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${
              useGradients ? `bg-gradient-to-br ${typeColor}` : 'bg-slate-200'
            }`}>
              <TypeIcon className="w-16 h-16 text-white/50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Booking ID */}
          <div className="absolute bottom-3 left-4 text-white">
            <span className="text-xs opacity-70">Booking ID:</span>
            <p className="font-mono font-bold text-sm">{booking.id}</p>
          </div>

          {/* Status Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${statusColor}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className={`font-bold text-lg mb-2 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {booking.title}
          </h3>

          {/* Details */}
          <div className="space-y-2 mb-4">
            {booking.destination && (
              <div className="flex items-center text-sm">
                <MapPin className={`w-4 h-4 mr-2 ${useGradients ? 'text-primary-500' : 'text-slate-500'}`} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{booking.destination}</span>
              </div>
            )}
            {booking.date && (
              <div className="flex items-center text-sm">
                <Calendar className={`w-4 h-4 mr-2 ${useGradients ? 'text-secondary-500' : 'text-slate-500'}`} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{formatDate(booking.date)}</span>
              </div>
            )}
            {booking.travelers && (
              <div className="flex items-center text-sm">
                <Users className={`w-4 h-4 mr-2 ${useGradients ? 'text-cyan-500' : 'text-slate-500'}`} />
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {booking.travelers} {language === 'bn' ? 'জন' : 'Travelers'}
                </span>
              </div>
            )}
          </div>

          {/* Price & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
            <div>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {language === 'bn' ? 'মোট মূল্য' : 'Total'}
              </span>
              <p className={`text-xl font-black ${
                useGradients 
                  ? 'bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent'
                  : isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {formatCurrency(booking.amount || 0)}
              </p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedBooking(booking)}
                className={`p-2.5 rounded-xl transition-colors ${
                  isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <Eye className="w-5 h-5" />
              </motion.button>
              {booking.status === 'confirmed' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCancelBooking(booking.id)}
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{language === 'bn' ? 'আমার বুকিংসমূহ' : 'My Bookings'} | Explore Holidays</title>
      </Helmet>

      <div className={`min-h-screen pt-20 ${
        isDark 
          ? 'bg-slate-950' 
          : useGradients 
            ? 'bg-gradient-to-b from-gray-50 to-white' 
            : 'bg-slate-50'
      }`}>
        {/* Hero Section */}
        <section className={`relative py-16 overflow-hidden ${
          isDark 
            ? 'bg-slate-900' 
            : useGradients 
              ? 'bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600'
              : 'bg-slate-900'
        }`}>
          {useGradients && (
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full blur-3xl" />
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
                  useGradients 
                    ? 'bg-white/20 backdrop-blur-sm' 
                    : 'bg-white/10'
                }`}
              >
                <Ticket className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                {language === 'bn' ? 'আমার বুকিংসমূহ' : 'My Bookings'}
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                {language === 'bn' 
                  ? 'আপনার সকল ফ্লাইট, প্যাকেজ এবং ভিসা বুকিং এক জায়গায় দেখুন'
                  : 'View and manage all your flight, package, and visa bookings in one place'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters & Search */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Tabs */}
              <div className={`flex flex-wrap gap-2 p-1.5 rounded-2xl ${
                isDark ? 'bg-slate-800' : 'bg-gray-100'
              }`}>
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                        activeTab === tab.id
                          ? useGradients
                            ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg'
                            : 'bg-slate-900 text-white shadow-lg'
                          : isDark
                            ? 'text-gray-400 hover:text-white hover:bg-slate-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Search */}
              <div className="flex-1 lg:max-w-md">
                <div className={`relative rounded-xl overflow-hidden ${
                  isDark ? 'bg-slate-800' : 'bg-white border border-gray-200'
                }`}>
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder={language === 'bn' ? 'বুকিং খুঁজুন...' : 'Search bookings...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none ${
                      isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total', value: bookings.length, icon: Package, color: 'primary' },
                { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: CheckCircle, color: 'green' },
                { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: Clock, color: 'amber' },
                { label: 'Completed', value: bookings.filter(b => b.status === 'completed').length, icon: Star, color: 'blue' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-2xl ${
                      isDark ? 'bg-slate-800/80' : 'bg-white border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 text-${stat.color}-500`} />
                      <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </span>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Bookings Grid */}
            {loading ? (
              <div className="flex justify-center py-20">
                <RefreshCw className={`w-8 h-8 animate-spin ${useGradients ? 'text-primary-500' : 'text-slate-500'}`} />
              </div>
            ) : filteredBookings.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookings.map((booking, index) => (
                  <BookingCard key={booking.id} booking={booking} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Booking Detail Modal */}
        <AnimatePresence>
          {selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBooking(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl ${
                  isDark ? 'bg-slate-800' : 'bg-white'
                }`}
              >
                {/* Modal Header */}
                <div className={`relative h-48 ${
                  useGradients 
                    ? `bg-gradient-to-br ${getTypeColor(selectedBooking.type)}`
                    : 'bg-slate-900'
                }`}>
                  {selectedBooking.image && (
                    <img 
                      src={selectedBooking.image} 
                      alt={selectedBooking.title}
                      className="w-full h-full object-cover opacity-30"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <span className="text-white/70 text-sm mb-1">Booking ID: {selectedBooking.id}</span>
                    <h2 className="text-2xl font-bold text-white">{selectedBooking.title}</h2>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Status</span>
                      <p className={`font-bold capitalize ${getStatusColor(selectedBooking.status).split(' ')[0]}`}>
                        {selectedBooking.status}
                      </p>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Type</span>
                      <p className={`font-bold capitalize ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {selectedBooking.type}
                      </p>
                    </div>
                    {selectedBooking.destination && (
                      <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Destination</span>
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {selectedBooking.destination}
                        </p>
                      </div>
                    )}
                    {selectedBooking.date && (
                      <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Date</span>
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {formatDate(selectedBooking.date)}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Amount</span>
                    <p className={`text-3xl font-black ${
                      useGradients 
                        ? 'bg-gradient-to-r from-primary-500 to-purple-500 bg-clip-text text-transparent'
                        : isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {formatCurrency(selectedBooking.amount || 0)}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                        isDark 
                          ? 'bg-slate-700 text-white hover:bg-slate-600'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {language === 'bn' ? 'বন্ধ করুন' : 'Close'}
                    </button>
                    <button
                      className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
                        useGradients 
                          ? 'bg-gradient-to-r from-primary-500 to-purple-500 hover:shadow-lg hover:shadow-primary-500/30'
                          : 'bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      <Download className="w-5 h-5 inline mr-2" />
                      {language === 'bn' ? 'ডাউনলোড' : 'Download'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cancel Confirmation Modal */}
        <AnimatePresence>
          {showCancelModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCancelModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md p-6 rounded-3xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className={`text-xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'bn' ? 'বুকিং বাতিল করবেন?' : 'Cancel Booking?'}
                </h3>
                <p className={`text-center mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'bn' 
                    ? 'এই বুকিং বাতিল করলে পুনরায় সক্রিয় করা যাবে না।'
                    : 'This action cannot be undone. Your booking will be permanently cancelled.'}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                      isDark 
                        ? 'bg-slate-700 text-white hover:bg-slate-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {language === 'bn' ? 'না' : 'No, Keep It'}
                  </button>
                  <button
                    onClick={confirmCancel}
                    className="flex-1 py-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    {language === 'bn' ? 'হ্যাঁ, বাতিল করুন' : 'Yes, Cancel'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MyBookingsPage;
