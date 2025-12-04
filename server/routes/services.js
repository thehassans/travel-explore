const express = require('express');
const router = express.Router();

// Sample services data
const sampleServices = [
  {
    id: 1,
    title: "Flight Booking",
    title_bn: "ফ্লাইট বুকিং",
    description: "Book domestic and international flights at best prices",
    description_bn: "সেরা মূল্যে দেশীয় এবং আন্তর্জাতিক ফ্লাইট বুক করুন",
    icon: "Plane",
    image_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
    is_latest: true
  },
  {
    id: 2,
    title: "Holiday Packages",
    title_bn: "হলিডে প্যাকেজ",
    description: "Curated holiday packages for every budget",
    description_bn: "প্রতিটি বাজেটের জন্য বিশেষভাবে সাজানো হলিডে প্যাকেজ",
    icon: "Palmtree",
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    is_latest: true
  },
  {
    id: 3,
    title: "Visa Services",
    title_bn: "ভিসা সেবা",
    description: "Hassle-free visa processing for all countries",
    description_bn: "সব দেশের জন্য ঝামেলামুক্ত ভিসা প্রসেসিং",
    icon: "FileCheck",
    image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    is_latest: true
  },
  {
    id: 4,
    title: "Hotel Booking",
    title_bn: "হোটেল বুকিং",
    description: "Premium hotels and resorts worldwide",
    description_bn: "বিশ্বব্যাপী প্রিমিয়াম হোটেল এবং রিসোর্ট",
    icon: "Building2",
    image_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    is_latest: true
  },
  {
    id: 5,
    title: "Group Tours",
    title_bn: "গ্রুপ ট্যুর",
    description: "Exciting group tour packages with experienced guides",
    description_bn: "অভিজ্ঞ গাইড সহ উত্তেজনাপূর্ণ গ্রুপ ট্যুর প্যাকেজ",
    icon: "Users",
    image_url: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800",
    is_latest: true
  },
  {
    id: 6,
    title: "Travel Insurance",
    title_bn: "ভ্রমণ বীমা",
    description: "Comprehensive travel insurance coverage",
    description_bn: "ব্যাপক ভ্রমণ বীমা কভারেজ",
    icon: "Shield",
    image_url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    is_latest: false
  }
];

// Get all services
router.get('/', (req, res) => {
  const { latest, limit } = req.query;
  
  let filtered = [...sampleServices];
  
  if (latest === 'true') {
    filtered = filtered.filter(s => s.is_latest);
  }
  if (limit) {
    filtered = filtered.slice(0, parseInt(limit));
  }
  
  res.json({ success: true, data: filtered });
});

// Get single service
router.get('/:id', (req, res) => {
  const service = sampleServices.find(s => s.id === parseInt(req.params.id));
  if (!service) {
    return res.status(404).json({ success: false, error: 'Service not found' });
  }
  res.json({ success: true, data: service });
});

module.exports = router;
