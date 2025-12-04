const express = require('express');
const router = express.Router();

// In-memory storage (replace with database in production)
let queries = [
  { id: 1, name: 'Rashid Ahmed', email: 'rashid@example.com', phone: '+880 1712345678', subject: 'Dubai Package Inquiry', message: 'I want to know more about the Dubai package for 4 persons.', status: 'pending', createdAt: '2024-12-01T10:00:00Z' },
  { id: 2, name: 'Fatima Khan', email: 'fatima@example.com', phone: '+880 1812345678', subject: 'Visa Processing Time', message: 'How long does Singapore visa take?', status: 'replied', createdAt: '2024-12-02T14:30:00Z' },
  { id: 3, name: 'Mohammad Hasan', email: 'hasan@example.com', phone: '+880 1912345678', subject: 'Group Tour Booking', message: 'Want to book for 10 persons Thailand tour.', status: 'pending', createdAt: '2024-12-03T09:15:00Z' },
];

let bookings = [
  { id: 1, bookingId: 'EH-2024-001', customerName: 'Karim Uddin', email: 'karim@example.com', phone: '+880 1712345678', package: 'Dubai City Explorer', persons: 2, totalAmount: 170000, status: 'confirmed', paymentStatus: 'paid', travelDate: '2024-12-20', createdAt: '2024-12-01T10:00:00Z' },
  { id: 2, bookingId: 'EH-2024-002', customerName: 'Salma Begum', email: 'salma@example.com', phone: '+880 1812345678', package: 'Maldives Luxury Escape', persons: 2, totalAmount: 300000, status: 'pending', paymentStatus: 'partial', travelDate: '2024-12-25', createdAt: '2024-12-02T11:30:00Z' },
  { id: 3, bookingId: 'EH-2024-003', customerName: 'Rahim Sheikh', email: 'rahim@example.com', phone: '+880 1912345678', package: 'Thailand Adventure', persons: 4, totalAmount: 260000, status: 'confirmed', paymentStatus: 'paid', travelDate: '2024-12-28', createdAt: '2024-12-03T15:45:00Z' },
];

let siteSettings = {
  siteName: 'Explore Holidays',
  siteTitle: 'Explore Holidays | Premium Travel Booking from Bangladesh',
  favicon: '/favicon.ico',
  contactPhone: '+880 1234-567890',
  contactEmail: 'info@exploreholidays.com',
  supportEmail: 'support@exploreholidays.com',
  address: 'House 42, Road 11, Banani, Dhaka 1213, Bangladesh',
  socialFacebook: 'https://facebook.com/exploreholidays',
  socialInstagram: 'https://instagram.com/exploreholidays',
  socialTwitter: 'https://twitter.com/exploreholidays',
  footerText: '© 2024 Explore Holidays. All rights reserved.',
};

let packages = [
  { id: 1, title: "Cox's Bazar Beach Paradise", price: 25000, category: 'holiday', isActive: true },
  { id: 2, title: "Maldives Luxury Escape", price: 150000, category: 'holiday', isActive: true },
  { id: 3, title: "Dubai City Explorer", price: 85000, category: 'holiday', isActive: true },
  { id: 4, title: "Thailand Tropical Getaway", price: 65000, category: 'holiday', isActive: true },
  { id: 5, title: "Singapore Family Fun", price: 95000, category: 'holiday', isActive: true },
  { id: 6, title: "Sundarbans Adventure", price: 35000, category: 'land', isActive: true },
];

// Admin authentication (simple for demo - use proper auth in production)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    res.json({ success: true, message: 'Login successful', token: 'admin-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Dashboard stats
router.get('/dashboard', (req, res) => {
  const stats = {
    totalQueries: queries.length,
    pendingQueries: queries.filter(q => q.status === 'pending').length,
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue: bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.totalAmount, 0),
    activePackages: packages.filter(p => p.isActive).length,
  };
  res.json({ success: true, data: stats });
});

// Queries
router.get('/queries', (req, res) => {
  res.json({ success: true, data: queries });
});

router.put('/queries/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = queries.find(q => q.id === parseInt(id));
  if (query) {
    query.status = status;
    res.json({ success: true, data: query });
  } else {
    res.status(404).json({ success: false, message: 'Query not found' });
  }
});

router.delete('/queries/:id', (req, res) => {
  const { id } = req.params;
  queries = queries.filter(q => q.id !== parseInt(id));
  res.json({ success: true, message: 'Query deleted' });
});

// Bookings
router.get('/bookings', (req, res) => {
  res.json({ success: true, data: bookings });
});

router.put('/bookings/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const booking = bookings.find(b => b.id === parseInt(id));
  if (booking) {
    Object.assign(booking, updates);
    res.json({ success: true, data: booking });
  } else {
    res.status(404).json({ success: false, message: 'Booking not found' });
  }
});

// Packages/Pricing
router.get('/packages', (req, res) => {
  res.json({ success: true, data: packages });
});

router.put('/packages/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const pkg = packages.find(p => p.id === parseInt(id));
  if (pkg) {
    Object.assign(pkg, updates);
    res.json({ success: true, data: pkg });
  } else {
    res.status(404).json({ success: false, message: 'Package not found' });
  }
});

// Site Settings
router.get('/settings', (req, res) => {
  res.json({ success: true, data: siteSettings });
});

router.put('/settings', (req, res) => {
  const updates = req.body;
  Object.assign(siteSettings, updates);
  res.json({ success: true, data: siteSettings, message: 'Settings updated successfully' });
});

module.exports = router;
