import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// Mock user data for demo purposes
const mockUsers = {
  admin: {
    id: '1',
    email: 'admin@ophysio.com',
    password: 'admin123',
    name: 'Dr. Rajesh Kumar',
    role: 'admin',
  },
  doctor: {
    id: '2',
    email: 'doctor@ophysio.com',
    password: 'doctor123',
    name: 'Dr. Sarah Chandrashekhar',
    role: 'doctor',
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('ophysio_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('ophysio_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (credentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = mockUsers[credentials.role];
    
    if (mockUser.email === credentials.email && mockUser.password === credentials.password) {
      const user = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role
      };

      localStorage.setItem('ophysio_user', JSON.stringify(user));
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
      return true;
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('ophysio_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};