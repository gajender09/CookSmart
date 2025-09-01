import React, { useState } from "react";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { RecipeGrid } from "./components/RecipeGrid";
import { RecipeModal } from "./components/RecipeModal";
import { ShoppingListModal } from "./components/ShoppingListModal";
import { FavoritesModal } from "./components/FavoritesModal";
import { CookingModeView } from "./components/CookingModeView";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { EmptyState } from "./components/EmptyState";
import { useRecipes } from "./hooks/useRecipes";
import { useTheme } from "./hooks/useTheme";
import { useFavorites } from "./hooks/useFavorites";
import { useShoppingList } from "./hooks/useShoppingList";
import { useCookingMode } from "./hooks/useCookingMode";

/**
 * Main CookSmart application component
 */
function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const {
    shoppingList,
    addToShoppingList,
    toggleShoppingItem,
    removeFromShoppingList,
    clearShoppingList,
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
    speakInstruction,
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
    closeRecipeDetails,
  } = useRecipes();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastSearchTerm, setLastSearchTerm] = useState<string>("");
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
    setLastSearchTerm("");

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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50"
      }`}
    >
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
      <main className="py-12">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium mb-8">
              <span>🍽️</span>
              Your personal kitchen assistant
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-emerald-600 to-green-600 dark:from-gray-100 dark:via-emerald-400 dark:to-green-400 bg-clip-text text-transparent mb-8 leading-tight">
              What do you want to eat today?
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Tell us what ingredients you have, and we'll help you discover
              amazing recipes you can make right now. From quick weeknight
              dinners to weekend cooking adventures.
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
              message={
                selectedCategory
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
                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  {selectedCategory
                    ? `Delicious ${selectedCategory} Recipes`
                    : `Perfect recipes with "${lastSearchTerm}"`}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  We found {recipes.length} amazing recipe
                  {recipes.length !== 1 ? "s" : ""} for you to try
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
              type={
                lastSearchTerm || selectedCategory ? "no-results" : "welcome"
              }
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
        isFavorite={
          selectedRecipe ? favorites.includes(selectedRecipe.idMeal) : false
        }
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
        onRemoveFavorite={toggleFavorite} // single remove
        onRecipeClick={fetchRecipeDetails} // open recipe details
        onClearFavorites={clearFavorites} // ✅ clear all
      />
    </div>
  );
}

export default App;
