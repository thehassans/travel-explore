import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    return { 
      bookings: [], 
      addBooking: () => {},
      getBookings: () => [],
      cancelBooking: () => {},
      loading: false
    };
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load bookings from localStorage on mount
  useEffect(() => {
    if (user) {
      loadBookings();
    } else {
      setBookings([]);
    }
  }, [user]);

  const loadBookings = useCallback(() => {
    const storedBookings = localStorage.getItem(`bookings_${user?.email}`);
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, [user]);

  const saveBookings = (newBookings) => {
    if (user) {
      localStorage.setItem(`bookings_${user.email}`, JSON.stringify(newBookings));
    }
  };

  // Add a new booking
  const addBooking = useCallback((bookingData) => {
    const newBooking = {
      id: `BK${Date.now()}`,
      ...bookingData,
      userId: user?.email,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setBookings(prev => {
      const updated = [newBooking, ...prev];
      saveBookings(updated);
      return updated;
    });

    return newBooking;
  }, [user]);

  // Get all bookings for current user
  const getBookings = useCallback((type = null) => {
    if (type) {
      return bookings.filter(b => b.type === type);
    }
    return bookings;
  }, [bookings]);

  // Get booking by ID
  const getBookingById = useCallback((id) => {
    return bookings.find(b => b.id === id);
  }, [bookings]);

  // Cancel a booking
  const cancelBooking = useCallback((bookingId) => {
    setBookings(prev => {
      const updated = prev.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      );
      saveBookings(updated);
      return updated;
    });
  }, []);

  // Update booking status
  const updateBookingStatus = useCallback((bookingId, status) => {
    setBookings(prev => {
      const updated = prev.map(b => 
        b.id === bookingId ? { ...b, status } : b
      );
      saveBookings(updated);
      return updated;
    });
  }, []);

  const value = {
    bookings,
    loading,
    addBooking,
    getBookings,
    getBookingById,
    cancelBooking,
    updateBookingStatus,
    loadBookings
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
