import React from 'react';
import { Clock, Heart, Users, Star, ChefHat } from 'lucide-react';
import { RecipeCard as RecipeCardType } from '../types/recipe';

interface RecipeCardProps {
  recipe: RecipeCardType;
  onClick: (recipeId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

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

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl dark:shadow-gray-900/20 overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-3 border border-white/20 dark:border-gray-700/50"
    >
      {/* Recipe Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg transform hover:scale-110 ${
              isFavorite 
                ? 'bg-red-500/90 text-white scale-110 animate-pulse' 
                : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
            }`}
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-200 ${
                isFavorite ? 'fill-current' : ''
              }`} 
            />
          </button>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {(Math.random() * 2 + 3).toFixed(1)}
          </span>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
          {recipe.strMeal}
        </h3>
        
        {/* Recipe Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{Math.floor(Math.random() * 30 + 15)} min</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="font-medium">{Math.floor(Math.random() * 4 + 2)} servings</span>
          </div>

          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            <span className="font-medium">Easy</span>
          </div>
        </div>
        
        {/* Category & Area */}
        <div className="flex gap-2 mb-4">
          {recipe.strCategory && (
            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
              {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-medium">
              {recipe.strArea}
            </span>
          )}
        </div>
        
        {/* Hover indicator */}
        <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          Click to view full recipe →
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
};