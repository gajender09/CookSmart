import React from 'react';
import { Loader2, ChefHat, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

/**
 * Premium loading spinner with glassy design
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Crafting culinary magic...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-gray-600 dark:text-gray-400">
      <div className="relative mb-8">
        {/* Glowing background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
        
        {/* Main spinner container */}
        <div className="relative p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 dark:border-gray-700/50">
          <ChefHat className="w-20 h-20 text-orange-600 dark:text-orange-400 animate-bounce" />
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin" />
          <Loader2 className="absolute -bottom-3 -left-3 w-10 h-10 animate-spin text-red-500 dark:text-red-400" />
        </div>
      </div>
      
      {message && (
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{message}</p>
          <p className="text-gray-600 dark:text-gray-400">This won't take long...</p>
        </div>
      )}
    </div>
  );
};