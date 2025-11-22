// Custom hooks for StockMaster
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Authentication hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
