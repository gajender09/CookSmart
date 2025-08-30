import { 
  RecipeSearchResponse, 
  RecipeDetailsResponse, 
  CategoryResponse 
} from '../types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Search recipes by ingredient(s)
 * Supports multiple ingredients separated by commas
 */
export const searchRecipesByIngredient = async (ingredients: string): Promise<RecipeSearchResponse> => {
  try {
    // For multiple ingredients, we'll search by the first one
    // TheMealDB doesn't support multi-ingredient search in a single API call
    const primaryIngredient = ingredients.split(',')[0].trim();
    const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(primaryIngredient)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw new Error('Failed to search recipes. Please try again.');
  }
};

/**
 * Fetch detailed recipe information by meal ID
 */
export const getRecipeDetails = async (mealId: string): Promise<RecipeDetailsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(mealId)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw new Error('Failed to load recipe details. Please try again.');
  }
};

/**
 * Fetch all available recipe categories
 */
export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/list.php?c=list`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to load categories. Please try again.');
  }
};

/**
 * Search recipes by category
 */
export const searchRecipesByCategory = async (category: string): Promise<RecipeSearchResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching recipes by category:', error);
    throw new Error('Failed to search recipes by category. Please try again.');
  }
};