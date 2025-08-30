import { useState, useEffect } from 'react';
import { getTheme, saveTheme } from '../utils/storage';

/**
 * Custom hook for theme management with localStorage persistence
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = getTheme();
    setTheme(savedTheme);
    
    // Apply theme to document root
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
    
    // Apply theme to document root
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };
};