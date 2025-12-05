import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  Star, 
  Check, 
  Heart,
  Share2,
  ChevronRight,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Shield,
  Award,
  Phone,
  ArrowRight,
  Sparkles,
  X,
  CheckCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const PackageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { language, formatCurrency } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    travelDate: '',
    specialRequests: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Check if package is wishlisted on load
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsWishlisted(wishlist.some(item => item.id === id));
  }, [id]);

  // Sample package data - in real app, fetch from API based on id
  const packageData = {
    1: {
      title: "Cox's Bazar Beach Paradise",
      title_bn: "কক্সবাজার সমুদ্র সৈকত প্যারাডাইস",
      destination: "Cox's Bazar, Bangladesh",
      destination_bn: "কক্সবাজার, বাংলাদেশ",
      price: 25000,
      originalPrice: 32000,
      duration: "3 Days / 2 Nights",
      duration_bn: "৩ দিন / ২ রাত",
      rating: 4.9,
      reviews: 256,
      maxPeople: 20,
      featured: true,
      popular: true,
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      ],
      description: "Experience the world's longest natural sandy beach at Cox's Bazar. Enjoy breathtaking sunrises, fresh seafood, and the serene beauty of the Bay of Bengal. This premium package includes luxury accommodation, guided tours, and unforgettable experiences.",
      description_bn: "বিশ্বের দীর্ঘতম প্রাকৃতিক বালুকাময় সমুদ্র সৈকত কক্সবাজারে অভিজ্ঞতা অর্জন করুন। মনোমুগ্ধকর সূর্যোদয়, তাজা সামুদ্রিক খাবার এবং বঙ্গোপসাগরের শান্ত সৌন্দর্য উপভোগ করুন।",
      highlights: [
        { text: "World's Longest Beach", text_bn: "বিশ্বের দীর্ঘতম সমুদ্র সৈকত" },
        { text: "Luxury Beach Resort Stay", text_bn: "বিলাসবহুল বিচ রিসোর্ট থাকা" },
        { text: "Inani Beach Visit", text_bn: "ইনানী সমুদ্র সৈকত পরিদর্শন" },
        { text: "Himchari Waterfall Tour", text_bn: "হিমছড়ি জলপ্রপাত ভ্রমণ" },
        { text: "Fresh Seafood Experience", text_bn: "তাজা সামুদ্রিক খাবার অভিজ্ঞতা" },
        { text: "Sunset Cruise (Optional)", text_bn: "সূর্যাস্ত ক্রুজ (ঐচ্ছিক)" },
      ],
      includes: [
        { icon: Hotel, text: "3-Star Hotel Accommodation", text_bn: "৩-তারা হোটেল থাকার ব্যবস্থা" },
        { icon: Utensils, text: "Breakfast & Dinner", text_bn: "সকালের নাস্তা ও রাতের খাবার" },
        { icon: Plane, text: "Airport Transfers", text_bn: "বিমানবন্দর পরিবহন" },
        { icon: Camera, text: "Sightseeing Tours", text_bn: "দর্শনীয় স্থান ভ্রমণ" },
        { icon: Users, text: "Professional Guide", text_bn: "পেশাদার গাইড" },
        { icon: Shield, text: "Travel Insurance", text_bn: "ভ্রমণ বীমা" },
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival & Beach Exploration",
          title_bn: "আগমন ও সমুদ্র সৈকত অন্বেষণ",
          activities: [
            "Arrival at Cox's Bazar Airport/Bus Station",
            "Check-in to luxury beach resort",
            "Welcome drink and orientation",
            "Evening beach walk and sunset viewing",
            "Dinner at beachfront restaurant"
          ],
          activities_bn: [
            "কক্সবাজার বিমানবন্দর/বাস স্টেশনে পৌঁছানো",
            "বিলাসবহুল বিচ রিসোর্টে চেক-ইন",
            "স্বাগত পানীয় এবং ওরিয়েন্টেশন",
            "সন্ধ্যায় সমুদ্র সৈকতে হাঁটা এবং সূর্যাস্ত দেখা",
            "সমুদ্র তীরের রেস্তোরাঁয় রাতের খাবার"
          ]
        },
        {
          day: 2,
          title: "Full Day Sightseeing",
          title_bn: "সারাদিন দর্শনীয় স্থান পরিদর্শন",
          activities: [
            "Breakfast at hotel",
            "Visit to Himchari National Park & Waterfall",
            "Explore Inani Beach with coral stones",
            "Lunch at local restaurant",
            "Marine Drive scenic tour",
            "Shopping at Burmese Market",
            "Dinner and bonfire at beach (seasonal)"
          ],
          activities_bn: [
            "হোটেলে সকালের নাস্তা",
            "হিমছড়ি জাতীয় উদ্যান ও জলপ্রপাত পরিদর্শন",
            "প্রবাল পাথর সহ ইনানী সমুদ্র সৈকত অন্বেষণ",
            "স্থানীয় রেস্তোরাঁয় দুপুরের খাবার",
            "মেরিন ড্রাইভ দর্শনীয় ভ্রমণ",
            "বার্মিজ মার্কেটে কেনাকাটা",
            "সমুদ্র সৈকতে রাতের খাবার এবং বনফায়ার (মৌসুমী)"
          ]
        },
        {
          day: 3,
          title: "Leisure & Departure",
          title_bn: "অবসর ও প্রস্থান",
          activities: [
            "Breakfast at hotel",
            "Free time for beach activities",
            "Optional: Parasailing or Jet Ski",
            "Check-out and departure",
            "Transfer to airport/bus station"
          ],
          activities_bn: [
            "হোটেলে সকালের নাস্তা",
            "সমুদ্র সৈকত কার্যক্রমের জন্য অবসর সময়",
            "ঐচ্ছিক: প্যারাসেইলিং বা জেট স্কি",
            "চেক-আউট এবং প্রস্থান",
            "বিমানবন্দর/বাস স্টেশনে স্থানান্তর"
          ]
        }
      ],
      cityHistory: "Cox's Bazar, named after Captain Hiram Cox, is home to the world's longest unbroken natural sandy beach stretching 120 km. The area has a rich history dating back to the 9th century when it was ruled by various kingdoms. Today, it's Bangladesh's most popular tourist destination, known for its stunning beaches, Buddhist temples, and vibrant local culture.",
      cityHistory_bn: "ক্যাপ্টেন হিরাম কক্সের নামে নামকরণ করা কক্সবাজার বিশ্বের দীর্ঘতম অবিচ্ছিন্ন প্রাকৃতিক বালুকাময় সমুদ্র সৈকতের আবাসস্থল যা ১২০ কিমি বিস্তৃত। এই অঞ্চলের সমৃদ্ধ ইতিহাস রয়েছে যা ৯ম শতাব্দীতে বিভিন্ন রাজ্যের শাসনের সময় থেকে শুরু। আজ, এটি বাংলাদেশের সবচেয়ে জনপ্রিয় পর্যটন গন্তব্য।"
    },
    2: {
      title: "Sundarbans Mangrove Adventure",
      title_bn: "সুন্দরবন ম্যানগ্রোভ অ্যাডভেঞ্চার",
      destination: "Sundarbans, Bangladesh",
      destination_bn: "সুন্দরবন, বাংলাদেশ",
      price: 35000,
      originalPrice: 42000,
      duration: "4 Days / 3 Nights",
      duration_bn: "৪ দিন / ৩ রাত",
      rating: 4.8,
      reviews: 189,
      maxPeople: 15,
      featured: true,
      popular: true,
      images: [
        'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800',
        'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
        'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      ],
      description: "Explore the world's largest mangrove forest and UNESCO World Heritage Site. Witness the majestic Royal Bengal Tigers, diverse wildlife, and unique ecosystem. This adventure package offers an unforgettable journey through nature's wonder.",
      description_bn: "বিশ্বের বৃহত্তম ম্যানগ্রোভ বন এবং ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থান অন্বেষণ করুন। মহিমান্বিত রয়েল বেঙ্গল টাইগার, বৈচিত্র্যময় বন্যপ্রাণী এবং অনন্য বাস্তুতন্ত্র দেখুন।",
      highlights: [
        { text: "UNESCO World Heritage Site", text_bn: "ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থান" },
        { text: "Royal Bengal Tiger Spotting", text_bn: "রয়েল বেঙ্গল টাইগার দেখা" },
        { text: "Boat Safari Experience", text_bn: "নৌকা সাফারি অভিজ্ঞতা" },
        { text: "Bird Watching", text_bn: "পাখি দেখা" },
        { text: "Fishing Village Visit", text_bn: "মাছ ধরার গ্রাম পরিদর্শন" },
        { text: "Night Stay in Forest", text_bn: "বনে রাত কাটানো" },
      ],
      includes: [
        { icon: Hotel, text: "Boat Cabin Accommodation", text_bn: "নৌকা কেবিন থাকার ব্যবস্থা" },
        { icon: Utensils, text: "All Meals Included", text_bn: "সব খাবার অন্তর্ভুক্ত" },
        { icon: Plane, text: "Transport from Dhaka", text_bn: "ঢাকা থেকে পরিবহন" },
        { icon: Camera, text: "Wildlife Safari", text_bn: "বন্যপ্রাণী সাফারি" },
        { icon: Users, text: "Expert Naturalist Guide", text_bn: "বিশেষজ্ঞ প্রকৃতিবিদ গাইড" },
        { icon: Shield, text: "Safety Equipment", text_bn: "নিরাপত্তা সরঞ্জাম" },
      ],
      itinerary: [
        {
          day: 1,
          title: "Journey to Sundarbans",
          title_bn: "সুন্দরবনে যাত্রা",
          activities: [
            "Early morning departure from Dhaka",
            "Arrive at Mongla Port",
            "Board the cruise boat",
            "Lunch on boat",
            "Enter Sundarbans",
            "Evening wildlife viewing",
            "Dinner and overnight on boat"
          ],
          activities_bn: [
            "ঢাকা থেকে সকালে রওনা",
            "মংলা বন্দরে পৌঁছানো",
            "ক্রুজ বোটে আরোহণ",
            "নৌকায় দুপুরের খাবার",
            "সুন্দরবনে প্রবেশ",
            "সন্ধ্যায় বন্যপ্রাণী দেখা",
            "রাতের খাবার এবং নৌকায় রাত কাটানো"
          ]
        },
        {
          day: 2,
          title: "Deep Forest Exploration",
          title_bn: "গভীর বন অন্বেষণ",
          activities: [
            "Sunrise wildlife viewing",
            "Breakfast on boat",
            "Kotka Wildlife Sanctuary visit",
            "Walking trail in forest",
            "Lunch break",
            "Kachikhali Tiger Point",
            "Evening bird watching",
            "Dinner on boat"
          ],
          activities_bn: [
            "সূর্যোদয়ের সময় বন্যপ্রাণী দেখা",
            "নৌকায় সকালের নাস্তা",
            "কটকা বন্যপ্রাণী অভয়ারণ্য পরিদর্শন",
            "বনে হাঁটার পথ",
            "দুপুরের খাবারের বিরতি",
            "কচিখালী টাইগার পয়েন্ট",
            "সন্ধ্যায় পাখি দেখা",
            "নৌকায় রাতের খাবার"
          ]
        },
        {
          day: 3,
          title: "Mangrove Discovery",
          title_bn: "ম্যানগ্রোভ আবিষ্কার",
          activities: [
            "Early morning tiger tracking",
            "Jamtala Sea Beach",
            "Fishing village interaction",
            "Dublar Char visit",
            "Honey collector's demonstration",
            "Traditional fishing experience",
            "Final night celebration"
          ],
          activities_bn: [
            "সকালে বাঘ অনুসন্ধান",
            "জামতলা সমুদ্র সৈকত",
            "মাছ ধরার গ্রামে মিথস্ক্রিয়া",
            "দুবলার চর পরিদর্শন",
            "মধু সংগ্রাহকের প্রদর্শন",
            "ঐতিহ্যবাহী মাছ ধরার অভিজ্ঞতা",
            "শেষ রাতের উদযাপন"
          ]
        },
        {
          day: 4,
          title: "Return Journey",
          title_bn: "ফেরার যাত্রা",
          activities: [
            "Sunrise view from boat",
            "Final forest glimpse",
            "Breakfast",
            "Depart from Sundarbans",
            "Arrive at Mongla",
            "Return to Dhaka"
          ],
          activities_bn: [
            "নৌকা থেকে সূর্যোদয় দেখা",
            "বনের শেষ দেখা",
            "সকালের নাস্তা",
            "সুন্দরবন থেকে রওনা",
            "মংলায় পৌঁছানো",
            "ঢাকায় ফেরত"
          ]
        }
      ],
      cityHistory: "The Sundarbans is the largest mangrove forest in the world, spanning across Bangladesh and India. It's a UNESCO World Heritage Site and home to the famous Royal Bengal Tiger. The forest has been protected since the early 20th century and supports a unique ecosystem with diverse flora and fauna, including rare species found nowhere else on Earth.",
      cityHistory_bn: "সুন্দরবন বিশ্বের বৃহত্তম ম্যানগ্রোভ বন, যা বাংলাদেশ এবং ভারত জুড়ে বিস্তৃত। এটি ইউনেস্কো বিশ্ব ঐতিহ্যবাহী স্থান এবং বিখ্যাত রয়েল বেঙ্গল টাইগারের আবাসস্থল।"
    },
    3: {
      title: "Maldives Luxury Escape",
      title_bn: "মালদ্বীপ বিলাসবহুল অবকাশ",
      destination: "Maldives",
      destination_bn: "মালদ্বীপ",
      price: 150000,
      originalPrice: 180000,
      duration: "5 Days / 4 Nights",
      duration_bn: "৫ দিন / ৪ রাত",
      rating: 5.0,
      reviews: 342,
      maxPeople: 2,
      featured: true,
      popular: true,
      images: [
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
        'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800',
        'https://images.unsplash.com/photo-1578922746465-3a80a228f223?w=800',
      ],
      description: "Indulge in the ultimate tropical paradise experience at Maldives. Crystal clear waters, overwater villas, world-class diving, and unparalleled luxury await you in this honeymoon special package.",
      description_bn: "মালদ্বীপে চূড়ান্ত গ্রীষ্মমণ্ডলীয় স্বর্গের অভিজ্ঞতা উপভোগ করুন। স্ফটিক স্বচ্ছ জল, ওভারওয়াটার ভিলা, বিশ্বমানের ডাইভিং এবং অতুলনীয় বিলাসিতা আপনার জন্য অপেক্ষা করছে।",
      highlights: [
        { text: "Overwater Villa Stay", text_bn: "ওভারওয়াটার ভিলায় থাকা" },
        { text: "Private Beach Access", text_bn: "প্রাইভেট বিচে প্রবেশ" },
        { text: "Snorkeling & Diving", text_bn: "স্নরকেলিং ও ডাইভিং" },
        { text: "Sunset Dolphin Cruise", text_bn: "সূর্যাস্ত ডলফিন ক্রুজ" },
        { text: "Spa & Wellness", text_bn: "স্পা ও সুস্থতা" },
        { text: "Romantic Dinner", text_bn: "রোমান্টিক ডিনার" },
      ],
      includes: [
        { icon: Hotel, text: "5-Star Overwater Villa", text_bn: "৫-তারা ওভারওয়াটার ভিলা" },
        { icon: Utensils, text: "All-Inclusive Meals", text_bn: "সব খাবার অন্তর্ভুক্ত" },
        { icon: Plane, text: "Return Flights", text_bn: "ফেরত ফ্লাইট" },
        { icon: Camera, text: "Island Hopping", text_bn: "আইল্যান্ড হপিং" },
        { icon: Users, text: "Personal Butler", text_bn: "ব্যক্তিগত বাটলার" },
        { icon: Shield, text: "Premium Insurance", text_bn: "প্রিমিয়াম বীমা" },
      ],
      itinerary: [
        { day: 1, title: "Arrival in Paradise", title_bn: "স্বর্গে আগমন", activities: ["Arrive at Male Airport", "Seaplane transfer to resort", "Welcome champagne", "Villa orientation", "Sunset dinner"], activities_bn: ["মালে বিমানবন্দরে পৌঁছানো", "রিসোর্টে সিপ্লেন স্থানান্তর", "স্বাগত শ্যাম্পেন", "ভিলা ওরিয়েন্টেশন", "সূর্যাস্ত ডিনার"] },
        { day: 2, title: "Water Adventures", title_bn: "জল অ্যাডভেঞ্চার", activities: ["Breakfast in villa", "Snorkeling excursion", "Underwater restaurant lunch", "Spa treatment", "Dolphin sunset cruise"], activities_bn: ["ভিলায় সকালের নাস্তা", "স্নরকেলিং অভিযান", "আন্ডারওয়াটার রেস্তোরাঁয় দুপুরের খাবার", "স্পা চিকিৎসা", "ডলফিন সূর্যাস্ত ক্রুজ"] },
        { day: 3, title: "Island Discovery", title_bn: "দ্বীপ আবিষ্কার", activities: ["Island hopping tour", "Local village visit", "Beach picnic", "Water sports", "Starlight dinner"], activities_bn: ["আইল্যান্ড হপিং ট্যুর", "স্থানীয় গ্রাম পরিদর্শন", "বিচ পিকনিক", "ওয়াটার স্পোর্টস", "তারার আলোয় ডিনার"] },
        { day: 4, title: "Relaxation Day", title_bn: "বিশ্রামের দিন", activities: ["Leisurely breakfast", "Couples spa session", "Private pool time", "Romantic beach dinner", "Farewell celebration"], activities_bn: ["অবসরে সকালের নাস্তা", "দম্পতি স্পা সেশন", "প্রাইভেট পুলে সময়", "রোমান্টিক বিচ ডিনার", "বিদায় উদযাপন"] },
        { day: 5, title: "Departure", title_bn: "প্রস্থান", activities: ["Final breakfast", "Check-out", "Seaplane to Male", "Departure flight"], activities_bn: ["শেষ সকালের নাস্তা", "চেক-আউট", "মালেতে সিপ্লেন", "প্রস্থান ফ্লাইট"] }
      ],
      cityHistory: "The Maldives is a tropical paradise consisting of 26 atolls and over 1,000 coral islands. With a history spanning over 2,500 years, it has been influenced by various cultures including Buddhist and Islamic traditions. Today, it's one of the world's most sought-after luxury destinations, famous for its pristine beaches, vibrant marine life, and exclusive resorts.",
      cityHistory_bn: "মালদ্বীপ ২৬টি অ্যাটল এবং ১,০০০ টিরও বেশি প্রবাল দ্বীপ নিয়ে গঠিত একটি গ্রীষ্মমণ্ডলীয় স্বর্গ। ২,৫০০ বছরেরও বেশি সময় ধরে ইতিহাস রয়েছে।"
    }
  };

  const pkg = packageData[id] || packageData[1];

  const tabs = [
    { id: 'overview', label: 'Overview', label_bn: 'সংক্ষিপ্ত বিবরণ' },
    { id: 'itinerary', label: 'Itinerary', label_bn: 'যাত্রাপথ' },
    { id: 'includes', label: "What's Included", label_bn: 'অন্তর্ভুক্ত' },
    { id: 'history', label: 'About Destination', label_bn: 'গন্তব্য সম্পর্কে' },
  ];

  // Handle booking submission
  const handleBooking = () => {
    if (!bookingData.travelDate) {
      alert('Please select a travel date');
      return;
    }

    const totalAmount = pkg.price * bookingData.travelers;
    
    const newBooking = {
      id: Date.now(),
      packageId: id,
      packageTitle: pkg.title,
      destination: pkg.destination,
      customerName: user?.name || 'Guest',
      customerEmail: user?.email || '',
      customerPhone: user?.phone || '',
      travelers: bookingData.travelers,
      travelDate: bookingData.travelDate,
      specialRequests: bookingData.specialRequests,
      pricePerPerson: pkg.price,
      totalAmount: totalAmount,
      status: 'pending',
      paymentStatus: 'unpaid',
      bookedAt: new Date().toISOString(),
      package: pkg.title
    };

    // Get existing bookings from localStorage
    const existingBookings = JSON.parse(localStorage.getItem('holidayBookings') || '[]');
    
    // Add new booking
    existingBookings.push(newBooking);
    
    // Save to localStorage
    localStorage.setItem('holidayBookings', JSON.stringify(existingBookings));

    // Show success message
    setBookingSuccess(true);
    
    // Close modal after delay
    setTimeout(() => {
      setShowBookingModal(false);
      setBookingSuccess(false);
      setBookingData({ travelers: 1, travelDate: '', specialRequests: '' });
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>{language === 'bn' ? pkg.title_bn : pkg.title} | Explore Holidays</title>
      </Helmet>

      <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        {/* Hero Section with Image Gallery */}
        <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
          <motion.img
            key={selectedImage}
            src={pkg.images[selectedImage]}
            alt={pkg.title}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Top Bar - Badges and Action Buttons aligned with content */}
          <div className="absolute top-20 left-0 right-0 px-4 sm:px-6 lg:px-8 z-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              {/* Badges - Left side aligned with content */}
              <div className="flex gap-2">
                {pkg.popular && (
                  <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                    <Star className="w-4 h-4 fill-current" /> Popular
                  </span>
                )}
                {pkg.featured && (
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold shadow-lg">
                    Featured
                  </span>
                )}
              </div>
              
              {/* Action Buttons - Right side aligned with content */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsWishlisted(!isWishlisted);
                    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                    if (!isWishlisted) {
                      wishlist.push({ id, title: pkg.title, image: pkg.images[0], price: pkg.price });
                      localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    } else {
                      const filtered = wishlist.filter(item => item.id !== id);
                      localStorage.setItem('wishlist', JSON.stringify(filtered));
                    }
                  }}
                  className={`w-11 h-11 rounded-xl backdrop-blur-md shadow-lg border transition-all flex items-center justify-center ${
                    isWishlisted 
                      ? 'bg-red-500 text-white border-red-400' 
                      : 'bg-white/90 text-gray-700 border-white/50 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: pkg.title,
                        text: `Check out this amazing package: ${pkg.title}`,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg border border-white/20 flex items-center justify-center hover:shadow-xl transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Title Overlay - Aligned with content */}
          <div className="absolute bottom-24 left-0 right-0 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 text-white/80 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span>{language === 'bn' ? pkg.destination_bn : pkg.destination}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">
                  {language === 'bn' ? pkg.title_bn : pkg.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-400 fill-current" />
                    <span className="font-semibold">{pkg.rating}</span>
                    <span className="text-white/60">({pkg.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>{language === 'bn' ? pkg.duration_bn : pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-5 h-5" />
                    <span>Max {pkg.maxPeople} people</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          {/* Thumbnail Gallery - Full width aligned row */}
          <div className="flex gap-2 mb-6">
            {pkg.images.map((img, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedImage(idx)}
                className={`w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden border-2 transition-all shadow-lg ${
                  selectedImage === idx 
                    ? 'border-primary-500 ring-2 ring-primary-500/50' 
                    : isDark ? 'border-slate-600 bg-slate-800' : 'border-white bg-white'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className={`rounded-2xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl p-2 mb-8`}>
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                          : isDark
                            ? 'text-gray-400 hover:text-white'
                            : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {language === 'bn' ? tab.label_bn : tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-3xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-xl p-8`}
              >
                {activeTab === 'overview' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'bn' ? 'প্যাকেজ বিবরণ' : 'Package Description'}
                    </h2>
                    <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {language === 'bn' ? pkg.description_bn : pkg.description}
                    </p>
                    
                    <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'bn' ? 'হাইলাইটস' : 'Highlights'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pkg.highlights.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`flex items-center gap-3 p-4 rounded-xl ${
                            isDark ? 'bg-slate-700/50' : 'bg-gray-50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                          <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                            {language === 'bn' ? item.text_bn : item.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div className="space-y-6">
                    <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'bn' ? 'যাত্রাপথ' : 'Day by Day Itinerary'}
                    </h2>
                    {pkg.itinerary.map((day, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`relative pl-8 pb-8 border-l-2 ${
                          isDark ? 'border-slate-600' : 'border-gray-200'
                        } last:border-0`}
                      >
                        <div className="absolute left-0 top-0 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                          {day.day}
                        </div>
                        <div className={`ml-6 p-6 rounded-2xl ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                          <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {language === 'bn' ? day.title_bn : day.title}
                          </h3>
                          <ul className="space-y-2">
                            {(language === 'bn' ? day.activities_bn : day.activities).map((activity, actIdx) => (
                              <li key={actIdx} className={`flex items-start gap-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                <ChevronRight className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'includes' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'bn' ? 'কি অন্তর্ভুক্ত' : "What's Included"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pkg.includes.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-center gap-4 p-5 rounded-2xl ${
                              isDark ? 'bg-slate-700/50' : 'bg-gray-50'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                              {language === 'bn' ? item.text_bn : item.text}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'history' && (
                  <div>
                    <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'bn' ? 'গন্তব্য সম্পর্কে' : 'About the Destination'}
                    </h2>
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-slate-700/50' : 'bg-gradient-to-br from-primary-50 to-secondary-50'}`}>
                      <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'bn' ? pkg.cityHistory_bn : pkg.cityHistory}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`sticky top-24 rounded-3xl ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-2xl p-8`}
              >
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {formatCurrency(pkg.price)}
                    </span>
                    <span className={`text-lg line-through ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {formatCurrency(pkg.originalPrice)}
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {language === 'bn' ? 'প্রতি জন' : 'per person'}
                  </p>
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm font-semibold">
                    <Sparkles className="w-4 h-4 mr-1" />
                    {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                  </div>
                </div>

                {/* Quick Info */}
                <div className={`space-y-4 mb-6 pb-6 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      <Clock className="w-4 h-4 inline mr-2" />
                      {language === 'bn' ? 'সময়কাল' : 'Duration'}
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {language === 'bn' ? pkg.duration_bn : pkg.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      <Users className="w-4 h-4 inline mr-2" />
                      {language === 'bn' ? 'সর্বোচ্চ' : 'Max People'}
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.maxPeople}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                      <Star className="w-4 h-4 inline mr-2" />
                      {language === 'bn' ? 'রেটিং' : 'Rating'}
                    </span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.rating} ({pkg.reviews})
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <motion.button
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate('/login', { state: { from: `/holidays/${id}` } });
                    } else {
                      setShowBookingModal(true);
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {language === 'bn' ? 'এখনই বুক করুন' : 'Book Now'}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Contact */}
                <div className="mt-6 text-center">
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                    {language === 'bn' ? 'সাহায্য দরকার?' : 'Need help?'}
                  </p>
                  <a
                    href="tel:+8801234567890"
                    className="inline-flex items-center gap-2 text-primary-500 font-semibold hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    +880 1234-567890
                  </a>
                </div>

                {/* Trust Badges */}
                <div className={`mt-6 pt-6 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <Shield className="w-8 h-8 mx-auto text-green-500 mb-1" />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Secure</span>
                    </div>
                    <div className="text-center">
                      <Award className="w-8 h-8 mx-auto text-amber-500 mb-1" />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Best Price</span>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 mx-auto text-blue-500 mb-1" />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>24/7</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-20" />

        {/* Booking Modal */}
        <AnimatePresence>
          {showBookingModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => !bookingSuccess && setShowBookingModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-md rounded-3xl overflow-hidden shadow-2xl ${
                  isDark ? 'bg-slate-800' : 'bg-white'
                }`}
              >
                {bookingSuccess ? (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Booking Confirmed!
                    </h2>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                      Your booking has been submitted. We'll contact you shortly.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Modal Header */}
                    <div className="relative h-32 bg-gradient-to-r from-primary-500 to-secondary-500">
                      <button
                        onClick={() => setShowBookingModal(false)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-4 left-6 text-white">
                        <h3 className="text-xl font-bold">Book This Package</h3>
                        <p className="text-white/80 text-sm">{pkg.title}</p>
                      </div>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 space-y-4">
                      {/* Price Summary */}
                      <div className={`p-4 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-center">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Price per person</span>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatCurrency(pkg.price)}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Total ({bookingData.travelers} travelers)</span>
                          <span className="font-bold text-primary-500 text-xl">{formatCurrency(pkg.price * bookingData.travelers)}</span>
                        </div>
                      </div>

                      {/* Travelers */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Number of Travelers
                        </label>
                        <select
                          value={bookingData.travelers}
                          onChange={(e) => setBookingData({...bookingData, travelers: parseInt(e.target.value)})}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                          }`}
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                          ))}
                        </select>
                      </div>

                      {/* Travel Date */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Travel Date
                        </label>
                        <input
                          type="date"
                          value={bookingData.travelDate}
                          onChange={(e) => setBookingData({...bookingData, travelDate: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            isDark ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-gray-200 text-gray-900'
                          }`}
                        />
                      </div>

                      {/* Special Requests */}
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          Special Requests (Optional)
                        </label>
                        <textarea
                          value={bookingData.specialRequests}
                          onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                          rows={3}
                          placeholder="Any special requirements..."
                          className={`w-full px-4 py-3 rounded-xl border resize-none ${
                            isDark ? 'bg-slate-700 border-slate-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                          }`}
                        />
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        onClick={handleBooking}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold rounded-xl shadow-lg"
                      >
                        Confirm Booking
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PackageDetailPage;
