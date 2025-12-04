import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Globe, Mail, Phone, MapPin, Image, Save, Check } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    siteTitle: '',
    favicon: '',
    contactPhone: '',
    contactEmail: '',
    supportEmail: '',
    address: '',
    socialFacebook: '',
    socialInstagram: '',
    socialTwitter: '',
    footerText: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/admin/settings');
      setSettings(response.data.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
    setSaved(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put('/api/admin/settings', settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const InputField = ({ label, name, value, type = 'text', icon: Icon, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />}
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none transition-colors`}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Site Settings</h1>
            <p className="text-gray-400 mt-1">Manage website configuration and branding</p>
          </div>
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-xl"
            >
              <Check className="w-5 h-5" />
              <span>Settings saved!</span>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* General Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-primary-500" />
              General Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Site Name"
                name="siteName"
                value={settings.siteName}
                placeholder="Explore Holidays"
              />
              <InputField
                label="Site Title (SEO)"
                name="siteTitle"
                value={settings.siteTitle}
                placeholder="Explore Holidays | Premium Travel"
              />
              <div className="md:col-span-2">
                <InputField
                  label="Favicon URL"
                  name="favicon"
                  value={settings.favicon}
                  icon={Image}
                  placeholder="/favicon.ico"
                />
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-primary-500" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Contact Phone"
                name="contactPhone"
                value={settings.contactPhone}
                icon={Phone}
                placeholder="+880 1234-567890"
              />
              <InputField
                label="Contact Email"
                name="contactEmail"
                value={settings.contactEmail}
                type="email"
                icon={Mail}
                placeholder="info@exploreholidays.com"
              />
              <InputField
                label="Support Email"
                name="supportEmail"
                value={settings.supportEmail}
                type="email"
                icon={Mail}
                placeholder="support@exploreholidays.com"
              />
              <InputField
                label="Address"
                name="address"
                value={settings.address}
                icon={MapPin}
                placeholder="Banani, Dhaka"
              />
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary-500" />
              Social Media & Footer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputField
                label="Facebook URL"
                name="socialFacebook"
                value={settings.socialFacebook}
                placeholder="https://facebook.com/..."
              />
              <InputField
                label="Instagram URL"
                name="socialInstagram"
                value={settings.socialInstagram}
                placeholder="https://instagram.com/..."
              />
              <InputField
                label="Twitter URL"
                name="socialTwitter"
                value={settings.socialTwitter}
                placeholder="https://twitter.com/..."
              />
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Footer Text</label>
              <textarea
                name="footerText"
                value={settings.footerText}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none resize-none"
                placeholder="© 2024 Explore Holidays. All rights reserved."
              />
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.button
            type="submit"
            disabled={saving}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </motion.button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
