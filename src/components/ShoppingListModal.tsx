import React from 'react';
import { X, ShoppingCart, Trash2, Check } from 'lucide-react';
import { ShoppingItem } from '../types/recipe';

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  shoppingList: ShoppingItem[];
  onToggleItem: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
  onClearList: () => void;
}

/**
 * Shopping list modal for managing ingredients
 */
export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  shoppingList,
  onToggleItem,
  onRemoveItem,
  onClearList
}) => {
  if (!isOpen) return null;

  const checkedItems = shoppingList.filter(item => item.checked).length;
  const totalItems = shoppingList.length;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-orange-50 dark:bg-orange-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Shopping List
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {checkedItems} of {totalItems} items checked
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {totalItems > 0 && (
              <button
                onClick={onClearList}
                className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh] p-6">
          {totalItems === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Your shopping list is empty
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Add ingredients from recipes to start building your list
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {shoppingList.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    item.checked
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <button
                    onClick={() => onToggleItem(item.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      item.checked
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                    }`}
                  >
                    {item.checked && <Check className="w-4 h-4" />}
                  </button>

                  <div className="flex-1">
                    <div className={`font-medium transition-all duration-200 ${
                      item.checked 
                        ? 'text-green-700 dark:text-green-300 line-through' 
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {item.measure} {item.ingredient}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      For {item.recipeName}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};