const express = require('express');
const router = express.Router();

// Sample packages data (will be replaced with DB when connected)
const samplePackages = [
  {
    id: 1,
    title: "Cox's Bazar Beach Paradise",
    title_bn: "কক্সবাজার সমুদ্র সৈকত প্যারাডাইস",
    description: "Experience the world's longest natural sea beach with luxury accommodation",
    description_bn: "বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকতে বিলাসবহুল থাকার অভিজ্ঞতা নিন",
    destination: "Cox's Bazar, Bangladesh",
    price: 25000,
    currency: "BDT",
    duration: "3 Days / 2 Nights",
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    category: "holiday",
    is_popular: true,
    is_featured: true
  },
  {
    id: 2,
    title: "Sundarbans Mangrove Adventure",
    title_bn: "সুন্দরবন ম্যানগ্রোভ অ্যাডভেঞ্চার",
    description: "Explore the largest mangrove forest and spot Royal Bengal Tigers",
    description_bn: "বৃহত্তম ম্যানগ্রোভ বন অন্বেষণ করুন এবং রয়েল বেঙ্গল টাইগার দেখুন",
    destination: "Sundarbans, Bangladesh",
    price: 35000,
    currency: "BDT",
    duration: "4 Days / 3 Nights",
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    category: "holiday",
    is_popular: true,
    is_featured: false
  },
  {
    id: 3,
    title: "Maldives Luxury Escape",
    title_bn: "মালদ্বীপ বিলাসবহুল অবকাশ",
    description: "Crystal clear waters and overwater villas await you",
    description_bn: "স্ফটিক স্বচ্ছ জল এবং ওভারওয়াটার ভিলা আপনার জন্য অপেক্ষা করছে",
    destination: "Maldives",
    price: 150000,
    currency: "BDT",
    duration: "5 Days / 4 Nights",
    image_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    category: "holiday",
    is_popular: true,
    is_featured: true
  },
  {
    id: 4,
    title: "Dubai City Explorer",
    title_bn: "দুবাই সিটি এক্সপ্লোরার",
    description: "Discover the glamour of Dubai with shopping and desert safari",
    description_bn: "শপিং এবং ডেজার্ট সাফারি সহ দুবাইয়ের জাঁকজমক আবিষ্কার করুন",
    destination: "Dubai, UAE",
    price: 85000,
    currency: "BDT",
    duration: "4 Days / 3 Nights",
    image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    category: "holiday",
    is_popular: true,
    is_featured: true
  },
  {
    id: 5,
    title: "Thailand Tropical Getaway",
    title_bn: "থাইল্যান্ড ট্রপিক্যাল গেটওয়ে",
    description: "Bangkok temples, Phuket beaches, and Thai cuisine adventure",
    description_bn: "ব্যাংকক মন্দির, ফুকেট সৈকত এবং থাই খাবারের অ্যাডভেঞ্চার",
    destination: "Thailand",
    price: 65000,
    currency: "BDT",
    duration: "5 Days / 4 Nights",
    image_url: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
    category: "holiday",
    is_popular: true,
    is_featured: false
  },
  {
    id: 6,
    title: "Singapore Family Fun",
    title_bn: "সিঙ্গাপুর ফ্যামিলি ফান",
    description: "Universal Studios, Gardens by the Bay, and more family attractions",
    description_bn: "ইউনিভার্সাল স্টুডিওস, গার্ডেনস বাই দ্য বে এবং আরও পারিবারিক আকর্ষণ",
    destination: "Singapore",
    price: 95000,
    currency: "BDT",
    duration: "4 Days / 3 Nights",
    image_url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
    category: "holiday",
    is_popular: false,
    is_featured: true
  }
];

// Get all packages
router.get('/', (req, res) => {
  const { category, popular, featured, limit } = req.query;
  
  let filtered = [...samplePackages];
  
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  if (popular === 'true') {
    filtered = filtered.filter(p => p.is_popular);
  }
  if (featured === 'true') {
    filtered = filtered.filter(p => p.is_featured);
  }
  if (limit) {
    filtered = filtered.slice(0, parseInt(limit));
  }
  
  res.json({ success: true, data: filtered });
});

// Get single package
router.get('/:id', (req, res) => {
  const pkg = samplePackages.find(p => p.id === parseInt(req.params.id));
  if (!pkg) {
    return res.status(404).json({ success: false, error: 'Package not found' });
  }
  res.json({ success: true, data: pkg });
});

// Search packages
router.post('/search', (req, res) => {
  const { destination, departDate, returnDate, passengers } = req.body;
  
  let results = [...samplePackages];
  
  if (destination) {
    results = results.filter(p => 
      p.destination.toLowerCase().includes(destination.toLowerCase())
    );
  }
  
  res.json({ 
    success: true, 
    data: results,
    searchParams: { destination, departDate, returnDate, passengers }
  });
});

module.exports = router;
