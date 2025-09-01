import React from 'react';
import { ChefHat, Search, Heart, Sparkles, Clock, Users, Globe } from 'lucide-react';

interface EmptyStateProps {
  type: 'welcome' | 'no-results';
  searchTerm?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ type, searchTerm }) => {
  if (type === 'welcome') {
    return (
      <div className="text-center py-20 px-4">
        <div className="flex justify-center mb-12">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 dark:border-gray-700/50">
              <ChefHat className="w-24 h-24 text-emerald-500 dark:text-emerald-400" />
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
          </div>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Ready to cook
          </span>
          <br />
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            something amazing?
          </span>
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 max-w-3xl mx-auto leading-relaxed">
          Whether you're craving comfort food, trying something new, or working with what's in your fridge - 
          we'll help you discover the perfect recipe for your mood and ingredients.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20 dark:border-gray-700/50">
            <div className="relative mb-6">
              <div className="p-4 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                <Search className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              🥘 Ingredient Magic
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Got some ingredients lying around? Tell us what you have and we'll find amazing recipes you can make right now.
            </p>
          </div>
          
          <div className="group p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20 dark:border-gray-700/50">
            <div className="relative mb-6">
              <div className="p-4 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ❤️ Your Favorites
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Save the recipes that make your taste buds dance. Build your personal cookbook of go-to dishes.
            </p>
          </div>
          
          <div className="group p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-white/20 dark:border-gray-700/50">
            <div className="relative mb-6">
              <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-2xl w-fit mx-auto group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
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
    <div className="text-center py-20 px-4">
      <div className="flex justify-center mb-8">
        <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-full shadow-xl border border-white/20 dark:border-gray-700/50">
          <Search className="w-20 h-20 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        No recipes found
      </h2>
      
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        {searchTerm 
          ? `We couldn't find any recipes for "${searchTerm}". Try different ingredients or browse our categories below.`
          : 'No recipes match your search. Try different ingredients or explore our categories.'
        }
      </p>
      
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-blue-200/50 dark:border-blue-700/50 rounded-2xl p-6 max-w-lg mx-auto shadow-xl">
        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-4 text-lg">
          💡 Search Tips:
        </h4>
        <ul className="text-blue-700 dark:text-blue-400 text-left space-y-2">
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Try common ingredients like "chicken", "beef", or "rice"
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Use simple ingredient names without brands
          </li>
          <li className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Browse categories for inspiration
          </li>
        </ul>
      </div>
    </div>
  );
};