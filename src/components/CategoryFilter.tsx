import React, { useEffect } from 'react';
import { Filter, Loader2 } from 'lucide-react';
import { Category } from '../types/recipe';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  onLoadCategories: () => void;
  isLoading: boolean;
}

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
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium mb-4 border border-emerald-200/50 dark:border-emerald-700/50">
          <Filter className="w-4 h-4" />
          Browse by Category
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
          <span className="ml-3 text-gray-600 dark:text-gray-300">Loading categories...</span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
          <button
            onClick={() => onCategorySelect(null)}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/25'
                : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200/50 dark:border-gray-700/50'
            }`}
          >
            All Recipes
          </button>
          
          {categories.map((category) => (
            <button
              key={category.strCategory}
              onClick={() => onCategorySelect(category.strCategory)}
              className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.strCategory
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/25'
                  : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200/50 dark:border-gray-700/50'
              }`}
            >
              {category.strCategory}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};