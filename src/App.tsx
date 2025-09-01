import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeModal } from './components/RecipeModal';
import { FavoritesModal } from './components/FavoritesModal';
import { ShoppingListModal } from './components/ShoppingListModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { useRecipes } from './hooks/useRecipes';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';
import { useShoppingList } from './hooks/useShoppingList';

function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { favorites, toggleFavorite, favoritesCount } = useFavorites();
  const { 
    shoppingList, 
    addToShoppingList, 
    removeFromShoppingList, 
    toggleItemCompleted, 
    clearShoppingList, 
    shoppingListCount 
  } = useShoppingList();
  
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
  const [showFavorites, setShowFavorites] = useState(false);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const handleSearch = (ingredients: string) => {
    setLastSearchTerm(ingredients);
    setSelectedCategory(null);
    searchByIngredient(ingredients);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setLastSearchTerm('');
    
    if (category) {
      searchByCategory(category);
    } else {
      clearResults();
    }
  };

  const handleRecipeClick = (recipeId: string) => {
    fetchRecipeDetails(recipeId);
  };

  const handleRetry = () => {
    if (selectedCategory) {
      searchByCategory(selectedCategory);
    } else if (lastSearchTerm) {
      searchByIngredient(lastSearchTerm);
    }
  };

  const handleAddToShoppingList = (ingredient: string, measure: string, recipeId: string, recipeName: string) => {
    addToShoppingList(ingredient, measure, recipeId, recipeName);
  };

  const isModalOpen = selectedRecipe !== null || isLoadingDetails;

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50'
    }`}>
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23065f46" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        favoritesCount={favoritesCount}
        shoppingListCount={shoppingListCount}
        onShowFavorites={() => setShowFavorites(true)}
        onShowShoppingList={() => setShowShoppingList(true)}
      />

      {/* Main Content */}
      <main className="relative z-10 py-12">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-semibold mb-8 border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg">
              <span className="text-2xl">🍽️</span>
              What's cooking today?
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                What do you want
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                to eat today?
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
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
        <div className="max-w-7xl mx-auto px-4 mb-12">
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
                ? `Finding delicious ${selectedCategory.toLowerCase()} recipes...`
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
              <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium mb-4 border border-emerald-200/50 dark:border-emerald-700/50">
                  <span>✨</span>
                  {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} found
                </div>
                
                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {selectedCategory 
                    ? `Delicious ${selectedCategory} Recipes` 
                    : `Perfect recipes with "${lastSearchTerm}"`
                  }
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Ready to start cooking? Pick a recipe that catches your eye!
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

      {/* Modals */}
      <RecipeModal
        recipe={selectedRecipe}
        isLoading={isLoadingDetails}
        isOpen={isModalOpen}
        onClose={closeRecipeDetails}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.idMeal) : false}
        onToggleFavorite={toggleFavorite}
        onAddToShoppingList={handleAddToShoppingList}
      />

      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onRemoveFavorite={toggleFavorite}
        onRecipeClick={handleRecipeClick}
      />

      <ShoppingListModal
        isOpen={showShoppingList}
        onClose={() => setShowShoppingList(false)}
        shoppingList={shoppingList}
        onToggleItem={toggleItemCompleted}
        onRemoveItem={removeFromShoppingList}
        onClearList={clearShoppingList}
      />
    </div>
  );
}

export default App;