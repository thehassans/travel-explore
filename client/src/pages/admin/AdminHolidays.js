import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Plus, Edit, Trash2, Save, X, Image, MapPin, Clock, 
  DollarSign, Users, Star, Calendar, Check, ChevronDown, Eye,
  Upload, GripVertical, List, Grid, Search, Filter
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminHolidays = () => {
  const [packages, setPackages] = useState(() => {
    const saved = localStorage.getItem('holidayPackages');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'Cox\'s Bazar Beach Paradise',
        destination: 'Cox\'s Bazar',
        duration: '3 Days / 2 Nights',
        price: 12000,
        discountPrice: 9999,
        rating: 4.8,
        maxPeople: 20,
        featured: true,
        popular: true,
        active: true,
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        gallery: [
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
          'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
        ],
        overview: 'Experience the longest natural sea beach in the world. Cox\'s Bazar offers stunning sunsets, fresh seafood, and exciting water activities.',
        aboutDestination: 'Cox\'s Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous for its long natural sandy beach.',
        included: ['Hotel Accommodation', 'Daily Breakfast', 'Airport Transfer', 'Guided Tours', 'Entry Fees'],
        notIncluded: ['Air Tickets', 'Personal Expenses', 'Travel Insurance'],
        itinerary: [
          { day: 1, title: 'Arrival & Beach Exploration', description: 'Arrive at Cox\'s Bazar, check-in to hotel, evening beach walk and sunset viewing.' },
          { day: 2, title: 'Island Hopping', description: 'Visit Saint Martin\'s Island, snorkeling, beach activities, fresh seafood lunch.' },
          { day: 3, title: 'Local Sightseeing & Departure', description: 'Visit Himchari, Inani Beach, shopping at local markets, departure.' },
        ]
      },
      {
        id: 2,
        title: 'Sundarbans Mangrove Adventure',
        destination: 'Sundarbans',
        duration: '4 Days / 3 Nights',
        price: 18000,
        discountPrice: 15000,
        rating: 4.9,
        maxPeople: 15,
        featured: true,
        popular: false,
        active: true,
        image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800',
        gallery: [],
        overview: 'Explore the world\'s largest mangrove forest and home to the Royal Bengal Tiger.',
        aboutDestination: 'The Sundarbans is a mangrove area in the delta formed by the confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay of Bengal.',
        included: ['Boat Accommodation', 'All Meals', 'Forest Permits', 'Expert Guide'],
        notIncluded: ['Transport to Khulna', 'Tips', 'Personal Items'],
        itinerary: [
          { day: 1, title: 'Journey Begins', description: 'Travel to Khulna, board the boat, cruise into the forest.' },
          { day: 2, title: 'Deep Forest Exploration', description: 'Visit watchtowers, spot wildlife, night safari.' },
          { day: 3, title: 'Wildlife Photography', description: 'Early morning bird watching, deer spotting, visit local villages.' },
          { day: 4, title: 'Return Journey', description: 'Final cruise, return to Khulna, departure.' },
        ]
      }
    ];
  });

  const [editingPackage, setEditingPackage] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [activeEditorTab, setActiveEditorTab] = useState('basic');

  const emptyPackage = {
    id: null,
    title: '',
    destination: '',
    duration: '',
    price: 0,
    discountPrice: 0,
    rating: 0,
    maxPeople: 10,
    featured: false,
    popular: false,
    active: true,
    image: '',
    gallery: [],
    overview: '',
    aboutDestination: '',
    included: [],
    notIncluded: [],
    itinerary: []
  };

  useEffect(() => {
    localStorage.setItem('holidayPackages', JSON.stringify(packages));
  }, [packages]);

  const handleSavePackage = () => {
    if (editingPackage.id) {
      setPackages(prev => prev.map(p => p.id === editingPackage.id ? editingPackage : p));
    } else {
      const newId = Math.max(...packages.map(p => p.id), 0) + 1;
      setPackages(prev => [...prev, { ...editingPackage, id: newId }]);
    }
    setShowEditor(false);
    setEditingPackage(null);
  };

  const handleDeletePackage = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(prev => prev.filter(p => p.id !== id));
    }
  };

  const addItineraryDay = () => {
    const newDay = editingPackage.itinerary.length + 1;
    setEditingPackage(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: newDay, title: '', description: '' }]
    }));
  };

  const updateItinerary = (index, field, value) => {
    setEditingPackage(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  };

  const removeItineraryDay = (index) => {
    setEditingPackage(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 }))
    }));
  };

  const addGalleryImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      setEditingPackage(prev => ({
        ...prev,
        gallery: [...prev.gallery, url]
      }));
    }
  };

  const removeGalleryImage = (index) => {
    setEditingPackage(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const addIncludedItem = (type) => {
    const item = prompt(`Enter ${type === 'included' ? 'included' : 'not included'} item:`);
    if (item) {
      setEditingPackage(prev => ({
        ...prev,
        [type]: [...prev[type], item]
      }));
    }
  };

  const removeItem = (type, index) => {
    setEditingPackage(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const filteredPackages = packages.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const editorTabs = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'details', label: 'Details' },
    { id: 'itinerary', label: 'Itinerary' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Holiday Packages</h1>
            <p className="text-gray-400 mt-1">Manage your travel packages and destinations</p>
          </div>
          <button
            onClick={() => { setEditingPackage(emptyPackage); setShowEditor(true); setActiveEditorTab('basic'); }}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-xl flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Package
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search packages..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-slate-800 text-gray-400'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-slate-800 text-gray-400'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Packages Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredPackages.map(pkg => (
            <motion.div
              key={pkg.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'h-48'}`}>
                <img
                  src={pkg.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  {pkg.featured && (
                    <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-full">Featured</span>
                  )}
                  {pkg.popular && (
                    <span className="px-2 py-1 bg-amber-500 text-white text-xs rounded-full">Popular</span>
                  )}
                </div>
                {!pkg.active && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-semibold">Inactive</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{pkg.title}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {pkg.destination}
                  <span className="mx-1">•</span>
                  <Clock className="w-4 h-4" />
                  {pkg.duration}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-primary-400 font-bold text-lg">৳{pkg.discountPrice?.toLocaleString()}</span>
                    {pkg.price !== pkg.discountPrice && (
                      <span className="text-gray-500 line-through text-sm ml-2">৳{pkg.price?.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{pkg.rating}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => { setEditingPackage(pkg); setShowEditor(true); setActiveEditorTab('basic'); }}
                    className="flex-1 py-2 bg-primary-500/20 text-primary-400 rounded-lg flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="py-2 px-3 bg-red-500/20 text-red-400 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editor Modal */}
        <AnimatePresence>
          {showEditor && editingPackage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowEditor(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Editor Header */}
                <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {editingPackage.id ? 'Edit Package' : 'Add New Package'}
                  </h2>
                  <button onClick={() => setShowEditor(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Editor Tabs */}
                <div className="flex border-b border-slate-700 px-6">
                  {editorTabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveEditorTab(tab.id)}
                      className={`px-4 py-3 font-medium transition-colors ${
                        activeEditorTab === tab.id
                          ? 'text-primary-400 border-b-2 border-primary-400'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Editor Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {/* Basic Info Tab */}
                  {activeEditorTab === 'basic' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Package Title</label>
                          <input
                            type="text"
                            value={editingPackage.title}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                          <input
                            type="text"
                            value={editingPackage.destination}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, destination: e.target.value }))}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                          <input
                            type="text"
                            value={editingPackage.duration}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, duration: e.target.value }))}
                            placeholder="e.g., 3 Days / 2 Nights"
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Max People</label>
                          <input
                            type="number"
                            value={editingPackage.maxPeople}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, maxPeople: parseInt(e.target.value) }))}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Main Image URL</label>
                        <input
                          type="text"
                          value={editingPackage.image}
                          onChange={(e) => setEditingPackage(prev => ({ ...prev, image: e.target.value }))}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                        />
                      </div>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editingPackage.featured}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, featured: e.target.checked }))}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-gray-300">Featured</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editingPackage.popular}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, popular: e.target.checked }))}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-gray-300">Popular</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={editingPackage.active}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, active: e.target.checked }))}
                            className="w-4 h-4 rounded"
                          />
                          <span className="text-gray-300">Active</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Pricing Tab */}
                  {activeEditorTab === 'pricing' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Regular Price (৳)</label>
                          <input
                            type="number"
                            value={editingPackage.price}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, price: parseInt(e.target.value) }))}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Discount Price (৳)</label>
                          <input
                            type="number"
                            value={editingPackage.discountPrice}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, discountPrice: parseInt(e.target.value) }))}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Rating (0-5)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={editingPackage.rating}
                            onChange={(e) => setEditingPackage(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gallery Tab */}
                  {activeEditorTab === 'gallery' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Gallery Images</h3>
                        <button
                          onClick={addGalleryImage}
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Image
                        </button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {editingPackage.gallery.map((img, index) => (
                          <div key={index} className="relative group">
                            <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover rounded-xl" />
                            <button
                              onClick={() => removeGalleryImage(index)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Details Tab */}
                  {activeEditorTab === 'details' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Overview</label>
                        <textarea
                          value={editingPackage.overview}
                          onChange={(e) => setEditingPackage(prev => ({ ...prev, overview: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">About Destination</label>
                        <textarea
                          value={editingPackage.aboutDestination}
                          onChange={(e) => setEditingPackage(prev => ({ ...prev, aboutDestination: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-gray-300">What's Included</label>
                            <button onClick={() => addIncludedItem('included')} className="text-primary-400 text-sm">+ Add</button>
                          </div>
                          <div className="space-y-2">
                            {editingPackage.included.map((item, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-slate-700 rounded-lg">
                                <Check className="w-4 h-4 text-green-400" />
                                <span className="flex-1 text-gray-300">{item}</span>
                                <button onClick={() => removeItem('included', index)} className="text-red-400">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-gray-300">Not Included</label>
                            <button onClick={() => addIncludedItem('notIncluded')} className="text-primary-400 text-sm">+ Add</button>
                          </div>
                          <div className="space-y-2">
                            {editingPackage.notIncluded.map((item, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 bg-slate-700 rounded-lg">
                                <X className="w-4 h-4 text-red-400" />
                                <span className="flex-1 text-gray-300">{item}</span>
                                <button onClick={() => removeItem('notIncluded', index)} className="text-red-400">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Itinerary Tab */}
                  {activeEditorTab === 'itinerary' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Daily Itinerary</h3>
                        <button
                          onClick={addItineraryDay}
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Day
                        </button>
                      </div>
                      <div className="space-y-4">
                        {editingPackage.itinerary.map((day, index) => (
                          <div key={index} className="p-4 bg-slate-700 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                              <span className="px-3 py-1 bg-primary-500 text-white rounded-full text-sm font-semibold">
                                Day {day.day}
                              </span>
                              <button onClick={() => removeItineraryDay(index)} className="text-red-400">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <input
                              type="text"
                              value={day.title}
                              onChange={(e) => updateItinerary(index, 'title', e.target.value)}
                              placeholder="Day Title"
                              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white mb-2"
                            />
                            <textarea
                              value={day.description}
                              onChange={(e) => updateItinerary(index, 'description', e.target.value)}
                              placeholder="Day Description"
                              rows={2}
                              className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Editor Footer */}
                <div className="p-6 border-t border-slate-700 flex justify-end gap-3">
                  <button
                    onClick={() => setShowEditor(false)}
                    className="px-6 py-3 bg-slate-700 text-white rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePackage}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-500 text-white font-semibold rounded-xl flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Package
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AdminHolidays;
