import React, { useState } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeModal } from './components/RecipeModal';
import { ShoppingListModal } from './components/ShoppingListModal';
import { FavoritesModal } from './components/FavoritesModal';
import { CookingModeView } from './components/CookingModeView';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { EmptyState } from './components/EmptyState';
import { useRecipes } from './hooks/useRecipes';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';
import { useShoppingList } from './hooks/useShoppingList';
import { useCookingMode } from './hooks/useCookingMode';

/**
 * Main FlavorCraft application component
 */
function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const { 
    shoppingList, 
    addToShoppingList, 
    toggleShoppingItem, 
    removeFromShoppingList, 
    clearShoppingList 
  } = useShoppingList();
  const {
    currentStep,
    isActive: isCookingMode,
    steps,
    startCookingMode,
    nextStep,
    prevStep,
    completeStep,
    exitCookingMode,
    speakInstruction
  } = useCookingMode();

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
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

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
   * Handle recipe card click
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

  // Show cooking mode if active
  if (isCookingMode) {
    return (
      <CookingModeView
        steps={steps}
        currentStep={currentStep}
        onNextStep={nextStep}
        onPrevStep={prevStep}
        onCompleteStep={completeStep}
        onExit={exitCookingMode}
        onSpeak={speakInstruction}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${
      isDark 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Glassy Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        favoritesCount={favorites.length}
        shoppingListCount={shoppingList.length}
        onShowFavorites={() => setShowFavorites(true)}
        onShowShoppingList={() => setShowShoppingList(true)}
      />

      {/* Main Content */}
      <main className="relative z-10 py-16">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-8 border border-white/20 dark:border-gray-700/50 shadow-lg">
              <span>🍽️</span>
              Your culinary adventure starts here
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 dark:from-gray-100 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                What do you want
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 dark:from-red-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
                to eat today?
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Transform your ingredients into culinary masterpieces. 
              <span className="text-orange-600 dark:text-orange-400 font-semibold">Discover, cook, and savor</span> amazing recipes 
              tailored to what's in your kitchen right now.
            </p>
          </div>

          <SearchBar
            onSearch={handleSearch}
            onClear={clearResults}
            isLoading={isLoading}
          />
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
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
                ? `Discovering amazing ${selectedCategory.toLowerCase()} recipes...`
                : `Finding perfect recipes with "${lastSearchTerm}"...`
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
              <div className="mb-16 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full mb-6 border border-white/20 dark:border-gray-700/50 shadow-lg">
                  <span className="text-2xl">🎉</span>
                  <span className="text-orange-600 dark:text-orange-400 font-semibold">
                    {recipes.length} delicious recipe{recipes.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {selectedCategory 
                    ? `Exquisite ${selectedCategory} Dishes` 
                    : `Perfect matches for "${lastSearchTerm}"`
                  }
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Each recipe is carefully selected to make the most of your ingredients
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
        onAddToShoppingList={addToShoppingList}
        onStartCooking={startCookingMode}
      />

      {/* Shopping List Modal */}
      <ShoppingListModal
        isOpen={showShoppingList}
        onClose={() => setShowShoppingList(false)}
        shoppingList={shoppingList}
        onToggleItem={toggleShoppingItem}
        onRemoveItem={removeFromShoppingList}
        onClearList={clearShoppingList}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onClearFavorites={clearFavorites}
      />
    </div>
  );
}

export default App;