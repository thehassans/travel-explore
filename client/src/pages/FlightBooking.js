import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plane, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle,
  CreditCard,
  Shield,
  Sparkles,
  AlertCircle,
  FileText,
  Users,
  Briefcase
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useGradient } from '../context/GradientContext';
import { useBooking } from '../context/BookingContext';

const FlightBooking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { useGradients } = useGradient();
  const { addBooking } = useBooking();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  // Get flight data from navigation state or localStorage
  const flightData = location.state?.flight || JSON.parse(localStorage.getItem('selectedFlight') || '{}');
  const searchParams = location.state?.searchParams || {};
  
  const [formData, setFormData] = useState({
    // Contact Details
    email: '',
    phone: '',
    // Passenger Details
    passengers: [{
      title: 'Mr',
      firstName: '',
      lastName: '',
      dob: '',
      passport: '',
      nationality: 'Bangladeshi',
      type: 'adult'
    }],
    // Payment
    paymentMethod: 'card',
    agreeTerms: false
  });

  const adults = parseInt(searchParams.adults || '1');
  const children = parseInt(searchParams.children || '0');
  const totalPassengers = adults + children;

  useEffect(() => {
    // Initialize passenger forms based on search params
    const passengerList = [];
    for (let i = 0; i < adults; i++) {
      passengerList.push({
        title: 'Mr',
        firstName: '',
        lastName: '',
        dob: '',
        passport: '',
        nationality: 'Bangladeshi',
        type: 'adult'
      });
    }
    for (let i = 0; i < children; i++) {
      passengerList.push({
        title: 'Master',
        firstName: '',
        lastName: '',
        dob: '',
        passport: '',
        nationality: 'Bangladeshi',
        type: 'child'
      });
    }
    setFormData(prev => ({ ...prev, passengers: passengerList }));
  }, [adults, children]);

  const updatePassenger = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      passengers: prev.passengers.map((p, i) => 
        i === index ? { ...p, [field]: value } : p
      )
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Generate booking ID
    const newBookingId = 'FLT' + Date.now().toString(36).toUpperCase();
    
    // Create booking object
    const booking = {
      id: newBookingId,
      type: 'flight',
      status: 'pending',
      createdAt: new Date().toISOString(),
      flight: flightData,
      searchParams,
      contactDetails: {
        email: formData.email,
        phone: formData.phone
      },
      passengers: formData.passengers,
      paymentMethod: formData.paymentMethod,
      totalAmount: flightData.price * totalPassengers,
      totalPassengers
    };

    // Save to localStorage (simulating database)
    const existingBookings = JSON.parse(localStorage.getItem('flightBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('flightBookings', JSON.stringify(existingBookings));

    // Save to user bookings context
    addBooking({
      type: 'flight',
      title: `${flightData.airline} - ${flightData.origin} to ${flightData.destination}`,
      destination: flightData.destination,
      date: searchParams.departDate || new Date().toISOString(),
      travelers: totalPassengers,
      amount: flightData.price * totalPassengers,
      image: flightData.airlineLogo,
      details: booking
    });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setBookingId(newBookingId);
      setBookingComplete(true);
    }, 2000);
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.passengers.every(p => 
        p.firstName && p.lastName && p.dob && p.passport
      );
    }
    if (step === 3) {
      return formData.agreeTerms;
    }
    return true;
  };

  if (!flightData || !flightData.id) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {language === 'bn' ? 'ফ্লাইট তথ্য পাওয়া যায়নি' : 'Flight information not found'}
          </h2>
          <button
            onClick={() => navigate('/flights')}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl"
          >
            {language === 'bn' ? 'ফ্লাইট খুঁজুন' : 'Search Flights'}
          </button>
        </div>
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <Helmet>
          <title>Booking Confirmed | Explore Holidays</title>
        </Helmet>
        
        <div className="max-w-2xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-8 rounded-3xl text-center ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-2xl`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            
            <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language === 'bn' ? 'বুকিং সম্পন্ন!' : 'Booking Submitted!'}
            </h1>
            
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'bn' 
                ? 'আপনার বুকিং পর্যালোচনার জন্য পেন্ডিং অবস্থায় আছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।'
                : 'Your booking is pending review. We will contact you shortly with confirmation.'}
            </p>

            <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'bn' ? 'বুকিং আইডি' : 'Booking ID'}
              </p>
              <p className={`text-2xl font-bold ${useGradients ? 'bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent' : 'text-primary-500'}`}>
                {bookingId}
              </p>
            </div>

            <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${isDark ? 'bg-yellow-900/30' : 'bg-yellow-50'}`}>
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className={`text-sm ${isDark ? 'text-yellow-200' : 'text-yellow-700'}`}>
                {language === 'bn' ? 'অবস্থা: পেন্ডিং - অনুমোদনের অপেক্ষায়' : 'Status: Pending - Awaiting Approval'}
              </span>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className={`px-6 py-3 rounded-xl font-semibold ${
                  isDark ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {language === 'bn' ? 'হোমে যান' : 'Go Home'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/flights')}
                className={`px-6 py-3 rounded-xl font-semibold text-white ${
                  useGradients 
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500' 
                    : 'bg-primary-500'
                }`}
              >
                {language === 'bn' ? 'আরো ফ্লাইট খুঁজুন' : 'Search More Flights'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Helmet>
        <title>Book Flight | Explore Holidays</title>
      </Helmet>

      {/* Header */}
      <div className={`py-6 ${useGradients ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600' : 'bg-blue-600'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {language === 'bn' ? 'ফিরে যান' : 'Back'}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Plane className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {language === 'bn' ? 'ফ্লাইট বুকিং' : 'Book Your Flight'}
              </h1>
              <p className="text-white/80 text-sm">
                {flightData.airline?.name} • {flightData.flightNo}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              {[
                { num: 1, label: language === 'bn' ? 'যোগাযোগ' : 'Contact' },
                { num: 2, label: language === 'bn' ? 'যাত্রী' : 'Passengers' },
                { num: 3, label: language === 'bn' ? 'পেমেন্ট' : 'Payment' }
              ].map((s, i) => (
                <div key={s.num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    step >= s.num 
                      ? useGradients 
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white' 
                        : 'bg-primary-500 text-white'
                      : isDark 
                        ? 'bg-slate-700 text-gray-400' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`ml-2 font-medium hidden sm:block ${
                    step >= s.num 
                      ? isDark ? 'text-white' : 'text-gray-900'
                      : isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </span>
                  {i < 2 && (
                    <div className={`w-12 sm:w-24 h-1 mx-2 rounded ${
                      step > s.num 
                        ? useGradients ? 'bg-gradient-to-r from-primary-500 to-accent-500' : 'bg-primary-500'
                        : isDark ? 'bg-slate-700' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Contact Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
              >
                <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Mail className="w-5 h-5 text-primary-500" />
                  {language === 'bn' ? 'যোগাযোগের তথ্য' : 'Contact Information'}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'bn' ? 'ইমেইল' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-200 text-gray-900'
                      } focus:outline-none focus:border-primary-500`}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {language === 'bn' ? 'ফোন নম্বর' : 'Phone Number'} *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 ${
                        isDark 
                          ? 'bg-slate-700 border-slate-600 text-white' 
                          : 'bg-white border-gray-200 text-gray-900'
                      } focus:outline-none focus:border-primary-500`}
                      placeholder="+880 1XXX-XXXXXX"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Passenger Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {formData.passengers.map((passenger, index) => (
                  <div 
                    key={index}
                    className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
                  >
                    <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      <User className="w-5 h-5 text-primary-500" />
                      {language === 'bn' ? `যাত্রী ${index + 1}` : `Passenger ${index + 1}`}
                      <span className={`text-sm font-normal px-2 py-0.5 rounded-full ${
                        passenger.type === 'adult' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-green-100 text-green-600'
                      }`}>
                        {passenger.type === 'adult' 
                          ? (language === 'bn' ? 'প্রাপ্তবয়স্ক' : 'Adult') 
                          : (language === 'bn' ? 'শিশু' : 'Child')}
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {language === 'bn' ? 'টাইটেল' : 'Title'}
                        </label>
                        <select
                          value={passenger.title}
                          onChange={(e) => updatePassenger(index, 'title', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            isDark 
                              ? 'bg-slate-700 border-slate-600 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                          } focus:outline-none focus:border-primary-500`}
                        >
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Ms">Ms</option>
                          <option value="Master">Master</option>
                          <option value="Miss">Miss</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {language === 'bn' ? 'জাতীয়তা' : 'Nationality'}
                        </label>
                        <select
                          value={passenger.nationality}
                          onChange={(e) => updatePassenger(index, 'nationality', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            isDark 
                              ? 'bg-slate-700 border-slate-600 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                          } focus:outline-none focus:border-primary-500`}
                        >
                          <option value="Bangladeshi">Bangladeshi</option>
                          <option value="Indian">Indian</option>
                          <option value="Pakistani">Pakistani</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {language === 'bn' ? 'প্রথম নাম' : 'First Name'} *
                        </label>
                        <input
                          type="text"
                          value={passenger.firstName}
                          onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            isDark 
                              ? 'bg-slate-700 border-slate-600 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                          } focus:outline-none focus:border-primary-500`}
                          placeholder={language === 'bn' ? 'পাসপোর্ট অনুযায়ী' : 'As per passport'}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {language === 'bn' ? 'শেষ নাম' : 'Last Name'} *
                        </label>
                        <input
                          type="text"
                          value={passenger.lastName}
                          onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            isDark 
                              ? 'bg-slate-700 border-slate-600 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                          } focus:outline-none focus:border-primary-500`}
                          placeholder={language === 'bn' ? 'পাসপোর্ট অনুযায়ী' : 'As per passport'}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {language === 'bn' ? 'জন্ম তারিখ' : 'Date of Birth'} *
                        </label>
                        <input
                          type="date"
                          value={passenger.dob}
                          onChange={(e) => updatePassenger(index, 'dob', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            isDark 
                              ? 'bg-slate-700 border-slate-600 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                          } focus:outline-none focus:border-primary-500`}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {language === 'bn' ? 'পাসপোর্ট নম্বর' : 'Passport Number'} *
                        </label>
                        <input
                          type="text"
                          value={passenger.passport}
                          onChange={(e) => updatePassenger(index, 'passport', e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl border-2 ${
                            isDark 
                              ? 'bg-slate-700 border-slate-600 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                          } focus:outline-none focus:border-primary-500`}
                          placeholder="XX1234567"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
              >
                <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <CreditCard className="w-5 h-5 text-primary-500" />
                  {language === 'bn' ? 'পেমেন্ট পদ্ধতি' : 'Payment Method'}
                </h2>

                <div className="space-y-4 mb-6">
                  {[
                    { id: 'card', label: language === 'bn' ? 'ক্রেডিট/ডেবিট কার্ড' : 'Credit/Debit Card', icon: CreditCard },
                    { id: 'bkash', label: 'bKash', icon: Phone },
                    { id: 'bank', label: language === 'bn' ? 'ব্যাংক ট্রান্সফার' : 'Bank Transfer', icon: FileText },
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                          : isDark 
                            ? 'border-slate-600 hover:border-slate-500' 
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="w-5 h-5 text-primary-500"
                      />
                      <method.icon className={`w-5 h-5 ${formData.paymentMethod === method.id ? 'text-primary-500' : isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={isDark ? 'text-white' : 'text-gray-900'}>{method.label}</span>
                    </label>
                  ))}
                </div>

                <div className={`p-4 rounded-xl mb-6 ${isDark ? 'bg-slate-700' : 'bg-blue-50'}`}>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-blue-900'}`}>
                        {language === 'bn' ? 'নিরাপদ পেমেন্ট' : 'Secure Payment'}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-700'}`}>
                        {language === 'bn' 
                          ? 'আপনার পেমেন্ট তথ্য সম্পূর্ণ নিরাপদ এবং এনক্রিপ্টেড'
                          : 'Your payment information is fully secure and encrypted'}
                      </p>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="w-5 h-5 mt-0.5 text-primary-500 rounded"
                  />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {language === 'bn' 
                      ? 'আমি শর্তাবলী এবং গোপনীয়তা নীতি মেনে চলতে সম্মত'
                      : 'I agree to the Terms & Conditions and Privacy Policy'}
                  </span>
                </label>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(step - 1)}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${
                    isDark ? 'bg-slate-700 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  {language === 'bn' ? 'পূর্ববর্তী' : 'Previous'}
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (step < 3) {
                    setStep(step + 1);
                  } else {
                    handleSubmit();
                  }
                }}
                disabled={!isStepValid() || loading}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ml-auto text-white ${
                  isStepValid() && !loading
                    ? useGradients 
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-lg' 
                      : 'bg-primary-500 hover:bg-primary-600'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {language === 'bn' ? 'প্রসেসিং...' : 'Processing...'}
                  </>
                ) : step < 3 ? (
                  <>
                    {language === 'bn' ? 'পরবর্তী' : 'Next'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    {language === 'bn' ? 'বুকিং কনফার্ম করুন' : 'Confirm Booking'}
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Flight Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className={`p-6 rounded-2xl sticky top-24 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
              <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {language === 'bn' ? 'ফ্লাইট সামারি' : 'Flight Summary'}
              </h3>

              {/* Flight Card */}
              <div className={`p-4 rounded-xl mb-4 ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                    useGradients 
                      ? `bg-gradient-to-br ${flightData.airline?.color || 'from-blue-500 to-blue-600'}` 
                      : 'bg-primary-500'
                  }`}>
                    {flightData.airline?.logo || '✈️'}
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {flightData.airline?.name}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {flightData.flightNo}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {flightData.departure?.time}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {flightData.departure?.airport}
                    </p>
                  </div>
                  <div className="flex flex-col items-center px-4">
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {flightData.duration}
                    </span>
                    <ArrowRight className="w-5 h-5 text-primary-500" />
                    <span className={`text-xs ${flightData.stops === 0 ? 'text-green-500' : 'text-orange-500'}`}>
                      {flightData.stops === 0 ? 'Direct' : `${flightData.stops} Stop`}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {flightData.arrival?.time}
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {flightData.arrival?.airport}
                    </p>
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                <Users className="w-5 h-5 text-primary-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  {adults} {language === 'bn' ? 'প্রাপ্তবয়স্ক' : 'Adult'}{adults > 1 ? 's' : ''}
                  {children > 0 && `, ${children} ${language === 'bn' ? 'শিশু' : 'Child'}${children > 1 ? 'ren' : ''}`}
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {language === 'bn' ? 'ভাড়া' : 'Base Fare'} × {totalPassengers}
                  </span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>
                    {formatCurrency(flightData.price * totalPassengers)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    {language === 'bn' ? 'ট্যাক্স ও ফি' : 'Taxes & Fees'}
                  </span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>
                    {language === 'bn' ? 'অন্তর্ভুক্ত' : 'Included'}
                  </span>
                </div>
              </div>

              <div className={`border-t pt-4 ${isDark ? 'border-slate-600' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {language === 'bn' ? 'মোট' : 'Total'}
                  </span>
                  <span className={`text-2xl font-black ${
                    useGradients 
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent' 
                      : 'text-primary-500'
                  }`}>
                    {formatCurrency(flightData.price * totalPassengers)}
                  </span>
                </div>
              </div>

              {/* Baggage Info */}
              <div className={`mt-4 p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary-500" />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    23kg {language === 'bn' ? 'চেক-ইন' : 'Check-in'} + 7kg {language === 'bn' ? 'ক্যাবিন' : 'Cabin'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;
