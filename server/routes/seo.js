const express = require('express');
const router = express.Router();

// SEO metadata for different pages
const seoData = {
  home: {
    title: "Explore Holidays | Premium Travel Booking from Bangladesh",
    title_bn: "এক্সপ্লোর হলিডেস | বাংলাদেশ থেকে প্রিমিয়াম ট্রাভেল বুকিং",
    description: "Book flights, holiday packages, visas, and tours from Bangladesh. Best prices guaranteed for international travel.",
    description_bn: "বাংলাদেশ থেকে ফ্লাইট, হলিডে প্যাকেজ, ভিসা এবং ট্যুর বুক করুন। আন্তর্জাতিক ভ্রমণের জন্য সেরা মূল্যের নিশ্চয়তা।",
    keywords: "travel bangladesh, flight booking dhaka, holiday packages bd, visa services, tours from bangladesh"
  },
  flights: {
    title: "Flight Booking | Explore Holidays",
    title_bn: "ফ্লাইট বুকিং | এক্সপ্লোর হলিডেস",
    description: "Book domestic and international flights from Bangladesh at the best prices.",
    description_bn: "বাংলাদেশ থেকে সেরা মূল্যে দেশীয় এবং আন্তর্জাতিক ফ্লাইট বুক করুন।",
    keywords: "flight booking, dhaka flights, international flights bangladesh, cheap flights"
  },
  holidays: {
    title: "Holiday Packages | Explore Holidays",
    title_bn: "হলিডে প্যাকেজ | এক্সপ্লোর হলিডেস",
    description: "Discover amazing holiday packages to destinations worldwide from Bangladesh.",
    description_bn: "বাংলাদেশ থেকে বিশ্বব্যাপী গন্তব্যে আশ্চর্যজনক হলিডে প্যাকেজ আবিষ্কার করুন।",
    keywords: "holiday packages, vacation packages bangladesh, tour packages, travel packages"
  },
  visas: {
    title: "Visa Services | Explore Holidays",
    title_bn: "ভিসা সেবা | এক্সপ্লোর হলিডেস",
    description: "Professional visa processing services for all countries from Bangladesh.",
    description_bn: "বাংলাদেশ থেকে সব দেশের জন্য পেশাদার ভিসা প্রসেসিং সেবা।",
    keywords: "visa services, visa processing bangladesh, tourist visa, business visa"
  },
  about: {
    title: "About Us | Explore Holidays",
    title_bn: "আমাদের সম্পর্কে | এক্সপ্লোর হলিডেস",
    description: "Learn about Explore Holidays - Your trusted travel partner in Bangladesh.",
    description_bn: "এক্সপ্লোর হলিডেস সম্পর্কে জানুন - বাংলাদেশে আপনার বিশ্বস্ত ভ্রমণ সঙ্গী।",
    keywords: "about explore holidays, travel agency bangladesh, trusted travel partner"
  },
  contact: {
    title: "Contact Us | Explore Holidays",
    title_bn: "যোগাযোগ করুন | এক্সপ্লোর হলিডেস",
    description: "Get in touch with Explore Holidays for all your travel needs.",
    description_bn: "আপনার সমস্ত ভ্রমণ প্রয়োজনের জন্য এক্সপ্লোর হলিডেসের সাথে যোগাযোগ করুন।",
    keywords: "contact explore holidays, travel agency contact, customer support"
  }
};

// Get SEO data for a page
router.get('/:page', (req, res) => {
  const { page } = req.params;
  const data = seoData[page] || seoData.home;
  
  res.json({ 
    success: true, 
    data: {
      ...data,
      canonicalUrl: `${process.env.APP_URL || 'http://localhost:3000'}/${page === 'home' ? '' : page}`,
      ogImage: `${process.env.APP_URL || 'http://localhost:3000'}/og-image.jpg`
    }
  });
});

// Get sitemap data
router.get('/sitemap/data', (req, res) => {
  const pages = Object.keys(seoData).map(page => ({
    url: `${process.env.APP_URL || 'http://localhost:3000'}/${page === 'home' ? '' : page}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: page === 'home' ? 1.0 : 0.8
  }));
  
  res.json({ success: true, data: pages });
});

module.exports = router;
