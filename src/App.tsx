import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeModal } from './components/RecipeModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { useRecipes } from './hooks/useRecipes';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';

/**
 * Main application component for Recipe Ideas app
 * Orchestrates all features including search, favorites, and theme management
 */
function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { favorites, toggleFavorite } = useFavorites();
  const {
    recipes,
    selectedRecipe,
    categories,
    isLoading,
    isLoadingDetails,
    error,
    searchByIngredient,
    searchByCategory,
    fetchRecipeDetails,
    loadCategories,
    clearResults,
    closeRecipeDetails
  } = useRecipes();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastSearchTerm, setLastSearchTerm] = useState<string>('');

  /**
   * Handle ingredient search
   */
  const handleSearch = (ingredients: string) => {
    setLastSearchTerm(ingredients);
    setSelectedCategory(null);
    searchByIngredient(ingredients);
  };

  /**
   * Handle category selection
   */
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setLastSearchTerm('');
    
    if (category) {
      searchByCategory(category);
    } else {
      clearResults();
    }
  };

  /**
   * Handle recipe card click - fetch and show details
   */
  const handleRecipeClick = (recipeId: string) => {
    fetchRecipeDetails(recipeId);
  };

  /**
   * Handle retry for error states
   */
  const handleRetry = () => {
    if (selectedCategory) {
      searchByCategory(selectedCategory);
    } else if (lastSearchTerm) {
      searchByIngredient(lastSearchTerm);
    }
  };

  const isModalOpen = selectedRecipe !== null || isLoadingDetails;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50'
    }`}>
      {/* Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        favoritesCount={favorites.length}
      />

      {/* Main Content */}
      <main className="py-8">
        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-medium mb-6">
              <span>🍽️</span>
              What's cooking today?
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 dark:from-gray-100 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-6 leading-tight">
              What do you want to eat today?
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Tell us what ingredients you have, and we'll help you discover amazing recipes you can make right now. 
              From quick weeknight dinners to weekend cooking adventures.
            </p>
          </div>

          <SearchBar
            onSearch={handleSearch}
            onClear={clearResults}
            isLoading={isLoading}
          />
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            onLoadCategories={loadCategories}
            isLoading={isLoading}
          />
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4">
          {/* Loading State */}
          {isLoading && (
            <LoadingSpinner 
              size="lg" 
              message={selectedCategory 
                ? `Loading ${selectedCategory.toLowerCase()} recipes...`
                : `Searching for recipes with "${lastSearchTerm}"...`
              } 
            />
          )}

          {/* Error State */}
          {error && !isLoading && (
            <ErrorMessage message={error} onRetry={handleRetry} />
          )}

          {/* Results */}
          {!isLoading && !error && recipes.length > 0 && (
            <div>
              {/* Results Header */}
              <div className="mb-8 text-center">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {selectedCategory 
                    ? `Delicious ${selectedCategory} Recipes` 
                    : `Perfect recipes with "${lastSearchTerm}"`
                  }
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  We found {recipes.length} amazing recipe{recipes.length !== 1 ? 's' : ''} for you to try
                </p>
              </div>

              <RecipeGrid
                recipes={recipes}
                onRecipeClick={handleRecipeClick}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            </div>
          )}

          {/* Empty States */}
          {!isLoading && !error && recipes.length === 0 && (
            <EmptyState
              type={lastSearchTerm || selectedCategory ? 'no-results' : 'welcome'}
              searchTerm={lastSearchTerm || selectedCategory || undefined}
            />
          )}
        </div>
      </main>

      {/* Recipe Details Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isLoading={isLoadingDetails}
        isOpen={isModalOpen}
        onClose={closeRecipeDetails}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.idMeal) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;