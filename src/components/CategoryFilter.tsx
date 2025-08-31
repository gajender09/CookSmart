import React from 'react';
import { Filter, Loader2 } from 'lucide-react';
import { Category } from '../types/recipe';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
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
  React.useEffect(() => {
    if (categories.length === 0 && !isLoading) {
      onLoadCategories();
    }
  }, [categories.length, isLoading, onLoadCategories]);

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Browse by Category
        </h3>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading categories...</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategorySelect('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === ''
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category.strCategory}
              onClick={() => onCategorySelect(category.strCategory)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.strCategory
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
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