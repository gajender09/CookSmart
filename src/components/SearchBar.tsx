import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (ingredients: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const POPULAR_INGREDIENTS = [
  'Chicken', 'Beef', 'Rice', 'Pasta', 'Tomato', 'Onion', 'Garlic', 'Cheese'
];

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

  const handleChipClick = (ingredient: string) => {
    setSearchTerm(ingredient);
    onSearch(ingredient);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          
          <div className="relative flex items-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-emerald-500 w-6 h-6" />
              
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What ingredients do you have? (e.g., chicken, rice, tomato)"
                disabled={isLoading}
                className="w-full pl-16 pr-16 py-6 text-xl bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
              
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !searchTerm.trim()}
              className="px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-700 dark:disabled:to-gray-600 text-white font-bold text-lg transition-all duration-300 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Finding...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Find Recipes
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Popular Ingredients */}
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium">
          🔥 Popular ingredients to get you started:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {POPULAR_INGREDIENTS.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => handleChipClick(ingredient)}
              className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full border border-gray-200/50 dark:border-gray-700/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-700 transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-sm"
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};