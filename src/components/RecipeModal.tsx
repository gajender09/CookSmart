import React, { useEffect } from 'react';
import { X, Clock, Globe, Heart, ExternalLink, Play, ShoppingCart, ChefHat } from 'lucide-react';
import { Recipe, ProcessedIngredient } from '../types/recipe';
import { LoadingSpinner } from './LoadingSpinner';

interface RecipeModalProps {
  recipe: Recipe | null;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
  onAddToShoppingList?: (ingredient: string, measure: string, recipeId: string, recipeName: string) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isLoading,
  isOpen,
  onClose,
  isFavorite = false,
  onToggleFavorite,
  onAddToShoppingList
}) => {
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

  // Process ingredients and measurements
  const getIngredients = (recipe: Recipe): ProcessedIngredient[] => {
    const ingredients: ProcessedIngredient[] = [];
    
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Recipe] as string;
      const measure = recipe[`strMeasure${i}` as keyof Recipe] as string;
      
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure?.trim() || ''
        });
      }
    }
    
    return ingredients;
  };

  const handleFavoriteClick = () => {
    if (recipe && onToggleFavorite) {
      onToggleFavorite(recipe.idMeal);
    }
  };

  const handleAddAllToShoppingList = () => {
    if (recipe && onAddToShoppingList) {
      const ingredients = getIngredients(recipe);
      ingredients.forEach(item => {
        onAddToShoppingList(item.ingredient, item.measure, recipe.idMeal, recipe.strMeal);
      });
    }
  };

  const getYouTubeEmbedUrl = (youtubeUrl: string) => {
    const videoId = youtubeUrl.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-white/20 dark:border-gray-700/50">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Recipe Details
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            {recipe && onAddToShoppingList && (
              <button
                onClick={handleAddAllToShoppingList}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
              >
                <ShoppingCart className="w-4 h-4" />
                Add All to Cart
              </button>
            )}
            
            {recipe && onToggleFavorite && (
              <button
                onClick={handleFavoriteClick}
                className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-105 ${
                  isFavorite
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
            
            <button
              onClick={onClose}
              className="p-3 rounded-xl bg-gray-100/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          {isLoading ? (
            <LoadingSpinner message="Loading recipe details..." />
          ) : recipe ? (
            <div className="p-6">
              {/* Recipe Header */}
              <div className="flex flex-col lg:flex-row gap-8 mb-8">
                <div className="lg:w-1/2">
                  <div className="relative group">
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="w-full h-80 object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                    {recipe.strMeal}
                  </h1>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-full">
                      <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        {recipe.strArea}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-full">
                      <ChefHat className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                        {recipe.strCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-semibold text-purple-800 dark:text-purple-300">
                        {Math.floor(Math.random() * 30 + 15)} min
                      </span>
                    </div>
                  </div>

                  {/* YouTube Video Link */}
                  {recipe.strYoutube && (
                    <div className="mb-6">
                      <a
                        href={recipe.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <Play className="w-5 h-5" />
                        Watch Video Tutorial
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {/* Tags */}
                  {recipe.strTags && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Recipe Tags:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.strTags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200/50 dark:border-gray-600/50"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ingredients Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Ingredients
                  </h3>
                  {onAddToShoppingList && (
                    <button
                      onClick={handleAddAllToShoppingList}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add All to Shopping List
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getIngredients(recipe).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                        <span className="text-gray-900 dark:text-gray-100 font-medium">
                          {item.measure} {item.ingredient}
                        </span>
                      </div>
                      
                      {onAddToShoppingList && (
                        <button
                          onClick={() => onAddToShoppingList(item.ingredient, item.measure, recipe.idMeal, recipe.strMeal)}
                          className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                          title="Add to shopping list"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Instructions
                </h3>
                
                <div className="space-y-4">
                  {recipe.strInstructions.split(/\r?\n/).filter(step => step.trim()).map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {step.trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* YouTube Video Embed */}
              {recipe.strYoutube && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Video Tutorial
                  </h3>
                  
                  <div className="aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                    <iframe
                      src={getYouTubeEmbedUrl(recipe.strYoutube) || ''}
                      title={`${recipe.strMeal} Tutorial`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Recipe details not available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};