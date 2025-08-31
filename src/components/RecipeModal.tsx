import React, { useEffect } from 'react';
import { X, Clock, Globe, Heart, ExternalLink, Play, ShoppingCart, ChefHat, Volume2, Star } from 'lucide-react';
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
  onStartCooking?: (instructions: string) => void;
}

/**
 * Premium recipe modal with glassy design and enhanced features
 */
export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isLoading,
  isOpen,
  onClose,
  isFavorite = false,
  onToggleFavorite,
  onAddToShoppingList,
  onStartCooking
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

  const handleAddToShoppingList = (ingredient: string, measure: string) => {
    if (recipe && onAddToShoppingList) {
      onAddToShoppingList(ingredient, measure, recipe.idMeal, recipe.strMeal);
    }
  };

  const handleStartCooking = () => {
    if (recipe && onStartCooking) {
      onStartCooking(recipe.strInstructions);
    }
  };

  const getYouTubeEmbedUrl = (youtubeUrl: string) => {
    const videoId = youtubeUrl.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-500 border border-white/20 dark:border-gray-700/50">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-8 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Recipe Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Everything you need to create this masterpiece
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {recipe && onToggleFavorite && (
              <button
                onClick={handleFavoriteClick}
                className={`p-3 rounded-2xl transition-all duration-300 shadow-lg transform hover:scale-110 ${
                  isFavorite
                    ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-pink-500/25'
                    : 'bg-white/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-500 backdrop-blur-sm'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
            
            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-white/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-600/80 transition-all duration-300 shadow-lg backdrop-blur-sm transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <LoadingSpinner message="Loading recipe details..." />
          ) : recipe ? (
            <div className="p-8">
              {/* Recipe Header */}
              <div className="flex flex-col lg:flex-row gap-10 mb-12">
                <div className="lg:w-2/5">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      className="relative w-full h-80 lg:h-96 object-cover rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50"
                    />
                  </div>
                </div>
                
                <div className="lg:w-3/5">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                    {recipe.strMeal}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/50">
                      <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <span className="text-lg font-bold text-orange-800 dark:text-orange-300">
                        {recipe.strArea}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-lg font-bold text-blue-800 dark:text-blue-300">
                        {recipe.strCategory}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50">
                      <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400 fill-current" />
                      <span className="text-lg font-bold text-yellow-800 dark:text-yellow-300">
                        4.8 Rating
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 mb-8">
                    {onStartCooking && (
                      <button
                        onClick={handleStartCooking}
                        className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-orange-500/25"
                      >
                        <ChefHat className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                        Start Cooking Mode
                      </button>
                    )}

                    {recipe.strYoutube && (
                      <a
                        href={recipe.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-red-500/25"
                      >
                        <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                        Watch Tutorial
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  {/* Tags */}
                  {recipe.strTags && (
                    <div>
                      <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">
                        Recipe Tags:
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {recipe.strTags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-semibold backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ingredients Section */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Ingredients
                  </h3>
                  {onAddToShoppingList && (
                    <button
                      onClick={() => {
                        getIngredients(recipe).forEach(item => {
                          handleAddToShoppingList(item.ingredient, item.measure);
                        });
                      }}
                      className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-600 dark:text-orange-400 rounded-2xl hover:from-orange-200 hover:to-red-200 dark:hover:from-orange-900/50 dark:hover:to-red-900/50 transition-all duration-300 font-semibold shadow-lg backdrop-blur-sm border border-orange-200/50 dark:border-orange-700/50 transform hover:scale-105"
                    >
                      <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      Add All to Shopping List
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getIngredients(recipe).map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-between p-5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg" />
                        <span className="text-gray-900 dark:text-gray-100 font-semibold text-lg">
                          {item.measure} {item.ingredient}
                        </span>
                      </div>
                      
                      {onAddToShoppingList && (
                        <button
                          onClick={() => handleAddToShoppingList(item.ingredient, item.measure)}
                          className="p-2 text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-200 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transform hover:scale-110"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions Section */}
              <div className="mb-12">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                  Cooking Instructions
                </h3>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
                  <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/50 shadow-xl">
                    {recipe.strInstructions.split(/\d+\.|\n/).filter(step => step.trim()).map((step, index) => (
                      <div key={index} className="flex gap-6 mb-6 last:mb-0 group">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-2 text-lg font-medium">
                          {step.trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* YouTube Video Embed */}
              {recipe.strYoutube && (
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
                    Video Tutorial
                  </h3>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
                      <iframe
                        src={getYouTubeEmbedUrl(recipe.strYoutube) || ''}
                        title={`${recipe.strMeal} Tutorial`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-xl">
                Recipe details not available.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};