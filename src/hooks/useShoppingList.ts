import { useState, useEffect } from 'react';
import { ShoppingItem } from '../types/recipe';
import { getShoppingList, saveShoppingList } from '../utils/storage';

/**
 * Custom hook for managing shopping list with localStorage persistence
 */
export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  useEffect(() => {
    // Load shopping list from localStorage on mount
    const savedList = getShoppingList();
    setShoppingList(savedList);
  }, []);

  const addToShoppingList = (ingredient: string, measure: string, recipeId: string, recipeName: string) => {
    const newItem: ShoppingItem = {
      id: `${recipeId}-${ingredient}`,
      ingredient,
      measure,
      completed: false,
      recipeId,
      recipeName
    };

    // Check if item already exists
    const existingIndex = shoppingList.findIndex(item => item.id === newItem.id);
    
    let newList: ShoppingItem[];
    if (existingIndex >= 0) {
      // Update existing item
      newList = [...shoppingList];
      newList[existingIndex] = newItem;
    } else {
      // Add new item
      newList = [...shoppingList, newItem];
    }

    setShoppingList(newList);
    saveShoppingList(newList);
  };

  const removeFromShoppingList = (itemId: string) => {
    const newList = shoppingList.filter(item => item.id !== itemId);
    setShoppingList(newList);
    saveShoppingList(newList);
  };

  const toggleItemCompleted = (itemId: string) => {
    const newList = shoppingList.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setShoppingList(newList);
    saveShoppingList(newList);
  };

  const clearShoppingList = () => {
    setShoppingList([]);
    saveShoppingList([]);
  };

  const getShoppingListCount = () => {
    return shoppingList.filter(item => !item.completed).length;
  };

  return {
    shoppingList,
    addToShoppingList,
    removeFromShoppingList,
    toggleItemCompleted,
    clearShoppingList,
    shoppingListCount: getShoppingListCount()
  };
};