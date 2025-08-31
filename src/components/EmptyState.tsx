import React from 'react';
import { ChefHat, Search, Heart, Sparkles, Clock, Users } from 'lucide-react';

interface EmptyStateProps {
  type: 'welcome' | 'no-results';
  searchTerm?: string;
}

/**
 * Empty state component for welcome screen and no results
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ type, searchTerm }) => {
  if (type === 'welcome') {
    return (
      <div className="text-center py-20 px-4">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="p-6 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-3xl shadow-lg">
              <ChefHat className="w-20 h-20 text-orange-500 dark:text-orange-400" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-bounce" />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Ready to cook something delicious?
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Whether you're craving comfort food, trying something new, or working with what's in your fridge - 
          we'll help you find the perfect recipe for your mood and ingredients.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              🥘 Ingredient Magic
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Got some ingredients lying around? Tell us what you have and we'll find amazing recipes you can make right now.
            </p>
          </div>
          
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-br from-red-100 to-pink-200 dark:from-red-900/30 dark:to-pink-800/30 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              ❤️ Your Favorites
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Save the recipes that make your taste buds dance. Build your personal cookbook of go-to dishes.
            </p>
          </div>
          
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-200 dark:from-purple-900/30 dark:to-blue-800/30 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <ChefHat className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              🌍 Explore Cuisines
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Journey through world cuisines. From Italian pasta to Thai curries, discover flavors from around the globe.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16 px-4">
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
          <Search className="w-16 h-16 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        No recipes found
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {searchTerm 
          ? `No recipes found for "${searchTerm}". Try different ingredients or browse categories.`
          : 'No recipes match your search. Try different ingredients.'
        }
      </p>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
          💡 Search Tips:
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-400 text-left">
          <li>• Try common ingredients like "chicken", "beef", or "rice"</li>
          <li>• Use simple ingredient names</li>
          <li>• Browse categories for inspiration</li>
        </ul>
      </div>
    </div>
  );
};