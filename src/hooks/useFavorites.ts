import { useState, useEffect } from "react";
import { getFavorites, saveFavorites } from "../utils/storage";

/**
 * Custom hook for managing recipe favorites with localStorage persistence
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from localStorage on mount
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  }, []);

  const addToFavorites = (recipeId: string) => {
    const newFavorites = [...favorites, recipeId];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFromFavorites = (recipeId: string) => {
    const newFavorites = favorites.filter((id) => id !== recipeId);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = (recipeId: string) => {
    if (favorites.includes(recipeId)) {
      removeFromFavorites(recipeId);
    } else {
      addToFavorites(recipeId);
    }
  };

  const isFavorite = (recipeId: string): boolean => {
    return favorites.includes(recipeId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.length,
  };
};
