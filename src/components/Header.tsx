import React from "react";
import { Moon, Sun, Heart, ShoppingCart, ChefHat } from "lucide-react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  favoritesCount: number;
  shoppingListCount: number;
  onShowFavorites: () => void;
  onShowShoppingList: () => void;
}

/**
 * Modern header with branding and navigation
 */
export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  favoritesCount,
  shoppingListCount,
  onShowFavorites,
  onShowShoppingList,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
                CookSmart
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Your kitchen companion
              </p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-2">
            {/* Shopping List */}
            <button
              onClick={onShowShoppingList}
              className="relative flex items-center space-x-2 px-3 py-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">
                {shoppingListCount}
              </span>
              {shoppingListCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {shoppingListCount > 99 ? "99+" : shoppingListCount}
                </div>
              )}
            </button>

            {/* Favorites */}
            <button
              onClick={onShowFavorites}
              className="relative flex items-center space-x-2 px-3 py-2 rounded-lg bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors duration-200"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">
                {favoritesCount}
              </span>
              {favoritesCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </div>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
