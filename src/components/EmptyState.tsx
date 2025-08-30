import React from 'react';
import { ChefHat, Search, Sparkles, Clock, Users, Globe } from 'lucide-react';

interface EmptyStateProps {
  type: 'welcome' | 'no-results';
  searchTerm?: string;
}

/**
 * Modern empty state with engaging visuals
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ type, searchTerm }) => {
  if (type === 'welcome') {
    return (
      <div className="text-center py-16 px-4">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="p-8 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-3xl shadow-xl">
              <ChefHat className="w-24 h-24 text-emerald-600 dark:text-emerald-400" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-bounce" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-orange-400 rounded-full animate-pulse" />
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
          What sounds delicious today?
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Tell us what ingredients you have, and we'll help you discover amazing recipes. 
          From quick weeknight dinners to impressive weekend feasts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              🥘 Smart Search
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Enter any ingredients you have at home. We'll find recipes that make the most of what's in your kitchen.
            </p>
          </div>
          
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              ⚡ Quick & Easy
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Step-by-step cooking mode with voice guidance. Perfect for busy professionals who want great meals.
            </p>
          </div>
          
          <div className="group p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              🌍 World Cuisines
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Explore flavors from around the globe. From Italian comfort food to spicy Thai dishes.
            </p>
          </div>
        </div>

        {/* Quick Start Tips */}
        <div className="mt-12 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800">
          <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-300 mb-4 text-center">
            🚀 Quick Start Tips
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
              <span className="text-emerald-700 dark:text-emerald-300">
                Try common ingredients like "chicken", "pasta", or "tomato"
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
              <span className="text-emerald-700 dark:text-emerald-300">
                Use multiple ingredients separated by commas
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
              <span className="text-emerald-700 dark:text-emerald-300">
                Browse categories for inspiration
              </span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
              <span className="text-emerald-700 dark:text-emerald-300">
                Save favorites and build shopping lists
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-16 px-4">
      <div className="flex justify-center mb-6">
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-full">
          <Search className="w-16 h-16 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        No recipes found
      </h2>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg">
        {searchTerm 
          ? `We couldn't find recipes with "${searchTerm}". Try different ingredients or browse categories below.`
          : 'No recipes match your search. Try different ingredients.'
        }
      </p>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-lg mx-auto">
        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 text-lg">
          💡 Search Suggestions:
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-blue-700 dark:text-blue-400">
          <div>• chicken</div>
          <div>• beef</div>
          <div>• salmon</div>
          <div>• pasta</div>
          <div>• rice</div>
          <div>• tomato</div>
          <div>• egg</div>
          <div>• potato</div>
        </div>
      </div>
    </div>
  );
};