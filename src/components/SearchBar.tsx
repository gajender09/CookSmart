import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (ingredients: string) => void;
  onClear: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

/**
 * Search bar component for ingredient-based recipe search
 * Supports multiple ingredients separated by commas
 */
export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onClear, 
  isLoading = false,
  placeholder = "What ingredients do you have? (e.g., chicken, rice, tomato)"
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-orange-400 dark:text-orange-500 w-6 h-6" />
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className="w-full pl-16 pr-14 py-6 text-xl border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          />
          
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className="px-10 py-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-700 dark:disabled:to-gray-600 text-white font-bold text-xl transition-all duration-200 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
        >
          {isLoading ? 'Finding recipes...' : 'Find Recipes'}
        </button>
      </div>
      
      <p className="mt-4 text-base text-gray-600 dark:text-gray-400 text-center">
        💡 <strong>Pro tip:</strong> Add multiple ingredients separated by commas for even better recipe suggestions
      </p>
    </form>
  );
};