import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  Package, 
  Settings, 
  LogOut,
  Menu,
  X,
  Plane,
  ChevronRight,
  Users,
  FileCheck,
  Palmtree,
  Sun,
  Moon,
  Globe,
  ClipboardList
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('adminTheme');
    return saved ? saved === 'dark' : false; // Light mode as default
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('adminLanguage') || 'en';
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdmin();

  useEffect(() => {
    localStorage.setItem('adminTheme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('adminLanguage', language);
  }, [language]);

  const labels = {
    en: {
      dashboard: 'Dashboard',
      queries: 'Queries',
      bookings: 'Bookings',
      flightBookings: 'Flight Bookings',
      holidays: 'Holidays',
      visas: 'Visa Pricing',
      visaQueries: 'Visa Applications',
      users: 'Users',
      pricing: 'Pricing',
      settings: 'Settings',
      logout: 'Logout',
      viewSite: 'View Site',
      admin: 'Admin',
      exploreHolidays: 'Explore Holidays'
    },
    bn: {
      dashboard: 'ড্যাশবোর্ড',
      queries: 'জিজ্ঞাসা',
      bookings: 'বুকিং',
      flightBookings: 'ফ্লাইট বুকিং',
      holidays: 'হলিডে',
      visas: 'ভিসা মূল্য',
      visaQueries: 'ভিসা আবেদন',
      users: 'ব্যবহারকারী',
      pricing: 'মূল্য',
      settings: 'সেটিংস',
      logout: 'লগআউট',
      viewSite: 'সাইট দেখুন',
      admin: 'অ্যাডমিন',
      exploreHolidays: 'এক্সপ্লোর হলিডেজ'
    }
  };

  const t = labels[language];

  const menuItems = [
    { path: '/admin/dashboard', label: t.dashboard, icon: LayoutDashboard },
    { path: '/admin/queries', label: t.queries, icon: MessageSquare },
    { path: '/admin/bookings', label: t.bookings, icon: Calendar },
    { path: '/admin/flight-bookings', label: t.flightBookings, icon: Plane },
    { path: '/admin/holidays', label: t.holidays, icon: Palmtree },
    { path: '/admin/visas', label: t.visas, icon: FileCheck },
    { path: '/admin/visa-queries', label: t.visaQueries, icon: ClipboardList },
    { path: '/admin/users', label: t.users, icon: Users },
    { path: '/admin/pricing', label: t.pricing, icon: Package },
    { path: '/admin/settings', label: t.settings, icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className={`fixed left-0 top-0 h-full border-r z-50 flex flex-col ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        }`}
      >
        {/* Logo */}
        <div className={`p-6 border-b flex items-center justify-between ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <Link to="/admin/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.admin}</h1>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.exploreHolidays}</p>
              </motion.div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-slate-700 text-gray-400 hover:text-white hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Theme & Language Toggle */}
        {sidebarOpen && (
          <div className={`px-4 py-3 border-b flex items-center justify-center gap-2 ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'bg-slate-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}
              title="Toggle Language"
            >
              <Globe className="w-4 h-4 inline mr-1" />
              {language === 'en' ? 'বাং' : 'EN'}
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-slate-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
                {sidebarOpen && isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className={`p-4 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all ${
              isDark ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-600 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">{t.logout}</span>}
          </button>
          <Link
            to="/"
            className={`flex items-center space-x-3 w-full px-4 py-3 mt-2 rounded-xl transition-all ${
              isDark ? 'text-gray-400 hover:text-primary-400 hover:bg-primary-500/10' : 'text-gray-600 hover:text-primary-500 hover:bg-primary-50'
            }`}
          >
            <Plane className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">{t.viewSite}</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="flex-1 transition-all"
        style={{ marginLeft: sidebarOpen ? 280 : 80 }}
      >
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
