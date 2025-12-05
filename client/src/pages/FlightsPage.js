import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Users, 
  Search,
  ArrowRight,
  Clock
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useGradient } from '../context/GradientContext';

const FlightsPage = () => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { useGradients, getButtonClass } = useGradient();
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departDate: null,
    returnDate: null,
    passengers: 1,
    tripType: 'roundtrip'
  });

  // Airline logos
  const airlineLogos = {
    'Emirates': 'https://logos-world.net/wp-content/uploads/2020/03/Emirates-Logo.png',
    'Singapore Airlines': 'https://logos-world.net/wp-content/uploads/2023/01/Singapore-Airlines-Logo.png',
    'Thai Airways': 'https://logos-world.net/wp-content/uploads/2023/01/Thai-Airways-Logo.png',
    'Malaysia Airlines': 'https://logos-world.net/wp-content/uploads/2023/01/Malaysia-Airlines-Logo.png',
    'Biman': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Biman_Bangladesh_Airlines_Logo.svg/1200px-Biman_Bangladesh_Airlines_Logo.svg.png',
    'IndiGo': 'https://logos-world.net/wp-content/uploads/2023/01/IndiGo-Logo.png',
  };

  const popularFlights = [
    { id: 1, from: 'Dhaka', to: 'Dubai', price: 45000, airline: 'Emirates', duration: '5h 30m', flightNo: 'EK-585' },
    { id: 2, from: 'Dhaka', to: 'Singapore', price: 38000, airline: 'Singapore Airlines', duration: '4h 15m', flightNo: 'SQ-447' },
    { id: 3, from: 'Dhaka', to: 'Bangkok', price: 28000, airline: 'Thai Airways', duration: '2h 45m', flightNo: 'TG-322' },
    { id: 4, from: 'Dhaka', to: 'Kuala Lumpur', price: 32000, airline: 'Malaysia Airlines', duration: '3h 30m', flightNo: 'MH-195' },
    { id: 5, from: 'Dhaka', to: 'Kolkata', price: 15000, airline: 'Biman', duration: '1h 15m', flightNo: 'BG-401' },
    { id: 6, from: 'Dhaka', to: 'Delhi', price: 22000, airline: 'IndiGo', duration: '2h 30m', flightNo: '6E-234' },
  ];

  const handleBookFlight = (flight) => {
    // Create flight data for booking
    const flightData = {
      id: flight.id,
      airline: flight.airline,
      flightNumber: flight.flightNo,
      origin: flight.from,
      destination: flight.to,
      departureTime: '10:00',
      arrivalTime: '15:30',
      duration: flight.duration,
      price: flight.price,
      class: 'Economy',
      stops: 0,
      departDate: new Date().toISOString(),
    };
    
    // Store flight in localStorage
    localStorage.setItem('selectedFlight', JSON.stringify(flightData));
    
    // Navigate to booking page
    navigate(`/flights/book/${flight.id}`);
  };

  return (
    <>
      <Helmet>
        <title>Flight Booking | Explore Holidays</title>
        <meta name="description" content="Book domestic and international flights from Bangladesh at the best prices. Compare airlines and find cheap flights." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {language === 'bn' ? 'ফ্লাইট বুকিং' : 'Flight Booking'}
            </h1>
            <p className="text-xl text-white/80">
              {language === 'bn' 
                ? 'সেরা মূল্যে দেশীয় এবং আন্তর্জাতিক ফ্লাইট খুঁজুন'
                : 'Find the best deals on domestic and international flights'}
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-8 rounded-3xl shadow-2xl ${
              isDark ? 'bg-slate-900' : 'bg-white'
            }`}
          >
            {/* Trip Type */}
            <div className="flex gap-4 mb-6">
              {['roundtrip', 'oneway', 'multicity'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSearchParams({ ...searchParams, tripType: type })}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    searchParams.tripType === type
                      ? 'bg-primary-500 text-white'
                      : isDark
                        ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'roundtrip' && (language === 'bn' ? 'রাউন্ড ট্রিপ' : 'Round Trip')}
                  {type === 'oneway' && (language === 'bn' ? 'ওয়ান ওয়ে' : 'One Way')}
                  {type === 'multicity' && (language === 'bn' ? 'মাল্টি সিটি' : 'Multi City')}
                </button>
              ))}
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {t('banner.origin')}
                </label>
                <input
                  type="text"
                  placeholder={t('banner.selectOrigin')}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-gray-200'
                  } focus:border-primary-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {t('banner.destination')}
                </label>
                <input
                  type="text"
                  placeholder={t('banner.selectDestination')}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-gray-200'
                  } focus:border-primary-500 focus:outline-none`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {t('banner.departDate')}
                </label>
                <DatePicker
                  selected={searchParams.departDate}
                  onChange={(date) => setSearchParams({ ...searchParams, departDate: date })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-gray-200'
                  } focus:border-primary-500 focus:outline-none`}
                  placeholderText={t('banner.selectDate')}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {t('banner.returnDate')}
                </label>
                <DatePicker
                  selected={searchParams.returnDate}
                  onChange={(date) => setSearchParams({ ...searchParams, returnDate: date })}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-gray-200'
                  } focus:border-primary-500 focus:outline-none`}
                  placeholderText={t('banner.selectDate')}
                  disabled={searchParams.tripType === 'oneway'}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Users className="w-4 h-4 inline mr-1" />
                  {t('banner.passengers')}
                </label>
                <select
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-gray-200'
                  } focus:border-primary-500 focus:outline-none`}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>{t('banner.search')}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Flights */}
      <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'জনপ্রিয় ফ্লাইট রুট' : 'Popular Flight Routes'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularFlights.map((flight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-2xl ${
                  isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white'
                } shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
                      {airlineLogos[flight.airline] ? (
                        <img 
                          src={airlineLogos[flight.airline]} 
                          alt={flight.airline}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-8 h-8 rounded-full bg-primary-500/10 items-center justify-center ${airlineLogos[flight.airline] ? 'hidden' : 'flex'}`}>
                        <Plane className="w-4 h-4 text-primary-500" />
                      </div>
                    </div>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {flight.airline}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {flight.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {flight.from}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary-500" />
                  <div className="text-center">
                    <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {flight.to}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('common.from')}
                    </span>
                    <p className="text-xl font-bold text-primary-500">
                      {formatCurrency(flight.price)}
                    </p>
                  </div>
                  <motion.button
                    onClick={() => handleBookFlight(flight)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors"
                  >
                    {t('common.bookNow')}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FlightsPage;
