import React from 'react';
import { Loader2, ChefHat } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

/**
 * Modern loading spinner with cooking theme
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message = 'Cooking up something delicious...' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-gray-500 dark:text-gray-400">
      <div className="relative mb-4">
        <ChefHat className="w-16 h-16 text-emerald-500 dark:text-emerald-400 animate-bounce" />
        <Loader2 className="absolute -bottom-2 -right-2 w-6 h-6 animate-spin text-orange-500 dark:text-orange-400" />
      </div>
      {message && (
        <p className="text-lg font-medium text-center max-w-md">{message}</p>
      )}
    </div>
  );
};