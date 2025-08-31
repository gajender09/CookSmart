import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

/**
 * Reusable loading spinner component with optional message
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
      <Loader2 
        className={`${sizeClasses[size]} animate-spin text-orange-500 dark:text-orange-400`} 
      />
      {message && (
        <p className="mt-4 text-base font-medium">{message}</p>
      )}
    </div>
  );
};