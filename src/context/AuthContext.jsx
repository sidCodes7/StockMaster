// Authentication Context for StockMaster
import { createContext, useState } from 'react';
import { users } from '../data/mockData';

export const AuthContext = createContext();

// Initialize user from localStorage
const getInitialUser = () => {
  const savedUser = localStorage.getItem('stockmaster_user');
  return savedUser ? JSON.parse(savedUser) : null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const loading = false; // Loading handled by initial state

  const login = (email, password) => {
    const foundUser = users.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('stockmaster_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (name, email, password) => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      role: 'User',
      avatar: null
    };

    users.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('stockmaster_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stockmaster_user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('stockmaster_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
