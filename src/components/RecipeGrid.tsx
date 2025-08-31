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
 * Responsive grid layout for displaying recipe cards
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
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      
      <div className="text-center mt-8">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Found {recipes.length} delicious recipe{recipes.length !== 1 ? 's' : ''} 
        </p>
      </div>
    </div>
  );
};