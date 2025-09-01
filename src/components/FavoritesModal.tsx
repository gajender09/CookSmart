import React, { useEffect, useState } from 'react';
import { X, Heart, Trash2, ChefHat } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { getRecipeDetails } from '../services/api';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onRemoveFavorite: (recipeId: string) => void;
  onRecipeClick: (recipeId: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onRecipeClick
}) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFavoriteRecipes = async () => {
      if (favorites.length === 0) {
        setFavoriteRecipes([]);
        return;
      }

      setIsLoading(true);
      try {
        const recipePromises = favorites.map(id => getRecipeDetails(id));
        const responses = await Promise.all(recipePromises);
        const recipes = responses
          .filter(response => response.meals && response.meals.length > 0)
          .map(response => response.meals![0]);
        
        setFavoriteRecipes(recipes);
      } catch (error) {
        console.error('Error loading favorite recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadFavoriteRecipes();
    }
  }, [favorites, isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-white/20 dark:border-gray-700/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl">
              <Heart className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Your Favorites
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {favorites.length} saved recipe{favorites.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Loading your favorites...</span>
            </div>
          ) : favoriteRecipes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No favorites yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Start exploring recipes and save your favorites here!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteRecipes.map((recipe) => (
                <div
                  key={recipe.idMeal}
                  className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => onRecipeClick(recipe.idMeal)}
                >
                  <div className="flex gap-4">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {recipe.strMeal}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {recipe.strArea} • {recipe.strCategory}
                      </p>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveFavorite(recipe.idMeal);
                        }}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};