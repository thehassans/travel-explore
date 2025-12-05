import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';
import { GradientProvider } from './context/GradientContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import HolidaysPage from './pages/HolidaysPage';
import VisasPage from './pages/VisasPage';
import SupportPage from './pages/SupportPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import LandPackagesPage from './pages/LandPackagesPage';
import GroupToursPage from './pages/GroupToursPage';
import ServicesPage from './pages/ServicesPage';
import PartnersPage from './pages/PartnersPage';
import PackageDetailPage from './pages/PackageDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VisaApplicationPage from './pages/VisaApplicationPage';
import FlightSearchResults from './pages/FlightSearchResults';
import FlightBooking from './pages/FlightBooking';
import CareersPage from './pages/CareersPage';
import PrivacyPage from './pages/PrivacyPage';

// Auth Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminQueries from './pages/admin/AdminQueries';
import AdminBookings from './pages/admin/AdminBookings';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminHolidays from './pages/admin/AdminHolidays';
import AdminVisas from './pages/admin/AdminVisas';
import AdminVisaQueries from './pages/admin/AdminVisaQueries';
import AdminFlightBookings from './pages/admin/AdminFlightBookings';

function App() {
  const { isDark } = useTheme();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <AdminProvider>
        <GradientProvider>
          <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
            <ScrollToTop />
            <Helmet>
            <title>Explore Holidays | Premium Travel Booking from Bangladesh</title>
            <meta name="description" content="Book flights, holiday packages, visas, and tours from Bangladesh at the best prices. Your trusted travel partner." />
          </Helmet>
          
          {!isAdminRoute && <Header />}
          
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/flights" element={<FlightsPage />} />
              <Route path="/flights/search" element={<FlightSearchResults />} />
              <Route path="/flights/book/:id" element={<ProtectedRoute><FlightBooking /></ProtectedRoute>} />
              <Route path="/holidays" element={<HolidaysPage />} />
              <Route path="/visas" element={<VisasPage />} />
              <Route path="/visa-apply/:country" element={<ProtectedRoute><VisaApplicationPage /></ProtectedRoute>} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/land-packages" element={<LandPackagesPage />} />
              <Route path="/group-tours" element={<GroupToursPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/holidays/:id" element={<PackageDetailPage />} />
              <Route path="/package/:id" element={<PackageDetailPage />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/queries" element={<AdminQueries />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/holidays" element={<AdminHolidays />} />
              <Route path="/admin/visas" element={<AdminVisas />} />
              <Route path="/admin/visa-queries" element={<AdminVisaQueries />} />
              <Route path="/admin/flight-bookings" element={<AdminFlightBookings />} />
            </Routes>
          </main>
          
            {!isAdminRoute && <Footer />}
          </div>
        </GradientProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
