import React, { useState } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (ingredients: string) => void;
  onClear: () => void;
  isLoading?: boolean;
}

const SAMPLE_INGREDIENTS = [
  'chicken', 'beef', 'salmon', 'pasta', 'rice', 'tomato', 'onion', 'garlic'
];

/**
 * Modern search bar with ingredient suggestions
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
    const newTerm = searchTerm ? `${searchTerm}, ${ingredient}` : ingredient;
    setSearchTerm(newTerm);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-emerald-500 dark:text-emerald-400 w-6 h-6" />
            
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="What ingredients do you have? (e.g., chicken, rice, tomato)"
              disabled={isLoading}
              className="w-full pl-16 pr-14 py-5 text-lg border-0 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
            
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className="px-8 py-5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-700 dark:disabled:to-gray-600 text-white font-semibold text-lg transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
      </form>

      {/* Sample Ingredient Chips */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          💡 Try these popular ingredients:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {SAMPLE_INGREDIENTS.map((ingredient) => (
            <button
              key={ingredient}
              onClick={() => handleSampleClick(ingredient)}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-200 hover:scale-105"
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};