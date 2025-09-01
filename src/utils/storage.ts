import { ShoppingItem } from '../types/recipe';

/**
 * Utility functions for localStorage operations
 */

const FAVORITES_KEY = 'recipe-favorites';
const SHOPPING_LIST_KEY = 'recipe-shopping-list';
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
 * Get shopping list from localStorage
 */
export const getShoppingList = (): ShoppingItem[] => {
  try {
    const list = localStorage.getItem(SHOPPING_LIST_KEY);
    return list ? JSON.parse(list) : [];
  } catch (error) {
    console.error('Error reading shopping list from localStorage:', error);
    return [];
  }
};

/**
 * Save shopping list to localStorage
 */
export const saveShoppingList = (list: ShoppingItem[]): void => {
  try {
    localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(list));
  } catch (error) {
    console.error('Error saving shopping list to localStorage:', error);
  }
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