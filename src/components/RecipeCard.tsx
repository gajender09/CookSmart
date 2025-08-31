import React from 'react';
import { Clock, Heart, Users, ChefHat } from 'lucide-react';
import { RecipeCard as RecipeCardType } from '../types/recipe';

interface RecipeCardProps {
  recipe: RecipeCardType;
  onClick: (recipeId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

/**
 * Modern recipe card with enhanced visual design
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
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(recipe.idMeal);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE2MS4wNDYgMTAwIDE3MCA5MS4wNDU3IDE3MCA4MEMxNzAgNjguOTU0MyAxNjEuMDQ2IDYwIDE1MCA2MEMxMzguOTU0IDYwIDEzMCA2OC45NTQzIDEzMCA4MEMxMzAgOTEuMDQ1NyAxMzguOTU0IDEwMCAxNTAgMTAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMjAwIDIwMEgxMDBDOTQuNDc3MiAyMDAgOTAgMTk1LjUyMyA5MCAxOTBWMTMwQzkwIDEyNC40NzcgOTQuNDc3MiAxMjAgMTAwIDEyMEgyMDBDMjA1LjUyMyAxMjAgMjEwIDEyNC40NzcgMjEwIDEzMFYxOTBDMjEwIDE5NS41MjMgMjA1LjUyMyAyMDAgMjAwIDIwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/20 overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
    >
      {/* Recipe Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg ${
              isFavorite 
                ? 'bg-pink-500 text-white scale-110' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500 hover:scale-110'
            }`}
          >
            <Heart 
              className={`w-4 h-4 transition-all duration-200 ${
                isFavorite ? 'fill-current' : ''
              }`} 
            />
          </button>
        )}

        {/* Quick action overlay */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full">
            <ChefHat className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">View Recipe</span>
          </div>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 leading-tight">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="font-medium">30 min</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="font-medium">4 servings</span>
          </div>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};