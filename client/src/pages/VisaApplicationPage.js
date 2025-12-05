import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FileCheck, Clock, CheckCircle, ArrowLeft, ArrowRight, Upload, 
  User, Mail, Phone, Calendar, Globe, Building, CreditCard,
  Shield, AlertCircle, Sparkles, Check
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const VisaApplicationPage = () => {
  const { country } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const visaData = {
    'uae': { 
      country: 'UAE (Dubai)', 
      flag: '🇦🇪',
      code: 'AE',
      processing: '3-5 Working Days', 
      price: 8000,
      visaType: 'Tourist Visa',
      validity: '30 Days',
      entry: 'Single Entry',
      requirements: ['Valid Passport (6 months validity)', 'Passport Size Photo (White Background)', 'Bank Statement (Last 3 months)', 'Hotel Booking Confirmation', 'Return Flight Ticket'],
    },
    'singapore': { 
      country: 'Singapore', 
      flag: '🇸🇬',
      code: 'SG',
      processing: '5-7 Working Days', 
      price: 5000,
      visaType: 'Tourist Visa',
      validity: '30 Days',
      entry: 'Multiple Entry',
      requirements: ['Valid Passport', 'Passport Size Photo', 'Hotel Booking', 'Return Ticket', 'Bank Statement'],
    },
    'thailand': { 
      country: 'Thailand', 
      flag: '🇹🇭',
      code: 'TH',
      processing: 'On Arrival', 
      price: 3500,
      visaType: 'Visa on Arrival',
      validity: '15 Days',
      entry: 'Single Entry',
      requirements: ['Valid Passport', 'Passport Photo', 'Return Ticket', 'Hotel Booking', 'Cash (10,000 THB equivalent)'],
    },
    'malaysia': { 
      country: 'Malaysia', 
      flag: '🇲🇾',
      code: 'MY',
      processing: '3-5 Working Days', 
      price: 4500,
      visaType: 'E-Visa',
      validity: '30 Days',
      entry: 'Single Entry',
      requirements: ['Valid Passport', 'Passport Photo', 'Bank Statement', 'Employment/Business Letter', 'Return Ticket'],
    },
    'india': { 
      country: 'India', 
      flag: '🇮🇳',
      code: 'IN',
      processing: '2-3 Working Days', 
      price: 2500,
      visaType: 'E-Visa',
      validity: '30 Days',
      entry: 'Double Entry',
      requirements: ['Valid Passport', 'Passport Photo', 'Application Form'],
    },
    'uk': { 
      country: 'United Kingdom', 
      flag: '🇬🇧',
      code: 'GB',
      processing: '15-20 Working Days', 
      price: 15000,
      visaType: 'Standard Visitor Visa',
      validity: '6 Months',
      entry: 'Multiple Entry',
      requirements: ['Valid Passport', 'Passport Photo', 'Bank Statement (6 months)', 'Employment Letter', 'Travel Insurance', 'Detailed Itinerary', 'Accommodation Proof'],
    },
    'usa': { 
      country: 'United States', 
      flag: '🇺🇸',
      code: 'US',
      processing: 'Interview Based', 
      price: 18000,
      visaType: 'B1/B2 Tourist Visa',
      validity: '10 Years',
      entry: 'Multiple Entry',
      requirements: ['Valid Passport', 'DS-160 Form', 'Passport Photo', 'Bank Statement', 'Employment Proof', 'Interview Appointment'],
    },
    'schengen': { 
      country: 'Schengen (Europe)', 
      flag: '🇪🇺',
      code: 'EU',
      processing: '10-15 Working Days', 
      price: 12000,
      visaType: 'Schengen Visa',
      validity: '90 Days',
      entry: 'Multiple Entry',
      requirements: ['Valid Passport', 'Passport Photo', 'Travel Insurance (€30,000)', 'Flight Itinerary', 'Hotel Booking', 'Bank Statement', 'Cover Letter'],
    }
  };

  const visa = visaData[country?.toLowerCase()] || visaData['uae'];

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    passportNumber: '',
    passportExpiry: '',
    dateOfBirth: '',
    nationality: 'Bangladeshi',
    travelDate: '',
    returnDate: '',
    purpose: 'Tourism',
    accommodation: '',
    emergencyContact: '',
    additionalNotes: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save to localStorage
    const applications = JSON.parse(localStorage.getItem('visaApplications') || '[]');
    applications.push({
      id: Date.now(),
      ...formData,
      visa: visa.country,
      price: visa.price,
      status: 'Pending',
      appliedAt: new Date().toISOString()
    });
    localStorage.setItem('visaApplications', JSON.stringify(applications));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Passport Details', icon: FileCheck },
    { id: 3, title: 'Travel Info', icon: Globe },
    { id: 4, title: 'Review & Submit', icon: CheckCircle },
  ];

  if (submitted) {
    return (
      <div className={`min-h-screen pt-24 pb-16 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Application Submitted Successfully!
          </h1>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your visa application for {visa.country} has been received. Our team will contact you within 24 hours.
          </p>
          <div className={`p-6 rounded-2xl mb-8 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl`}>
            <div className="flex items-center justify-between mb-4">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Application ID</span>
              <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                #VIS{Date.now().toString().slice(-8)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Status</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-medium">
                Processing
              </span>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              to="/visas"
              className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
            >
              Back to Visas
            </Link>
            <Link
              to="/"
              className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Apply for {visa.country} Visa | Explore Holidays</title>
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/visas" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Visa Services
          </Link>
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-6xl">{visa.flag}</span>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">{visa.country} Visa</h1>
                  <p className="text-white/70 text-lg">{visa.visaType}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <p className="text-white/60 text-sm">Processing</p>
                <p className="text-white font-bold">{visa.processing}</p>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <p className="text-white/60 text-sm">Validity</p>
                <p className="text-white font-bold">{visa.validity}</p>
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                <p className="text-white/80 text-sm">Total Fee</p>
                <p className="text-white font-bold text-xl">{formatCurrency(visa.price)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={`py-12 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <React.Fragment key={step.id}>
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isActive 
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                            : isCompleted 
                              ? 'bg-green-500 text-white'
                              : isDark ? 'bg-slate-700 text-gray-400' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                        </div>
                        <span className={`ml-3 font-medium hidden sm:block ${
                          isActive ? 'text-primary-500' : isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-1 mx-4 rounded ${
                          isCompleted ? 'bg-green-500' : isDark ? 'bg-slate-700' : 'bg-gray-200'
                        }`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className={`p-8 rounded-3xl shadow-xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Personal Information
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Full Name (as per passport) *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Date of Birth *
                          </label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Passport Details */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Passport Details
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Passport Number *
                          </label>
                          <input
                            type="text"
                            name="passportNumber"
                            value={formData.passportNumber}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Passport Expiry Date *
                          </label>
                          <input
                            type="date"
                            name="passportExpiry"
                            value={formData.passportExpiry}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Nationality *
                          </label>
                          <select
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          >
                            <option value="Bangladeshi">Bangladeshi</option>
                            <option value="Indian">Indian</option>
                            <option value="Pakistani">Pakistani</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Travel Info */}
                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Travel Information
                      </h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Travel Date *
                          </label>
                          <input
                            type="date"
                            name="travelDate"
                            value={formData.travelDate}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Return Date *
                          </label>
                          <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Purpose of Visit *
                          </label>
                          <select
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          >
                            <option value="Tourism">Tourism</option>
                            <option value="Business">Business</option>
                            <option value="Medical">Medical</option>
                            <option value="Education">Education</option>
                            <option value="Transit">Transit</option>
                          </select>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Accommodation Address
                          </label>
                          <input
                            type="text"
                            name="accommodation"
                            value={formData.accommodation}
                            onChange={handleInputChange}
                            placeholder="Hotel name or address"
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Additional Notes
                          </label>
                          <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Any additional information..."
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-colors resize-none ${
                              isDark 
                                ? 'bg-slate-700 border-slate-600 text-white focus:border-primary-500' 
                                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-500'
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Review */}
                  {currentStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Review Your Application
                      </h2>
                      
                      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Personal Details</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Name:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.fullName}</span></div>
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Email:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.email}</span></div>
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Phone:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.phone}</span></div>
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>DOB:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.dateOfBirth}</span></div>
                        </div>
                      </div>
                      
                      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Passport Details</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Passport:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.passportNumber}</span></div>
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Expiry:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.passportExpiry}</span></div>
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Nationality:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.nationality}</span></div>
                        </div>
                      </div>
                      
                      <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                        <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Travel Details</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Travel Date:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.travelDate}</span></div>
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Return Date:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.returnDate}</span></div>
                          <div><span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Purpose:</span> <span className={isDark ? 'text-white' : 'text-gray-900'}>{formData.purpose}</span></div>
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl flex items-start gap-3 ${isDark ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-amber-50 border border-amber-200'}`}>
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className={`text-sm ${isDark ? 'text-amber-200' : 'text-amber-800'}`}>
                          Please review all details carefully before submitting. Our team will contact you for document submission after successful application.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-slate-600">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                      disabled={currentStep === 1}
                      className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors ${
                        currentStep === 1
                          ? 'opacity-50 cursor-not-allowed'
                          : isDark ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                        className="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-primary-600 transition-colors"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <Check className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Visa Summary */}
              <div className={`p-6 rounded-3xl shadow-xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{visa.flag}</span>
                  <div>
                    <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{visa.country}</h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>{visa.visaType}</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Processing Time</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{visa.processing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Validity</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{visa.validity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Entry Type</span>
                    <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{visa.entry}</span>
                  </div>
                </div>
                
                <div className={`p-4 rounded-2xl ${isDark ? 'bg-gradient-to-r from-primary-500/20 to-purple-500/20' : 'bg-gradient-to-r from-primary-50 to-purple-50'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Fee</p>
                  <p className="text-3xl font-bold text-primary-500">{formatCurrency(visa.price)}</p>
                </div>
              </div>

              {/* Requirements */}
              <div className={`p-6 rounded-3xl shadow-xl ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Required Documents
                </h3>
                <ul className="space-y-3">
                  {visa.requirements.map((req, index) => (
                    <li key={index} className={`flex items-start gap-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div className={`p-6 rounded-3xl ${isDark ? 'bg-gradient-to-br from-primary-500/20 to-purple-500/20 border border-primary-500/20' : 'bg-gradient-to-br from-primary-50 to-purple-50 border border-primary-100'}`}>
                <Shield className="w-10 h-10 text-primary-500 mb-4" />
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Need Help?
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Our visa experts are here to assist you 24/7
                </p>
                <a href="tel:+8801234567890" className="inline-flex items-center text-primary-500 font-medium hover:underline">
                  <Phone className="w-4 h-4 mr-2" />
                  +880 1234-567890
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisaApplicationPage;
