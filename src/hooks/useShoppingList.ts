import { useState, useEffect } from 'react';
import { ShoppingItem } from '../types/recipe';
import { getShoppingList, saveShoppingList } from '../utils/storage';

/**
 * Custom hook for managing shopping list with localStorage persistence
 */
export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    setShoppingList(getShoppingList());
  }, []);

  const addToShoppingList = (ingredient: string, measure: string, recipeId: string, recipeName: string) => {
    const newItem: ShoppingItem = {
      id: `${recipeId}-${ingredient}`,
      ingredient,
      measure,
      checked: false,
      recipeId,
      recipeName
    };

    const currentList = getShoppingList();
    const exists = currentList.find(item => item.id === newItem.id);
    
    if (!exists) {
      const updatedList = [...currentList, newItem];
      saveShoppingList(updatedList);
      setShoppingList(updatedList);
    }
  };

  const toggleShoppingItem = (itemId: string) => {
    const currentList = getShoppingList();
    const updatedList = currentList.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    saveShoppingList(updatedList);
    setShoppingList(updatedList);
  };

  const removeFromShoppingList = (itemId: string) => {
    const currentList = getShoppingList();
    const updatedList = currentList.filter(item => item.id !== itemId);
    saveShoppingList(updatedList);
    setShoppingList(updatedList);
  };

  const clearShoppingList = () => {
    saveShoppingList([]);
    setShoppingList([]);
  };

  return {
    shoppingList,
    addToShoppingList,
    toggleShoppingItem,
    removeFromShoppingList,
    clearShoppingList
  };
};