import React from 'react';
import { Moon, Sun, Heart, ShoppingCart, ChefHat, Sparkles } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  favoritesCount: number;
  shoppingListCount: number;
  onShowFavorites: () => void;
  onShowShoppingList: () => void;
}

/**
 * Premium header with glassy design and enhanced branding
 */
export const Header: React.FC<HeaderProps> = ({ 
  isDark, 
  onToggleTheme, 
  favoritesCount,
  shoppingListCount,
  onShowFavorites,
  onShowShoppingList
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                <ChefHat className="w-8 h-8 text-white" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-bounce" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent">
                FlavorCraft
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1 font-medium">
                Culinary inspiration awaits
              </p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-3">
            {/* Shopping List */}
            <button
              onClick={onShowShoppingList}
              className="relative group flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 text-orange-600 dark:text-orange-400 hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 transition-all duration-300 border border-orange-200/50 dark:border-orange-700/50 backdrop-blur-sm"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-semibold hidden sm:inline">{shoppingListCount}</span>
              {shoppingListCount > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {shoppingListCount > 99 ? '99+' : shoppingListCount}
                </div>
              )}
            </button>

            {/* Favorites */}
            <button
              onClick={onShowFavorites}
              className="relative group flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 text-pink-600 dark:text-pink-400 hover:from-pink-100 hover:to-red-100 dark:hover:from-pink-900/30 dark:hover:to-red-900/30 transition-all duration-300 border border-pink-200/50 dark:border-pink-700/50 backdrop-blur-sm"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-semibold hidden sm:inline">{favoritesCount}</span>
              {favoritesCount > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {favoritesCount > 99 ? '99+' : favoritesCount}
                </div>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
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