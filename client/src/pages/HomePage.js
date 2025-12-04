import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroBanner from '../components/home/HeroBanner';
import PopularPackages from '../components/home/PopularPackages';
import LatestServices from '../components/home/LatestServices';
import Partners from '../components/home/Partners';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Explore Holidays | Premium Travel Booking from Bangladesh</title>
        <meta name="description" content="Book flights, holiday packages, visas, and tours from Bangladesh. Best prices guaranteed with 24/7 support." />
        <meta name="keywords" content="travel bangladesh, flights dhaka, holiday packages, visa services, tours bangladesh" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <HeroBanner />
      <PopularPackages />
      <LatestServices />
      <WhyChooseUs />
      <Testimonials />
      <Partners />
    </>
  );
};

export default HomePage;
