import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from './context/ThemeContext';
import { AdminProvider } from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';

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

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminQueries from './pages/admin/AdminQueries';
import AdminBookings from './pages/admin/AdminBookings';
import AdminPricing from './pages/admin/AdminPricing';
import AdminSettings from './pages/admin/AdminSettings';
import AdminUsers from './pages/admin/AdminUsers';
import AdminHolidays from './pages/admin/AdminHolidays';
import AdminVisas from './pages/admin/AdminVisas';

function App() {
  const { isDark } = useTheme();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <AdminProvider>
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
              <Route path="/holidays" element={<HolidaysPage />} />
              <Route path="/visas" element={<VisasPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/land-packages" element={<LandPackagesPage />} />
              <Route path="/group-tours" element={<GroupToursPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/partners" element={<PartnersPage />} />
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
              <Route path="/admin/pricing" element={<AdminPricing />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/holidays" element={<AdminHolidays />} />
              <Route path="/admin/visas" element={<AdminVisas />} />
            </Routes>
          </main>
          
          {!isAdminRoute && <Footer />}
        </div>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
