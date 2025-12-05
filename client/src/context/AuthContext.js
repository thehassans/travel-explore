import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // In production, this would be an API call
      // For demo, we'll simulate authentication
      const mockUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          avatar: foundUser.avatar,
          provider: foundUser.provider || 'email'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, error: 'Invalid email or password' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, password, phone = '') => {
    try {
      const mockUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Check if user exists
      if (mockUsers.find(u => u.email === email)) {
        return { success: false, error: 'Email already registered' };
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
        provider: 'email',
        createdAt: new Date().toISOString()
      };

      mockUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));

      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        provider: 'email'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Simulate Google OAuth - in production, use Firebase or OAuth library
      // For demo purposes, we'll create a mock Google user
      const googleUser = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=ea4335&color=fff',
        provider: 'google',
        createdAt: new Date().toISOString()
      };

      // Store in registered users
      const mockUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      if (!mockUsers.find(u => u.email === googleUser.email)) {
        mockUsers.push(googleUser);
        localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));
      }

      const userData = {
        id: googleUser.id,
        name: googleUser.name,
        email: googleUser.email,
        avatar: googleUser.avatar,
        provider: 'google'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('registeredUsers') || '[]');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    getAllUsers,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
