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

  const loginWithGoogle = () => {
    return new Promise((resolve) => {
      // Use Google Identity Services
      const GOOGLE_CLIENT_ID = '441695171634-vqkl1v2n9s3qk8k4q1p6h8j2m5n0o1r3.apps.googleusercontent.com';
      
      // Load Google Identity Services script if not loaded
      if (!window.google) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => initGoogleSignIn(resolve);
        document.body.appendChild(script);
      } else {
        initGoogleSignIn(resolve);
      }

      function initGoogleSignIn(resolvePromise) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => handleGoogleCallback(response, resolvePromise),
            auto_select: false,
          });
          
          // Show the One Tap prompt or popup
          window.google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
              // Fallback: use popup mode
              window.google.accounts.oauth2.initTokenClient({
                client_id: GOOGLE_CLIENT_ID,
                scope: 'email profile',
                callback: (tokenResponse) => {
                  if (tokenResponse.access_token) {
                    // Fetch user info with the access token
                    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                      headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                    })
                    .then(res => res.json())
                    .then(userInfo => {
                      const googleUser = {
                        id: 'google_' + userInfo.sub,
                        name: userInfo.name,
                        email: userInfo.email,
                        avatar: userInfo.picture,
                        provider: 'google',
                        createdAt: new Date().toISOString()
                      };
                      saveGoogleUser(googleUser, resolvePromise);
                    })
                    .catch(() => resolvePromise({ success: false, error: 'Failed to get user info' }));
                  }
                },
              }).requestAccessToken();
            }
          });
        } catch (error) {
          resolvePromise({ success: false, error: error.message });
        }
      }

      function handleGoogleCallback(response, resolvePromise) {
        try {
          // Decode JWT token from credential
          const payload = JSON.parse(atob(response.credential.split('.')[1]));
          const googleUser = {
            id: 'google_' + payload.sub,
            name: payload.name,
            email: payload.email,
            avatar: payload.picture,
            provider: 'google',
            createdAt: new Date().toISOString()
          };
          saveGoogleUser(googleUser, resolvePromise);
        } catch (error) {
          resolvePromise({ success: false, error: error.message });
        }
      }

      function saveGoogleUser(googleUser, resolvePromise) {
        // Store in registered users
        const mockUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const existingIndex = mockUsers.findIndex(u => u.email === googleUser.email);
        if (existingIndex >= 0) {
          mockUsers[existingIndex] = { ...mockUsers[existingIndex], ...googleUser };
        } else {
          mockUsers.push(googleUser);
        }
        localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));

        const userData = {
          id: googleUser.id,
          name: googleUser.name,
          email: googleUser.email,
          avatar: googleUser.avatar,
          provider: 'google'
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        resolvePromise({ success: true });
      }
    });
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
