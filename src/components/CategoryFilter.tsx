import React, { useEffect } from 'react';
import { Filter, Loader2, Utensils } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onLoadCategories: () => void;
  isLoading: boolean;
}

/**
 * Enhanced category filter with glassy design
 */
export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onLoadCategories,
  isLoading
}) => {
  useEffect(() => {
    if (categories.length === 0 && !isLoading) {
      onLoadCategories();
    }
  }, [categories.length, isLoading, onLoadCategories]);

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl">
          <Utensils className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Explore Cuisines
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Discover recipes from around the world
          </p>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-lg">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500 dark:text-orange-400" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Loading cuisines...</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onCategorySelect(null)}
            className={`group relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/25'
                : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl'
            }`}
          >
            <span className="relative z-10">All Cuisines</span>
            {selectedCategory === null && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            )}
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/25'
                  : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl'
              }`}
            >
              <span className="relative z-10">{category}</span>
              {selectedCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};