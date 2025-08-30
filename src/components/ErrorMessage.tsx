import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Modern error message component
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
        <AlertCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md text-lg leading-relaxed">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      )}
    </div>
  );
};