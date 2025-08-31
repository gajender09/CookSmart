import React from 'react';
import { RecipeCard } from './RecipeCard';
import { RecipeCard as RecipeCardType } from '../types/recipe';

interface RecipeGridProps {
  recipes: RecipeCardType[];
  onRecipeClick: (recipeId: string) => void;
  favorites: string[];
  onToggleFavorite: (recipeId: string) => void;
}

/**
 * Responsive grid layout for recipe cards
 */
export const RecipeGrid: React.FC<RecipeGridProps> = ({ 
  recipes, 
  onRecipeClick, 
  favorites,
  onToggleFavorite 
}) => {
  if (recipes.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onClick={onRecipeClick}
            isFavorite={favorites.includes(recipe.idMeal)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
          <span>🍽️</span>
          Found {recipes.length} delicious recipe{recipes.length !== 1 ? 's' : ''} for you
        </div>
      </div>
    </div>
  );
};