import React from 'react';
import { Clock, Heart, Users } from 'lucide-react';
import { RecipeCard as RecipeCardType } from '../types/recipe';

interface RecipeCardProps {
  recipe: RecipeCardType;
  onClick: (recipeId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

/**
 * Individual recipe card component with hover effects and favorite functionality
 */
export const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  onClick, 
  isFavorite = false,
  onToggleFavorite
}) => {
  const handleCardClick = () => {
    onClick(recipe.idMeal);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card click
    if (onToggleFavorite) {
      onToggleFavorite(recipe.idMeal);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/20 overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
    >
      {/* Recipe Image */}
      <div className="relative overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg ${
              isFavorite 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 hover:scale-110'
            }`}
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-200 ${
                isFavorite ? 'fill-current' : ''
              }`} 
            />
          </button>
        )}
      </div>

      {/* Recipe Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Ready in 30 min</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="font-medium">Serves 4</span>
          </div>
        </div>
        
        <div className="text-xs text-orange-600 dark:text-orange-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Click to view full recipe →
        </div>
      </div>

      {/* Hover indicator */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};