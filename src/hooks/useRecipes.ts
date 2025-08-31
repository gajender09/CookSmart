import { useState } from 'react';
import { RecipeCard, Recipe } from '../types/recipe';
import { 
  searchRecipesByIngredient, 
  getRecipeDetails, 
  getCategories,
  searchRecipesByCategory 
} from '../services/api';

/**
 * Enhanced hook for managing recipe search with optimized API calls
 */
export const useRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeCard[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Search for recipes by ingredient(s) with multi-ingredient support
   */
  const searchByIngredient = async (ingredients: string) => {
    if (!ingredients.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      // Split ingredients and search for each
      const ingredientList = ingredients.split(',').map(i => i.trim()).filter(i => i);
      const searchPromises = ingredientList.map(ingredient => 
        searchRecipesByIngredient(ingredient)
      );
      
      const responses = await Promise.all(searchPromises);
      
      // Combine and deduplicate results
      const allRecipes = new Map<string, RecipeCard>();
      const recipeScores = new Map<string, number>();
      
      responses.forEach((response, index) => {
        if (response.meals) {
          response.meals.forEach(recipe => {
            if (!allRecipes.has(recipe.idMeal)) {
              allRecipes.set(recipe.idMeal, recipe);
              recipeScores.set(recipe.idMeal, 1);
            } else {
              // Increase score for recipes that match multiple ingredients
              recipeScores.set(recipe.idMeal, (recipeScores.get(recipe.idMeal) || 0) + 1);
            }
          });
        }
      });
      
      // Sort by score (recipes matching more ingredients first)
      const sortedRecipes = Array.from(allRecipes.values()).sort((a, b) => {
        const scoreA = recipeScores.get(a.idMeal) || 0;
        const scoreB = recipeScores.get(b.idMeal) || 0;
        return scoreB - scoreA;
      });
      
      setRecipes(sortedRecipes);
      
      if (sortedRecipes.length === 0) {
        setError('No recipes found for the given ingredient(s). Try popular ingredients like chicken, pasta, or tomato!');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Search for recipes by category with caching
   */
  const searchByCategory = async (category: string) => {
    if (!category.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchRecipesByCategory(category);
      setRecipes(response.meals || []);
      
      if (!response.meals || response.meals.length === 0) {
        setError(`No recipes found in the ${category} category.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetch detailed recipe information with caching
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
   * Load available categories with error handling
   */
  const loadCategories = async () => {
    try {
      const response = await getCategories();
      
      if (response.meals) {
        const categoryNames = response.meals.map(cat => cat.strCategory);
        setCategories(categoryNames);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
      // Set fallback categories if API fails
      setCategories([
        'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 
        'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'
      ]);
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