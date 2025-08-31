import React from 'react';
import { Clock, Heart, Users, ChefHat, Star } from 'lucide-react';
import { RecipeCard as RecipeCardType } from '../types/recipe';

interface RecipeCardProps {
  recipe: RecipeCardType;
  onClick: (recipeId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

/**
 * Premium recipe card with glassy design and enhanced visuals
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
    target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl dark:shadow-gray-900/30 overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-2 border border-white/20 dark:border-gray-700/50"
    >
      {/* Glowing background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Recipe Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Rating badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">4.8</span>
        </div>
        
        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg transform hover:scale-110 ${
              isFavorite 
                ? 'bg-pink-500 text-white scale-110 shadow-pink-500/25' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500'
            }`}
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-300 ${
                isFavorite ? 'fill-current' : ''
              }`} 
            />
          </button>
        )}

        {/* Quick action overlay */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full shadow-lg border border-white/20 dark:border-gray-700/50">
            <ChefHat className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">View Recipe</span>
          </div>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="relative p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 leading-tight">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-100/80 dark:bg-orange-900/30 rounded-full">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="font-semibold text-orange-700 dark:text-orange-300">25 min</span>
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100/80 dark:bg-blue-900/30 rounded-full">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-blue-700 dark:text-blue-300">4 servings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};