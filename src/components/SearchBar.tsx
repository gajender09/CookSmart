import React, { useState } from 'react';
import { Search, X, Sparkles, ChefHat } from 'lucide-react';

interface SearchBarProps {
  onSearch: (ingredients: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const SAMPLE_INGREDIENTS = [
  '🍗 chicken', '🥩 beef', '🐟 salmon', '🍝 pasta', '🍚 rice', 
  '🍅 tomato', '🧅 onion', '🧄 garlic', '🥚 egg', '🥔 potato'
];

/**
 * Premium search bar with glassy design and ingredient suggestions
 */
export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onClear, 
  isLoading = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onClear();
  };

  const handleSampleClick = (ingredient: string) => {
    const cleanIngredient = ingredient.replace(/^[^\w\s]+\s/, ''); // Remove emoji
    const newTerm = searchTerm ? `${searchTerm}, ${cleanIngredient}` : cleanIngredient;
    setSearchTerm(newTerm);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="relative mb-8">
        <div className="relative group">
          {/* Glowing background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          
          <div className="relative flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
            <div className="relative flex-1">
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Search className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What ingredients do you have? (e.g., chicken, rice, tomato)"
                disabled={isLoading}
                className="w-full pl-20 pr-16 py-6 text-lg border-0 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              />
              
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
              className="px-10 py-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-700 dark:disabled:to-gray-600 text-white font-bold text-lg transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center gap-3 shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <ChefHat className="w-6 h-6" />
                  <span>Find Recipes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Sample Ingredient Chips */}
      <div className="text-center">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 font-medium">
          ✨ Popular ingredients to get you started:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {SAMPLE_INGREDIENTS.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => handleSampleClick(ingredient)}
              className="group px-5 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-700 dark:text-gray-300 rounded-2xl text-sm font-semibold hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 hover:scale-110 border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="group-hover:scale-110 transition-transform duration-200 inline-block">
                {ingredient}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};