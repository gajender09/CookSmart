import React from 'react';
import { Moon, Sun, Heart, Sparkles } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({ isDark, onToggleTheme, favoritesCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-bounce"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FlavorFinder
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Discover your next meal
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Favorites Counter */}
            <div className="relative">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{favoritesCount}</span>
              </button>
            </div>

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