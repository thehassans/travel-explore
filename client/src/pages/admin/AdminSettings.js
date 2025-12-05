import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Globe, Mail, Phone, MapPin, Image, Save, Check, Upload, 
  Palette, Type, Facebook, Instagram, Twitter, Youtube, X, Eye, 
  RefreshCw, Trash2, Plus, Building2, Plane
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminSettings = () => {
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Site Settings</h1>
            <p className="text-gray-400 mt-1">Manage website configuration, branding, and theme</p>
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
        <div className="flex flex-wrap gap-2 p-2 bg-slate-800 rounded-2xl">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700'
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
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary-500" />
                  General Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings(prev => ({ ...prev, tagline: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">SEO Title</label>
                    <input
                      type="text"
                      value={settings.siteTitle}
                      onChange={(e) => setSettings(prev => ({ ...prev, siteTitle: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Branding Tab */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Image className="w-5 h-5 text-primary-500" />
                    Logo & Favicon
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logo Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Site Logo</label>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-32 rounded-2xl bg-slate-700 border-2 border-dashed border-slate-500 flex items-center justify-center overflow-hidden">
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
                      <label className="block text-sm font-medium text-gray-300 mb-3">Favicon</label>
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl bg-slate-700 border-2 border-dashed border-slate-500 flex items-center justify-center overflow-hidden">
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
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary-500" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Support Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Social & Footer Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h2 className="text-xl font-bold text-white mb-6">Social Media Links</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
                      <div className="relative">
                        <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                        <input
                          type="url"
                          value={settings.facebook}
                          onChange={(e) => setSettings(prev => ({ ...prev, facebook: e.target.value }))}
                          className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                      <div className="relative">
                        <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-500" />
                        <input
                          type="url"
                          value={settings.instagram}
                          onChange={(e) => setSettings(prev => ({ ...prev, instagram: e.target.value }))}
                          className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
                      <div className="relative">
                        <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-500" />
                        <input
                          type="url"
                          value={settings.twitter}
                          onChange={(e) => setSettings(prev => ({ ...prev, twitter: e.target.value }))}
                          className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">YouTube</label>
                      <div className="relative">
                        <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                        <input
                          type="url"
                          value={settings.youtube}
                          onChange={(e) => setSettings(prev => ({ ...prev, youtube: e.target.value }))}
                          className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h2 className="text-xl font-bold text-white mb-6">Footer Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Footer Description</label>
                      <textarea
                        value={settings.footerText}
                        onChange={(e) => setSettings(prev => ({ ...prev, footerText: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Copyright Text</label>
                      <input
                        type="text"
                        value={settings.copyrightText}
                        onChange={(e) => setSettings(prev => ({ ...prev, copyrightText: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Theme Tab */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
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
                            ? 'border-white bg-slate-700'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex gap-1 mb-2">
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.primary }} />
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.secondary }} />
                          <div className="w-6 h-6 rounded-full" style={{ backgroundColor: preset.accent }} />
                        </div>
                        <span className="text-sm text-gray-300">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h2 className="text-xl font-bold text-white mb-6">Custom Colors</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
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
                          className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
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
                          className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
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
                          className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mt-8 p-6 rounded-xl bg-slate-900 border border-slate-700">
                    <h3 className="text-sm font-medium text-gray-400 mb-4">Preview</h3>
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

                {/* Gradient Toggle */}
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-primary-500" />
                    UI Style Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-700 rounded-xl">
                      <div>
                        <h3 className="text-white font-medium">Gradient Mode</h3>
                        <p className="text-sm text-gray-400">Enable gradient backgrounds and buttons across the site</p>
                      </div>
                      <button
                        onClick={() => setSettings(prev => ({ ...prev, useGradients: !prev.useGradients }))}
                        className={`relative w-14 h-7 rounded-full transition-colors ${
                          settings.useGradients ? 'bg-primary-500' : 'bg-slate-600'
                        }`}
                      >
                        <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.useGradients ? 'translate-x-8' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    
                    <div className="p-4 bg-slate-900 rounded-xl">
                      <p className="text-sm text-gray-400 mb-3">Current Style:</p>
                      <div className="flex gap-3">
                        {settings.useGradients ? (
                          <div className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-primary-500 to-accent-500">
                            Gradient Enabled ✓
                          </div>
                        ) : (
                          <div className="px-4 py-2 rounded-lg text-white" style={{ backgroundColor: settings.primaryColor }}>
                            Solid Colors Enabled ✓
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        {settings.useGradients 
                          ? 'Site will use gradient backgrounds on buttons, cards, and sections.'
                          : 'Site will use solid colors for a cleaner, minimal look.'}
                      </p>
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
