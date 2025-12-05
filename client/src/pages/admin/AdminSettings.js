import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Globe, Mail, Phone, MapPin, Image, Save, Check, Upload, 
  Palette, Type, Facebook, Instagram, Twitter, Youtube, X, Eye, 
  RefreshCw, Trash2, Plus, Building2, Plane, Sparkles
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminSettings = () => {
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('adminTheme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    const checkTheme = () => {
      const saved = localStorage.getItem('adminTheme');
      setIsDark(saved === 'dark');
    };
    const interval = setInterval(checkTheme, 500);
    return () => clearInterval(interval);
  }, []);

  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('siteSettings');
    return saved ? JSON.parse(saved) : {
      siteName: 'Explore Holidays',
      siteTitle: 'Explore Holidays | Premium Travel Booking',
      tagline: 'Your Premium Travel Partner',
      logo: null,
      favicon: null,
      phone: '+880 1234-567890',
      email: 'info@exploreholidays.com',
      supportEmail: 'support@exploreholidays.com',
      address: 'House 42, Road 11, Banani, Dhaka 1213',
      facebook: 'https://facebook.com/exploreholidays',
      twitter: 'https://twitter.com/exploreholidays',
      instagram: 'https://instagram.com/exploreholidays',
      youtube: 'https://youtube.com/exploreholidays',
      footerText: 'Experience the world with Bangladesh\'s most trusted travel agency.',
      copyrightText: '© 2024 Explore Holidays. All rights reserved.',
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#06b6d4',
      headerBg: '#1e293b',
      footerBg: '#0f172a',
      useGradients: true,
    };
  });

  const [partners, setPartners] = useState(() => {
    const saved = localStorage.getItem('sitePartners');
    return saved ? JSON.parse(saved) : {
      banks: [
        { id: 1, name: 'BRAC Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/5/5f/BRAC_Bank_logo.svg', active: true },
        { id: 2, name: 'Dutch Bangla Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/d/df/Dutch-Bangla_Bank_logo.svg', active: true },
        { id: 3, name: 'City Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/9/96/City_Bank_Bangladesh.svg', active: true },
        { id: 4, name: 'Eastern Bank', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Eastern_Bank_Limited.svg', active: true },
        { id: 5, name: 'bKash', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/BKash_Logo.svg', active: true },
        { id: 6, name: 'Nagad', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Nagad_Logo.svg', active: true },
      ],
      airlines: [
        { id: 1, name: 'Biman Bangladesh', logo: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Biman_Bangladesh_Airlines_Logo.svg', active: true },
        { id: 2, name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg', active: true },
        { id: 3, name: 'Singapore Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Singapore_Airlines_Logo_2.svg', active: true },
        { id: 4, name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Qatar_Airways_logo.svg', active: true },
        { id: 5, name: 'Thai Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/e/ed/Thai_Airways_Logo.svg', active: true },
        { id: 6, name: 'Malaysia Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Malaysia_Airlines_Logo.svg', active: true },
      ]
    };
  });

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'branding', label: 'Branding', icon: Image },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'social', label: 'Social & Footer', icon: Settings },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'partners', label: 'Partners', icon: Building2 },
  ];

  const handleSave = () => {
    setSaving(true);
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    localStorage.setItem('sitePartners', JSON.stringify(partners));
    
    // Apply theme colors
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
    
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings(prev => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updatePartner = (type, id, field, value) => {
    setPartners(prev => ({
      ...prev,
      [type]: prev[type].map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const addPartner = (type) => {
    const newId = Math.max(...partners[type].map(p => p.id), 0) + 1;
    setPartners(prev => ({
      ...prev,
      [type]: [...prev[type], { id: newId, name: 'New Partner', logo: '', active: true }]
    }));
  };

  const removePartner = (type, id) => {
    setPartners(prev => ({
      ...prev,
      [type]: prev[type].filter(p => p.id !== id)
    }));
  };

  const colorPresets = [
    { name: 'Indigo', primary: '#6366f1', secondary: '#8b5cf6', accent: '#06b6d4' },
    { name: 'Blue', primary: '#3b82f6', secondary: '#60a5fa', accent: '#14b8a6' },
    { name: 'Green', primary: '#10b981', secondary: '#34d399', accent: '#f59e0b' },
    { name: 'Rose', primary: '#f43f5e', secondary: '#fb7185', accent: '#8b5cf6' },
    { name: 'Orange', primary: '#f97316', secondary: '#fb923c', accent: '#06b6d4' },
    { name: 'Violet', primary: '#8b5cf6', secondary: '#a78bfa', accent: '#ec4899' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Site Settings</h1>
            <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Manage website configuration, branding, and theme</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-xl"
              >
                <Check className="w-5 h-5" />
                <span>Saved!</span>
              </motion.div>
            )}
            <motion.button
              onClick={handleSave}
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-xl flex items-center gap-2"
            >
              {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {saving ? 'Saving...' : 'Save All'}
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex flex-wrap gap-2 p-2 rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white border border-gray-200 shadow-sm'}`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : isDark ? 'text-gray-400 hover:text-white hover:bg-slate-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className={`rounded-2xl p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Globe className="w-5 h-5 text-primary-500" />
                  General Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Site Name</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>SEO Title</label>
                    <input
                      type="text"
                      value={settings.siteTitle}
                      onChange={(e) => setSettings(prev => ({ ...prev, siteTitle: e.target.value }))}
                      className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Branding Tab */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <div className={`rounded-2xl p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Image className="w-5 h-5 text-primary-500" />
                    Logo & Favicon
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logo Upload */}
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Site Logo</label>
                      <div className="flex items-center gap-4">
                        <div className={`w-32 h-32 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden ${isDark ? 'bg-slate-700 border-slate-500' : 'bg-gray-50 border-gray-300'}`}>
                          {settings.logo ? (
                            <img src={settings.logo} alt="Logo" className="w-full h-full object-contain p-2" />
                          ) : (
                            <Image className="w-10 h-10 text-gray-500" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <input
                            type="file"
                            ref={logoInputRef}
                            onChange={(e) => handleImageUpload(e, 'logo')}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            onClick={() => logoInputRef.current?.click()}
                            className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Logo
                          </button>
                          {settings.logo && (
                            <button
                              onClick={() => setSettings(prev => ({ ...prev, logo: null }))}
                              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Favicon Upload */}
                    <div>
                      <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Favicon</label>
                      <div className="flex items-center gap-4">
                        <div className={`w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden ${isDark ? 'bg-slate-700 border-slate-500' : 'bg-gray-50 border-gray-300'}`}>
                          {settings.favicon ? (
                            <img src={settings.favicon} alt="Favicon" className="w-full h-full object-contain p-2" />
                          ) : (
                            <Image className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                        <div className="space-y-2">
                          <input
                            type="file"
                            ref={faviconInputRef}
                            onChange={(e) => handleImageUpload(e, 'favicon')}
                            accept="image/*"
                            className="hidden"
                          />
                          <button
                            onClick={() => faviconInputRef.current?.click()}
                            className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            Upload Favicon
                          </button>
                          {settings.favicon && (
                            <button
                              onClick={() => setSettings(prev => ({ ...prev, favicon: null }))}
                              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className={`rounded-2xl p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Phone className="w-5 h-5 text-primary-500" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Support Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social & Footer Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className={`rounded-2xl p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Social Media Links</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Facebook</label>
                      <div className="relative">
                        <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                        <input
                          type="url"
                          value={settings.facebook}
                          onChange={(e) => setSettings(prev => ({ ...prev, facebook: e.target.value }))}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Instagram</label>
                      <div className="relative">
                        <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                        <input
                          type="url"
                          value={settings.instagram}
                          onChange={(e) => setSettings(prev => ({ ...prev, instagram: e.target.value }))}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Twitter</label>
                      <div className="relative">
                        <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-500" />
                        <input
                          type="url"
                          value={settings.twitter}
                          onChange={(e) => setSettings(prev => ({ ...prev, twitter: e.target.value }))}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>YouTube</label>
                      <div className="relative">
                        <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                        <input
                          type="url"
                          value={settings.youtube}
                          onChange={(e) => setSettings(prev => ({ ...prev, youtube: e.target.value }))}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-2xl p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Footer Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Footer Description</label>
                      <textarea
                        value={settings.footerText}
                        onChange={(e) => setSettings(prev => ({ ...prev, footerText: e.target.value }))}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-xl border resize-none ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Copyright Text</label>
                      <input
                        type="text"
                        value={settings.copyrightText}
                        onChange={(e) => setSettings(prev => ({ ...prev, copyrightText: e.target.value }))}
                        className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div className={`rounded-2xl p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <Palette className="w-5 h-5 text-primary-500" />
                    Color Presets
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {colorPresets.map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => setSettings(prev => ({
                          ...prev,
                          primaryColor: preset.primary,
                          secondaryColor: preset.secondary,
                          accentColor: preset.accent
                        }))}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          settings.primaryColor === preset.primary
                            ? isDark ? 'border-white bg-slate-700' : 'border-primary-500 bg-primary-50'
                            : isDark ? 'border-slate-600 hover:border-slate-500' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex gap-1 mb-2">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.primary }} />
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.secondary }} />
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.accent }} />
                        </div>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`rounded-2xl p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Custom Colors</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Primary Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className="w-14 h-12 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.primaryColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                          className={`flex-1 px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Secondary Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className="w-14 h-12 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.secondaryColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                          className={`flex-1 px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Accent Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={settings.accentColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                          className="w-14 h-12 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.accentColor}
                          onChange={(e) => setSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                          className={`flex-1 px-4 py-3 rounded-xl border ${isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className={`mt-8 p-6 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                    <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Preview</h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: settings.primaryColor }}>
                        Primary Button
                      </button>
                      <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: settings.secondaryColor }}>
                        Secondary Button
                      </button>
                      <button className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: settings.accentColor }}>
                        Accent Button
                      </button>
                    </div>
                  </div>
                </div>

                {/* Premium Gradient Toggle */}
                <div className={`rounded-3xl p-8 border shadow-2xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>UI Style Settings</h2>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Control the visual style of your website</p>
                    </div>
                  </div>

                  {/* Premium Toggle Card */}
                  <div className={`relative p-6 rounded-2xl transition-all duration-500 ${
                    settings.useGradients 
                      ? isDark ? 'bg-purple-900/30 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'
                      : isDark ? 'bg-slate-700/50 border border-slate-600' : 'bg-gray-100 border border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all ${
                          settings.useGradients 
                            ? 'bg-primary-500' 
                            : isDark ? 'bg-slate-600' : 'bg-gray-300'
                        }`}>
                          {settings.useGradients ? (
                            <Sparkles className="w-8 h-8 text-white" />
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-white" />
                          )}
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {settings.useGradients ? 'Gradient Mode' : 'Solid Mode'}
                          </h3>
                          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                            {settings.useGradients 
                              ? 'Beautiful gradients across buttons & sections' 
                              : 'Clean solid colors for minimal look'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Premium Toggle Switch */}
                      <button
                        onClick={() => setSettings(prev => ({ ...prev, useGradients: !prev.useGradients }))}
                        className={`relative w-20 h-10 rounded-full transition-all duration-300 shadow-inner ${
                          settings.useGradients 
                            ? 'bg-primary-500' 
                            : isDark ? 'bg-slate-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`absolute top-1 w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                          settings.useGradients ? 'translate-x-11' : 'translate-x-1'
                        }`}>
                          {settings.useGradients ? (
                            <span className="text-primary-500 text-xs font-bold">ON</span>
                          ) : (
                            <span className="text-gray-400 text-xs font-bold">OFF</span>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className={`mt-6 p-5 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                    <p className="text-sm text-gray-400 mb-4 font-medium">Live Preview:</p>
                    <div className="flex flex-wrap gap-3">
                      <button className={`px-6 py-3 rounded-xl text-white font-semibold transition-all ${
                        settings.useGradients 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:shadow-lg hover:shadow-cyan-500/25' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}>
                        Primary Button
                      </button>
                      <button className={`px-6 py-3 rounded-xl text-white font-semibold transition-all ${
                        settings.useGradients 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25' 
                          : 'bg-purple-600 hover:bg-purple-700'
                      }`}>
                        Secondary Button
                      </button>
                      <button className={`px-6 py-3 rounded-xl text-white font-semibold transition-all ${
                        settings.useGradients 
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg hover:shadow-orange-500/25' 
                          : 'bg-orange-600 hover:bg-orange-700'
                      }`}>
                        Accent Button
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Partners Tab */}
            {activeTab === 'partners' && (
              <div className="space-y-6">
                {/* Banking Partners */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-primary-500" />
                      Banking Partners
                    </h2>
                    <button
                      onClick={() => addPartner('banks')}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Bank
                    </button>
                  </div>
                  <div className="space-y-4">
                    {partners.banks.map(partner => (
                      <div key={partner.id} className="flex items-center gap-4 p-4 bg-slate-700 rounded-xl">
                        <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                          {partner.logo ? (
                            <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-1" />
                          ) : (
                            <Building2 className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={partner.name}
                            onChange={(e) => updatePartner('banks', partner.id, 'name', e.target.value)}
                            placeholder="Partner Name"
                            className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
                          />
                          <input
                            type="text"
                            value={partner.logo}
                            onChange={(e) => updatePartner('banks', partner.id, 'logo', e.target.value)}
                            placeholder="Logo URL"
                            className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
                          />
                        </div>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={partner.active}
                            onChange={(e) => updatePartner('banks', partner.id, 'active', e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-sm text-gray-400">Active</span>
                        </label>
                        <button
                          onClick={() => removePartner('banks', partner.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Airline Partners */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Plane className="w-5 h-5 text-primary-500" />
                      Airline Partners
                    </h2>
                    <button
                      onClick={() => addPartner('airlines')}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Airline
                    </button>
                  </div>
                  <div className="space-y-4">
                    {partners.airlines.map(partner => (
                      <div key={partner.id} className="flex items-center gap-4 p-4 bg-slate-700 rounded-xl">
                        <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center overflow-hidden">
                          {partner.logo ? (
                            <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-1" />
                          ) : (
                            <Plane className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={partner.name}
                            onChange={(e) => updatePartner('airlines', partner.id, 'name', e.target.value)}
                            placeholder="Partner Name"
                            className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
                          />
                          <input
                            type="text"
                            value={partner.logo}
                            onChange={(e) => updatePartner('airlines', partner.id, 'logo', e.target.value)}
                            placeholder="Logo URL"
                            className="px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
                          />
                        </div>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={partner.active}
                            onChange={(e) => updatePartner('airlines', partner.id, 'active', e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-sm text-gray-400">Active</span>
                        </label>
                        <button
                          onClick={() => removePartner('airlines', partner.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
