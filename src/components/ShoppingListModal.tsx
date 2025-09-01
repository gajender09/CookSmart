import React, { useEffect } from 'react';
import { X, ShoppingCart, Check, Trash2, Plus } from 'lucide-react';
import { ShoppingItem } from '../types/recipe';

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  shoppingList: ShoppingItem[];
  onToggleItem: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
  onClearList: () => void;
}

export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  shoppingList,
  onToggleItem,
  onRemoveItem,
  onClearList
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const completedItems = shoppingList.filter(item => item.completed);
  const pendingItems = shoppingList.filter(item => !item.completed);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-white/20 dark:border-gray-700/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Shopping List
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {pendingItems.length} item{pendingItems.length !== 1 ? 's' : ''} to buy
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {shoppingList.length > 0 && (
              <button
                onClick={onClearList}
                className="px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          {shoppingList.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Your shopping list is empty
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Add ingredients from recipes to build your shopping list!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Pending Items */}
              {pendingItems.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-orange-500" />
                    To Buy ({pendingItems.length})
                  </h3>
                  <div className="space-y-2">
                    {pendingItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-200"
                      >
                        <button
                          onClick={() => onToggleItem(item.id)}
                          className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors flex items-center justify-center"
                        >
                          {item.completed && (
                            <Check className="w-4 h-4 text-emerald-500" />
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {item.measure} {item.ingredient}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            For {item.recipeName}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Completed Items */}
              {completedItems.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-emerald-500" />
                    Completed ({completedItems.length})
                  </h3>
                  <div className="space-y-2">
                    {completedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-emerald-50/80 dark:bg-emerald-900/20 backdrop-blur-sm rounded-xl border border-emerald-200/50 dark:border-emerald-700/50"
                      >
                        <button
                          onClick={() => onToggleItem(item.id)}
                          className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-emerald-700 dark:text-emerald-300 line-through">
                            {item.measure} {item.ingredient}
                          </p>
                          <p className="text-sm text-emerald-600 dark:text-emerald-400">
                            For {item.recipeName}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1 text-emerald-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};