const express = require('express');
const router = express.Router();

// Static page content
const pageContent = {
  'about-us': {
    title: 'About Us',
    title_bn: 'আমাদের সম্পর্কে',
    content: `
      <h2>Welcome to Explore Holidays</h2>
      <p>Explore Holidays is Bangladesh's premier travel agency, dedicated to making your dream vacations a reality. With over a decade of experience in the travel industry, we have helped thousands of travelers explore the world.</p>
      <h3>Our Mission</h3>
      <p>To provide exceptional travel experiences with personalized service, competitive prices, and unwavering commitment to customer satisfaction.</p>
      <h3>Why Choose Us?</h3>
      <ul>
        <li>Expert travel consultants with extensive destination knowledge</li>
        <li>Best price guarantee on flights and packages</li>
        <li>24/7 customer support</li>
        <li>Trusted by over 50,000 happy travelers</li>
      </ul>
    `,
    content_bn: `
      <h2>এক্সপ্লোর হলিডেসে স্বাগতম</h2>
      <p>এক্সপ্লোর হলিডেস বাংলাদেশের প্রধান ট্রাভেল এজেন্সি, যা আপনার স্বপ্নের ছুটিকে বাস্তবে রূপ দিতে নিবেদিত।</p>
    `
  },
  'terms-of-service': {
    title: 'Terms of Service',
    title_bn: 'সেবার শর্তাবলী',
    content: `
      <h2>Terms of Service</h2>
      <p>By using Explore Holidays services, you agree to these terms...</p>
      <h3>1. Booking Terms</h3>
      <p>All bookings are subject to availability and confirmation.</p>
      <h3>2. Payment Terms</h3>
      <p>Full payment is required at the time of booking unless otherwise specified.</p>
      <h3>3. Cancellation Policy</h3>
      <p>Cancellation charges apply based on the type of service and timing.</p>
    `,
    content_bn: `
      <h2>সেবার শর্তাবলী</h2>
      <p>এক্সপ্লোর হলিডেস সেবা ব্যবহার করে, আপনি এই শর্তাবলীতে সম্মত হচ্ছেন...</p>
    `
  },
  'contact-us': {
    title: 'Contact Us',
    title_bn: 'যোগাযোগ করুন',
    content: `
      <h2>Get in Touch</h2>
      <p>We'd love to hear from you. Contact us for any inquiries.</p>
    `,
    address: 'House 42, Road 11, Banani, Dhaka 1213, Bangladesh',
    phone: '+880 1234-567890',
    email: 'info@exploreholidays.com',
    hours: 'Saturday - Thursday: 9:00 AM - 8:00 PM'
  },
  'support': {
    title: 'Customer Support',
    title_bn: 'গ্রাহক সহায়তা',
    content: `
      <h2>How Can We Help?</h2>
      <p>Our dedicated support team is here to assist you 24/7.</p>
    `,
    hotline: '+880 1234-567890',
    email: 'support@exploreholidays.com'
  }
};

// Visa data
const visaData = [
  { country: 'UAE', processing: '3-5 days', price: 8000, requirements: ['Passport', 'Photo', 'Bank Statement'] },
  { country: 'Singapore', processing: '5-7 days', price: 5000, requirements: ['Passport', 'Photo', 'Hotel Booking'] },
  { country: 'Thailand', processing: 'On Arrival', price: 3500, requirements: ['Passport', 'Photo', 'Return Ticket'] },
  { country: 'Malaysia', processing: '3-5 days', price: 4500, requirements: ['Passport', 'Photo', 'Bank Statement'] },
  { country: 'India', processing: '2-3 days', price: 2500, requirements: ['Passport', 'Photo', 'Application Form'] },
  { country: 'UK', processing: '15-20 days', price: 15000, requirements: ['Passport', 'Photo', 'Financial Documents', 'Travel Insurance'] },
  { country: 'USA', processing: 'Interview Based', price: 18000, requirements: ['Passport', 'Photo', 'DS-160', 'Interview'] },
  { country: 'Schengen', processing: '10-15 days', price: 12000, requirements: ['Passport', 'Photo', 'Travel Insurance', 'Itinerary'] }
];

// Get page content
router.get('/page/:slug', (req, res) => {
  const { slug } = req.params;
  const content = pageContent[slug];
  
  if (!content) {
    return res.status(404).json({ success: false, error: 'Page not found' });
  }
  
  res.json({ success: true, data: content });
});

// Get visa information
router.get('/visas', (req, res) => {
  res.json({ success: true, data: visaData });
});

// Get partners
router.get('/partners', (req, res) => {
  const partners = {
    banks: [
      { name: 'BRAC Bank', logo: 'https://via.placeholder.com/120x60?text=BRAC+Bank' },
      { name: 'Dutch Bangla Bank', logo: 'https://via.placeholder.com/120x60?text=DBBL' },
      { name: 'City Bank', logo: 'https://via.placeholder.com/120x60?text=City+Bank' },
      { name: 'Eastern Bank', logo: 'https://via.placeholder.com/120x60?text=EBL' }
    ],
    airlines: [
      { name: 'Biman Bangladesh', logo: 'https://via.placeholder.com/120x60?text=Biman' },
      { name: 'Emirates', logo: 'https://via.placeholder.com/120x60?text=Emirates' },
      { name: 'Singapore Airlines', logo: 'https://via.placeholder.com/120x60?text=SQ' },
      { name: 'Qatar Airways', logo: 'https://via.placeholder.com/120x60?text=Qatar' }
    ]
  };
  
  res.json({ success: true, data: partners });
});

module.exports = router;
