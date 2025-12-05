import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Clock, 
  ArrowRight, 
  Filter, 
  ChevronDown,
  Star,
  Users,
  Briefcase,
  Coffee,
  Wifi,
  Tv,
  Utensils,
  Sparkles,
  ArrowLeft,
  Calendar,
  MapPin
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useGradient } from '../context/GradientContext';

const FlightSearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { useGradients } = useGradient();
  
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [sortBy, setSortBy] = useState('price');
  const [filterAirline, setFilterAirline] = useState('all');

  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const departDate = searchParams.get('departDate');
  const returnDate = searchParams.get('returnDate');
  const adults = parseInt(searchParams.get('adults') || '1');
  const children = parseInt(searchParams.get('children') || '0');

  const airlines = [
    { code: 'BG', name: 'Biman Bangladesh', logo: '🇧🇩', color: 'from-green-500 to-emerald-600' },
    { code: 'EK', name: 'Emirates', logo: '🇦🇪', color: 'from-red-500 to-red-700' },
    { code: 'SQ', name: 'Singapore Airlines', logo: '🇸🇬', color: 'from-yellow-500 to-orange-500' },
    { code: 'QR', name: 'Qatar Airways', logo: '🇶🇦', color: 'from-purple-600 to-purple-800' },
    { code: 'TG', name: 'Thai Airways', logo: '🇹🇭', color: 'from-violet-500 to-purple-600' },
    { code: 'MH', name: 'Malaysia Airlines', logo: '🇲🇾', color: 'from-blue-600 to-blue-800' },
    { code: 'AI', name: 'Air India', logo: '🇮🇳', color: 'from-orange-500 to-red-500' },
    { code: 'TK', name: 'Turkish Airlines', logo: '🇹🇷', color: 'from-red-600 to-red-800' },
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const mockFlights = [
        {
          id: 1,
          airline: airlines[0],
          flightNo: 'BG-201',
          departure: { time: '08:30', airport: origin },
          arrival: { time: '13:45', airport: destination },
          duration: '5h 15m',
          stops: 0,
          price: 45000,
          class: 'Economy',
          amenities: ['wifi', 'meal', 'entertainment'],
          seatsLeft: 5,
        },
        {
          id: 2,
          airline: airlines[1],
          flightNo: 'EK-584',
          departure: { time: '10:15', airport: origin },
          arrival: { time: '14:30', airport: destination },
          duration: '4h 15m',
          stops: 0,
          price: 68000,
          class: 'Economy',
          amenities: ['wifi', 'meal', 'entertainment', 'usb'],
          seatsLeft: 12,
        },
        {
          id: 3,
          airline: airlines[3],
          flightNo: 'QR-638',
          departure: { time: '14:00', airport: origin },
          arrival: { time: '18:30', airport: destination },
          duration: '4h 30m',
          stops: 0,
          price: 72000,
          class: 'Economy',
          amenities: ['wifi', 'meal', 'entertainment', 'usb', 'lounge'],
          seatsLeft: 8,
        },
        {
          id: 4,
          airline: airlines[2],
          flightNo: 'SQ-437',
          departure: { time: '22:45', airport: origin },
          arrival: { time: '06:15', airport: destination },
          duration: '7h 30m',
          stops: 1,
          stopCity: 'Singapore',
          price: 52000,
          class: 'Economy',
          amenities: ['wifi', 'meal', 'entertainment'],
          seatsLeft: 15,
        },
        {
          id: 5,
          airline: airlines[4],
          flightNo: 'TG-322',
          departure: { time: '16:30', airport: origin },
          arrival: { time: '20:45', airport: destination },
          duration: '4h 15m',
          stops: 0,
          price: 48000,
          class: 'Economy',
          amenities: ['meal', 'entertainment'],
          seatsLeft: 3,
        },
        {
          id: 6,
          airline: airlines[5],
          flightNo: 'MH-192',
          departure: { time: '06:00', airport: origin },
          arrival: { time: '11:30', airport: destination },
          duration: '5h 30m',
          stops: 1,
          stopCity: 'Kuala Lumpur',
          price: 42000,
          class: 'Economy',
          amenities: ['wifi', 'meal'],
          seatsLeft: 20,
        },
      ];
      setFlights(mockFlights);
      setLoading(false);
    }, 1500);
  }, [origin, destination]);

  const sortedFlights = [...flights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
    if (sortBy === 'departure') return a.departure.time.localeCompare(b.departure.time);
    return 0;
  }).filter(f => filterAirline === 'all' || f.airline.code === filterAirline);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: <Wifi className="w-4 h-4" />,
      meal: <Utensils className="w-4 h-4" />,
      entertainment: <Tv className="w-4 h-4" />,
      usb: <Coffee className="w-4 h-4" />,
      lounge: <Star className="w-4 h-4" />,
    };
    return icons[amenity] || null;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Helmet>
        <title>Flight Search Results | Explore Holidays</title>
      </Helmet>

      {/* Premium Header */}
      <div className={`relative py-8 ${useGradients ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600' : 'bg-blue-600'}`}>
        <div className="absolute inset-0 overflow-hidden">
          {useGradients && (
            <>
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </>
          )}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {language === 'bn' ? 'ফিরে যান' : 'Back to Search'}
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Plane className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                  {origin}
                  <ArrowRight className="w-6 h-6" />
                  {destination}
                </h1>
                <div className="flex items-center gap-4 text-white/80 text-sm mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(departDate)}
                  </span>
                  {returnDate && (
                    <span className="flex items-center gap-1">
                      - {formatDate(returnDate)}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {adults + children} {language === 'bn' ? 'যাত্রী' : 'Passengers'}
                  </span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/flights')}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              {language === 'bn' ? 'সার্চ পরিবর্তন করুন' : 'Modify Search'}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Filters & Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className={`mb-6 p-4 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'bn' ? 'সাজান:' : 'Sort by:'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-2 rounded-xl border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:border-primary-500 transition-colors`}
              >
                <option value="price">{language === 'bn' ? 'মূল্য' : 'Price'}</option>
                <option value="duration">{language === 'bn' ? 'সময়' : 'Duration'}</option>
                <option value="departure">{language === 'bn' ? 'প্রস্থান' : 'Departure'}</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {language === 'bn' ? 'এয়ারলাইন:' : 'Airline:'}
              </span>
              <select
                value={filterAirline}
                onChange={(e) => setFilterAirline(e.target.value)}
                className={`px-4 py-2 rounded-xl border-2 ${
                  isDark 
                    ? 'bg-slate-700 border-slate-600 text-white' 
                    : 'bg-gray-50 border-gray-200 text-gray-900'
                } focus:outline-none focus:border-primary-500 transition-colors`}
              >
                <option value="all">{language === 'bn' ? 'সব' : 'All Airlines'}</option>
                {airlines.map(a => (
                  <option key={a.code} value={a.code}>{a.name}</option>
                ))}
              </select>
            </div>

            <div className="ml-auto">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {sortedFlights.length} {language === 'bn' ? 'ফ্লাইট পাওয়া গেছে' : 'flights found'}
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} animate-pulse`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-300 dark:bg-slate-700" />
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-gray-300 dark:bg-slate-700 rounded" />
                      <div className="w-24 h-3 bg-gray-200 dark:bg-slate-600 rounded" />
                    </div>
                  </div>
                  <div className="w-24 h-8 bg-gray-300 dark:bg-slate-700 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {sortedFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className={`group p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 hover:bg-slate-750 border border-slate-700' 
                      : 'bg-white hover:shadow-2xl border border-gray-100'
                  } ${selectedFlight === flight.id ? 'ring-2 ring-primary-500' : ''}`}
                  onClick={() => setSelectedFlight(selectedFlight === flight.id ? null : flight.id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Airline Info */}
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${
                        useGradients 
                          ? `bg-gradient-to-br ${flight.airline.color}` 
                          : 'bg-primary-500'
                      } shadow-lg group-hover:scale-110 transition-transform`}>
                        {flight.airline.logo}
                      </div>
                      <div>
                        <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {flight.airline.name}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {flight.flightNo} • {flight.class}
                        </p>
                      </div>
                    </div>

                    {/* Flight Times */}
                    <div className="flex items-center gap-6 lg:gap-10">
                      <div className="text-center">
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {flight.departure.time}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {flight.departure.airport}
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {flight.duration}
                        </p>
                        <div className="relative flex items-center w-24 lg:w-32">
                          <div className={`h-0.5 w-full ${useGradients ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-primary-500'}`} />
                          <Plane className={`absolute right-0 w-4 h-4 ${useGradients ? 'text-accent-500' : 'text-primary-500'} transform translate-x-1`} />
                        </div>
                        <p className={`text-xs font-medium ${flight.stops === 0 ? 'text-green-500' : 'text-orange-500'}`}>
                          {flight.stops === 0 
                            ? (language === 'bn' ? 'সরাসরি' : 'Direct') 
                            : `${flight.stops} ${language === 'bn' ? 'স্টপ' : 'Stop'}`}
                        </p>
                      </div>

                      <div className="text-center">
                        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {flight.arrival.time}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {flight.arrival.airport}
                        </p>
                      </div>
                    </div>

                    {/* Price & Book */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {language === 'bn' ? 'মূল্য শুরু' : 'Starting from'}
                        </p>
                        <p className={`text-2xl font-black ${useGradients ? 'bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent' : 'text-primary-500'}`}>
                          {formatCurrency(flight.price)}
                        </p>
                      </div>
                      
                      {flight.seatsLeft <= 5 && (
                        <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                          {language === 'bn' ? `মাত্র ${flight.seatsLeft}টি সিট বাকি` : `Only ${flight.seatsLeft} seats left`}
                        </span>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/flights/book/${flight.id}`, { state: { flight, searchParams: Object.fromEntries(searchParams) } });
                        }}
                        className={`px-6 py-3 text-white font-bold rounded-xl transition-all flex items-center gap-2 ${
                          useGradients 
                            ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-lg hover:shadow-primary-500/30' 
                            : 'bg-primary-500 hover:bg-primary-600'
                        }`}
                      >
                        {language === 'bn' ? 'বুক করুন' : 'Book Now'}
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedFlight === flight.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {language === 'bn' ? 'সুবিধাসমূহ' : 'Amenities'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {flight.amenities.map((amenity, i) => (
                                <span 
                                  key={i}
                                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm ${
                                    isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {getAmenityIcon(amenity)}
                                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          {flight.stops > 0 && (
                            <div>
                              <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                {language === 'bn' ? 'স্টপ' : 'Stopover'}
                              </p>
                              <p className={`flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                <MapPin className="w-4 h-4" />
                                {flight.stopCity}
                              </p>
                            </div>
                          )}

                          <div>
                            <p className={`text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {language === 'bn' ? 'ব্যাগেজ' : 'Baggage'}
                            </p>
                            <div className="flex items-center gap-2">
                              <Briefcase className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                23kg {language === 'bn' ? 'চেক-ইন' : 'Check-in'} + 7kg {language === 'bn' ? 'হাতের ব্যাগ' : 'Cabin'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* No Results */}
        {!loading && sortedFlights.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-16 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}
          >
            <Plane className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'bn' ? 'কোনো ফ্লাইট পাওয়া যায়নি' : 'No flights found'}
            </h3>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'bn' ? 'অনুগ্রহ করে আপনার অনুসন্ধান পরিবর্তন করুন' : 'Please try modifying your search'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/flights')}
              className={`px-6 py-3 text-white font-bold rounded-xl ${
                useGradients 
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500' 
                  : 'bg-primary-500'
              }`}
            >
              {language === 'bn' ? 'নতুন অনুসন্ধান' : 'New Search'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FlightSearchResults;
