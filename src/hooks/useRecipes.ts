import { useState } from 'react';
import { RecipeCard, Recipe } from '../types/recipe';
import { 
  searchRecipesByIngredient, 
  getRecipeDetails, 
  getCategories,
  searchRecipesByCategory 
} from '../services/api';

/**
 * Custom hook for managing recipe search and data fetching
 */
export const useRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeCard[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Search for recipes by ingredient(s)
   */
  const searchByIngredient = async (ingredients: string) => {
    if (!ingredients.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchRecipesByIngredient(ingredients);
      setRecipes(response.meals || []);
      
      if (!response.meals || response.meals.length === 0) {
        setError('No recipes found for the given ingredient(s). Try a different ingredient!');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Search for recipes by category
   */
  const searchByCategory = async (category: string) => {
    if (!category.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchRecipesByCategory(category);
      setRecipes(response.meals || []);
      
      if (!response.meals || response.meals.length === 0) {
        setError('No recipes found in this category.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch detailed recipe information
   */
  const fetchRecipeDetails = async (mealId: string) => {
    setIsLoadingDetails(true);
    
    try {
      const response = await getRecipeDetails(mealId);
      
      if (response.meals && response.meals.length > 0) {
        setSelectedRecipe(response.meals[0]);
      } else {
        setError('Recipe details not found.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load recipe details');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  /**
   * Load available categories
   */
  const loadCategories = async () => {
    try {
      const response = await getCategories();
      
      if (response.meals) {
        setCategories(response.meals.map(cat => cat.strCategory));
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  /**
   * Clear current search results
   */
  const clearResults = () => {
    setRecipes([]);
    setError(null);
  };

  /**
   * Close recipe details modal
   */
  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return {
    recipes,
    selectedRecipe,
    categories,
    isLoading,
    isLoadingDetails,
    error,
    searchByIngredient,
    searchByCategory,
    fetchRecipeDetails,
    loadCategories,
    clearResults,
    closeRecipeDetails
  };
};