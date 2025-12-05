import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  CreditCard,
  FileText,
  ArrowRight,
  Download,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const AdminFlightBookings = () => {
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    setLoading(true);
    // Load from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('flightBookings') || '[]');
    setBookings(savedBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    setLoading(false);
  };

  const updateBookingStatus = (bookingId, status) => {
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status, updatedAt: new Date().toISOString() } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('flightBookings', JSON.stringify(updatedBookings));
    setSelectedBooking(null);
  };

  const deleteBooking = (bookingId) => {
    if (window.confirm(language === 'bn' ? 'আপনি কি এই বুকিং মুছে ফেলতে চান?' : 'Are you sure you want to delete this booking?')) {
      const updatedBookings = bookings.filter(b => b.id !== bookingId);
      setBookings(updatedBookings);
      localStorage.setItem('flightBookings', JSON.stringify(updatedBookings));
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.contactDetails?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.contactDetails?.phone?.includes(searchTerm) ||
      booking.passengers?.some(p => 
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: {
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-700 dark:text-yellow-300',
        icon: Clock,
        label: language === 'bn' ? 'পেন্ডিং' : 'Pending'
      },
      approved: {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-300',
        icon: CheckCircle,
        label: language === 'bn' ? 'অনুমোদিত' : 'Approved'
      },
      declined: {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-300',
        icon: XCircle,
        label: language === 'bn' ? 'প্রত্যাখ্যাত' : 'Declined'
      }
    };
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        <Icon className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    approved: bookings.filter(b => b.status === 'approved').length,
    declined: bookings.filter(b => b.status === 'declined').length,
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className={`text-2xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              {language === 'bn' ? 'ফ্লাইট বুকিংস' : 'Flight Bookings'}
            </h1>
            <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'bn' ? 'সব ফ্লাইট বুকিং অনুরোধ পরিচালনা করুন' : 'Manage all flight booking requests'}
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={loadBookings}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            {language === 'bn' ? 'রিফ্রেশ' : 'Refresh'}
          </motion.button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: language === 'bn' ? 'মোট বুকিং' : 'Total Bookings', value: stats.total, color: 'from-blue-500 to-cyan-500', icon: FileText },
            { label: language === 'bn' ? 'পেন্ডিং' : 'Pending', value: stats.pending, color: 'from-yellow-500 to-orange-500', icon: Clock },
            { label: language === 'bn' ? 'অনুমোদিত' : 'Approved', value: stats.approved, color: 'from-green-500 to-emerald-500', icon: CheckCircle },
            { label: language === 'bn' ? 'প্রত্যাখ্যাত' : 'Declined', value: stats.declined, color: 'from-red-500 to-pink-500', icon: XCircle },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className={`p-4 rounded-2xl mb-6 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'বুকিং আইডি, ইমেইল, ফোন দিয়ে খুঁজুন...' : 'Search by ID, email, phone...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:border-primary-500 transition-colors`}
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-4 py-3 rounded-xl border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:border-primary-500 transition-colors`}
              >
                <option value="all">{language === 'bn' ? 'সব অবস্থা' : 'All Status'}</option>
                <option value="pending">{language === 'bn' ? 'পেন্ডিং' : 'Pending'}</option>
                <option value="approved">{language === 'bn' ? 'অনুমোদিত' : 'Approved'}</option>
                <option value="declined">{language === 'bn' ? 'প্রত্যাখ্যাত' : 'Declined'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className={`rounded-2xl overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
              </p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-8 text-center">
              <Plane className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {language === 'bn' ? 'কোনো বুকিং পাওয়া যায়নি' : 'No bookings found'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={isDark ? 'bg-slate-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'bn' ? 'বুকিং আইডি' : 'Booking ID'}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'bn' ? 'ফ্লাইট' : 'Flight'}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'bn' ? 'যাত্রী' : 'Passenger'}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'bn' ? 'মূল্য' : 'Amount'}
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'bn' ? 'অবস্থা' : 'Status'}
                    </th>
                    <th className={`px-6 py-4 text-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'bn' ? 'অ্যাকশন' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredBookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'} transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {booking.id}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDate(booking.createdAt)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm">
                            {booking.flight?.airline?.logo || '✈️'}
                          </div>
                          <div>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {booking.flight?.airline?.name}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {booking.searchParams?.origin} → {booking.searchParams?.destination}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {booking.passengers?.[0]?.title} {booking.passengers?.[0]?.firstName} {booking.passengers?.[0]?.lastName}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          +{booking.totalPassengers - 1 > 0 ? `${booking.totalPassengers - 1} more` : ''} ({booking.totalPassengers} total)
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {booking.contactDetails?.email}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {booking.contactDetails?.phone}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className={`font-bold text-primary-500`}>
                          {formatCurrency(booking.totalAmount)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedBooking(booking)}
                            className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                            title={language === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
                          >
                            <Eye className="w-5 h-5" />
                          </motion.button>
                          {booking.status === 'pending' && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateBookingStatus(booking.id, 'approved')}
                                className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                                title={language === 'bn' ? 'অনুমোদন করুন' : 'Approve'}
                              >
                                <CheckCircle className="w-5 h-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateBookingStatus(booking.id, 'declined')}
                                className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                title={language === 'bn' ? 'প্রত্যাখ্যান করুন' : 'Decline'}
                              >
                                <XCircle className="w-5 h-5" />
                              </motion.button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBooking(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
                  isDark ? 'bg-slate-800' : 'bg-white'
                } shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className={`sticky top-0 p-6 border-b ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {language === 'bn' ? 'বুকিং বিস্তারিত' : 'Booking Details'}
                      </h2>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {selectedBooking.id}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    {getStatusBadge(selectedBooking.status)}
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatDate(selectedBooking.createdAt)}
                    </span>
                  </div>

                  {/* Flight Info */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Plane className="w-5 h-5 text-primary-500" />
                      {language === 'bn' ? 'ফ্লাইট তথ্য' : 'Flight Information'}
                    </h3>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl">
                        {selectedBooking.flight?.airline?.logo || '✈️'}
                      </div>
                      <div>
                        <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {selectedBooking.flight?.airline?.name}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {selectedBooking.flight?.flightNo} • {selectedBooking.flight?.class}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {selectedBooking.flight?.departure?.time}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {selectedBooking.searchParams?.origin}
                        </p>
                      </div>
                      <div className="flex flex-col items-center px-4">
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {selectedBooking.flight?.duration}
                        </span>
                        <ArrowRight className="w-5 h-5 text-primary-500" />
                      </div>
                      <div className="text-center">
                        <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {selectedBooking.flight?.arrival?.time}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {selectedBooking.searchParams?.destination}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Mail className="w-5 h-5 text-primary-500" />
                      {language === 'bn' ? 'যোগাযোগের তথ্য' : 'Contact Information'}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                        <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking.contactDetails?.email}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                        <p className={isDark ? 'text-white' : 'text-gray-900'}>{selectedBooking.contactDetails?.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <Users className="w-5 h-5 text-primary-500" />
                      {language === 'bn' ? 'যাত্রীদের তথ্য' : 'Passenger Details'} ({selectedBooking.totalPassengers})
                    </h3>
                    <div className="space-y-3">
                      {selectedBooking.passengers?.map((passenger, index) => (
                        <div key={index} className={`p-3 rounded-lg ${isDark ? 'bg-slate-600' : 'bg-white'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {passenger.title} {passenger.firstName} {passenger.lastName}
                            </p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              passenger.type === 'adult' 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {passenger.type}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>DOB: </span>
                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{passenger.dob}</span>
                            </div>
                            <div>
                              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Passport: </span>
                              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{passenger.passport}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment */}
                  <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                    <h3 className={`font-semibold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <CreditCard className="w-5 h-5 text-primary-500" />
                      {language === 'bn' ? 'পেমেন্ট' : 'Payment'}
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'bn' ? 'পেমেন্ট পদ্ধতি' : 'Payment Method'}
                        </p>
                        <p className={`capitalize ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {selectedBooking.paymentMethod}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'bn' ? 'মোট মূল্য' : 'Total Amount'}
                        </p>
                        <p className="text-2xl font-bold text-primary-500">
                          {formatCurrency(selectedBooking.totalAmount)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                {selectedBooking.status === 'pending' && (
                  <div className={`sticky bottom-0 p-6 border-t ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'}`}>
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateBookingStatus(selectedBooking.id, 'declined')}
                        className="flex-1 py-3 px-6 rounded-xl font-semibold bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        {language === 'bn' ? 'প্রত্যাখ্যান করুন' : 'Decline'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateBookingStatus(selectedBooking.id, 'approved')}
                        className="flex-1 py-3 px-6 rounded-xl font-semibold bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        {language === 'bn' ? 'অনুমোদন করুন' : 'Approve'}
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminFlightBookings;
