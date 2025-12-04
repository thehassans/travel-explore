import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      "nav.flights": "Flights",
      "nav.holidays": "Holidays",
      "nav.visas": "Visas",
      "nav.support": "Support",
      
      // Banner
      "banner.title": "Explore the World with Confidence",
      "banner.subtitle": "Premium travel experiences from Bangladesh to destinations worldwide",
      "banner.search": "Search",
      "banner.origin": "Origin",
      "banner.destination": "Destination",
      "banner.departDate": "Depart Date",
      "banner.returnDate": "Return Date",
      "banner.passengers": "Passengers",
      "banner.selectOrigin": "Select Origin",
      "banner.selectDestination": "Where to?",
      "banner.selectDate": "Select Date",
      "banner.adult": "Adult",
      "banner.adults": "Adults",
      "banner.child": "Child",
      "banner.children": "Children",
      
      // Sections
      "section.popularPackages": "Popular Packages",
      "section.popularPackagesDesc": "Handpicked destinations loved by travelers",
      "section.latestServices": "Our Services",
      "section.latestServicesDesc": "Comprehensive travel solutions for every need",
      "section.partners": "Our Partners",
      "section.partnersDesc": "Trusted partnerships for your peace of mind",
      "section.bankPartners": "Bank Partners",
      "section.airlinePartners": "Airline Partners",
      
      // Footer
      "footer.company": "Company",
      "footer.aboutUs": "About Us",
      "footer.contactUs": "Contact Us",
      "footer.termsOfService": "Terms of Service",
      "footer.careers": "Careers",
      "footer.services": "Services",
      "footer.flights": "Flight Booking",
      "footer.holidays": "Holiday Packages",
      "footer.landPackages": "Land Packages",
      "footer.groupTours": "Group Tours",
      "footer.visaServices": "Visa Services",
      "footer.usefulLinks": "Useful Links",
      "footer.support": "Support",
      "footer.faq": "FAQ",
      "footer.privacyPolicy": "Privacy Policy",
      "footer.newsletter": "Subscribe to Newsletter",
      "footer.newsletterPlaceholder": "Enter your email",
      "footer.subscribe": "Subscribe",
      "footer.rights": "All rights reserved",
      "footer.madeWith": "Made with",
      "footer.inBangladesh": "in Bangladesh",
      
      // Common
      "common.viewDetails": "View Details",
      "common.bookNow": "Book Now",
      "common.perPerson": "per person",
      "common.days": "Days",
      "common.nights": "Nights",
      "common.from": "From",
      "common.popular": "Popular",
      "common.featured": "Featured",
      "common.new": "New",
      "common.learnMore": "Learn More",
      "common.seeAll": "See All",
      "common.loading": "Loading...",
      "common.error": "Something went wrong",
      "common.noResults": "No results found",
      
      // Pages
      "page.home": "Home",
      "page.about": "About",
      "page.contact": "Contact",
      "page.terms": "Terms"
    }
  },
  bn: {
    translation: {
      // Header
      "nav.flights": "ফ্লাইট",
      "nav.holidays": "হলিডে",
      "nav.visas": "ভিসা",
      "nav.support": "সহায়তা",
      
      // Banner
      "banner.title": "আত্মবিশ্বাসের সাথে বিশ্ব অন্বেষণ করুন",
      "banner.subtitle": "বাংলাদেশ থেকে বিশ্বব্যাপী গন্তব্যে প্রিমিয়াম ভ্রমণ অভিজ্ঞতা",
      "banner.search": "অনুসন্ধান",
      "banner.origin": "যাত্রা শুরু",
      "banner.destination": "গন্তব্য",
      "banner.departDate": "যাত্রার তারিখ",
      "banner.returnDate": "ফেরার তারিখ",
      "banner.passengers": "যাত্রী",
      "banner.selectOrigin": "যাত্রা শুরু নির্বাচন করুন",
      "banner.selectDestination": "কোথায় যেতে চান?",
      "banner.selectDate": "তারিখ নির্বাচন করুন",
      "banner.adult": "প্রাপ্তবয়স্ক",
      "banner.adults": "প্রাপ্তবয়স্ক",
      "banner.child": "শিশু",
      "banner.children": "শিশু",
      
      // Sections
      "section.popularPackages": "জনপ্রিয় প্যাকেজ",
      "section.popularPackagesDesc": "ভ্রমণকারীদের পছন্দের হাতে বাছাই করা গন্তব্য",
      "section.latestServices": "আমাদের সেবা",
      "section.latestServicesDesc": "প্রতিটি প্রয়োজনের জন্য সম্পূর্ণ ভ্রমণ সমাধান",
      "section.partners": "আমাদের অংশীদার",
      "section.partnersDesc": "আপনার মানসিক শান্তির জন্য বিশ্বস্ত অংশীদারিত্ব",
      "section.bankPartners": "ব্যাংক অংশীদার",
      "section.airlinePartners": "এয়ারলাইন অংশীদার",
      
      // Footer
      "footer.company": "কোম্পানি",
      "footer.aboutUs": "আমাদের সম্পর্কে",
      "footer.contactUs": "যোগাযোগ করুন",
      "footer.termsOfService": "সেবার শর্তাবলী",
      "footer.careers": "ক্যারিয়ার",
      "footer.services": "সেবাসমূহ",
      "footer.flights": "ফ্লাইট বুকিং",
      "footer.holidays": "হলিডে প্যাকেজ",
      "footer.landPackages": "ল্যান্ড প্যাকেজ",
      "footer.groupTours": "গ্রুপ ট্যুর",
      "footer.visaServices": "ভিসা সেবা",
      "footer.usefulLinks": "উপযোগী লিংক",
      "footer.support": "সহায়তা",
      "footer.faq": "সাধারণ প্রশ্ন",
      "footer.privacyPolicy": "গোপনীয়তা নীতি",
      "footer.newsletter": "নিউজলেটার সাবস্ক্রাইব করুন",
      "footer.newsletterPlaceholder": "আপনার ইমেইল লিখুন",
      "footer.subscribe": "সাবস্ক্রাইব",
      "footer.rights": "সর্বস্বত্ব সংরক্ষিত",
      "footer.madeWith": "তৈরি করা হয়েছে",
      "footer.inBangladesh": "বাংলাদেশে",
      
      // Common
      "common.viewDetails": "বিস্তারিত দেখুন",
      "common.bookNow": "এখনই বুক করুন",
      "common.perPerson": "প্রতি জন",
      "common.days": "দিন",
      "common.nights": "রাত",
      "common.from": "থেকে",
      "common.popular": "জনপ্রিয়",
      "common.featured": "বৈশিষ্ট্যযুক্ত",
      "common.new": "নতুন",
      "common.learnMore": "আরও জানুন",
      "common.seeAll": "সব দেখুন",
      "common.loading": "লোড হচ্ছে...",
      "common.error": "কিছু ভুল হয়েছে",
      "common.noResults": "কোন ফলাফল পাওয়া যায়নি",
      
      // Pages
      "page.home": "হোম",
      "page.about": "সম্পর্কে",
      "page.contact": "যোগাযোগ",
      "page.terms": "শর্তাবলী"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
