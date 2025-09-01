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

export const Header: React.FC<HeaderProps> = ({ 
  isDark, 
  onToggleTheme, 
  favoritesCount, 
  shoppingListCount,
  onShowFavorites,
  onShowShoppingList
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                <ChefHat className="w-8 h-8 text-white" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                TasteBud
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 -mt-1 font-medium">
                Your culinary companion
              </p>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-3">
            {/* Shopping Cart */}
            <button
              onClick={onShowShoppingList}
              className="relative group p-3 rounded-xl bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 hover:from-orange-200 hover:to-red-200 dark:hover:from-orange-800/40 dark:hover:to-red-800/40 transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingCart className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              {shoppingListCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {shoppingListCount}
                </span>
              )}
            </button>

            {/* Favorites */}
            <button
              onClick={onShowFavorites}
              className="relative group p-3 rounded-xl bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 hover:from-pink-200 hover:to-rose-200 dark:hover:from-pink-800/40 dark:hover:to-rose-800/40 transition-all duration-300 transform hover:scale-105"
            >
              <Heart className={`w-6 h-6 ${favoritesCount > 0 ? 'text-red-500 fill-current' : 'text-pink-600 dark:text-pink-400'}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 transform hover:scale-105"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};