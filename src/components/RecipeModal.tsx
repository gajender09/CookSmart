import React, { useEffect } from 'react';
import { X, Clock, Globe, Heart, ExternalLink, Play } from 'lucide-react';
import { Recipe, ProcessedIngredient } from '../types/recipe';
import { LoadingSpinner } from './LoadingSpinner';

interface RecipeModalProps {
  recipe: Recipe | null;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

/**
 * Modal component for displaying detailed recipe information
 */
export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isLoading,
  isOpen,
  onClose,
  isFavorite = false,
  onToggleFavorite
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

  const getYouTubeEmbedUrl = (youtubeUrl: string) => {
    const videoId = youtubeUrl.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Recipe Details
          </h2>
          
          <div className="flex items-center gap-2">
            {recipe && onToggleFavorite && (
              <button
                onClick={handleFavoriteClick}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isFavorite
                    ? 'bg-red-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {isLoading ? (
            <LoadingSpinner message="Loading recipe details..." />
          ) : recipe ? (
            <div className="p-6">
              {/* Recipe Header */}
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                <div className="lg:w-1/2">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                <div className="lg:w-1/2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {recipe.strMeal}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                      <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                        {recipe.strArea}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                      <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-sm font-medium text-orange-800 dark:text-orange-300">
                        {recipe.strCategory}
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
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
                      >
                        <Play className="w-5 h-5" />
                        Watch Video Tutorial
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  {/* Tags */}
                  {recipe.strTags && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Tags:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recipe.strTags.split(',').map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs"
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Ingredients
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getIngredients(recipe).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {item.measure} {item.ingredient}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Instructions
                </h3>
                
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  {recipe.strInstructions.split('\n').map((paragraph, index) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {paragraph.trim()}
                      </p>
                    )
                  ))}
                </div>
              </div>

              {/* YouTube Video Embed */}
              {recipe.strYoutube && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Video Tutorial
                  </h3>
                  
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
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