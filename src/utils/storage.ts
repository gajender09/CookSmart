/**
 * Utility functions for localStorage operations
 */

const FAVORITES_KEY = 'recipe-favorites';
const THEME_KEY = 'recipe-theme';

/**
 * Get favorite recipe IDs from localStorage
 */
export const getFavorites = (): string[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

/**
 * Save favorite recipe IDs to localStorage
 */
export const saveFavorites = (favorites: string[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

/**
 * Add recipe to favorites
 */
export const addToFavorites = (recipeId: string): void => {
  const currentFavorites = getFavorites();
  if (!currentFavorites.includes(recipeId)) {
    saveFavorites([...currentFavorites, recipeId]);
  }
};

/**
 * Remove recipe from favorites
 */
export const removeFromFavorites = (recipeId: string): void => {
  const currentFavorites = getFavorites();
  saveFavorites(currentFavorites.filter(id => id !== recipeId));
};

/**
 * Check if recipe is in favorites
 */
export const isFavorite = (recipeId: string): boolean => {
  return getFavorites().includes(recipeId);
};

/**
 * Get theme preference from localStorage
 */
export const getTheme = (): 'light' | 'dark' => {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    return (theme as 'light' | 'dark') || 'light';
  } catch (error) {
    console.error('Error reading theme from localStorage:', error);
    return 'light';
  }
};

/**
 * Save theme preference to localStorage
 */
export const saveTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};