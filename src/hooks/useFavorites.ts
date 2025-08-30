import { useState, useEffect } from 'react';
import { 
  getFavorites, 
  addToFavorites as addFavorite, 
  removeFromFavorites as removeFavorite,
  isFavorite as checkIsFavorite 
} from '../utils/storage';

/**
 * Custom hook for managing recipe favorites with localStorage persistence
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from localStorage on mount
    setFavorites(getFavorites());
  }, []);

  const addToFavorites = (recipeId: string) => {
    addFavorite(recipeId);
    setFavorites(getFavorites());
  };

  const removeFromFavorites = (recipeId: string) => {
    removeFavorite(recipeId);
    setFavorites(getFavorites());
  };

  const toggleFavorite = (recipeId: string) => {
    if (checkIsFavorite(recipeId)) {
      removeFromFavorites(recipeId);
    } else {
      addToFavorites(recipeId);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('recipe-favorites');
  };

  const isFavorite = (recipeId: string): boolean => {
    return favorites.includes(recipeId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    isFavorite
  };
};