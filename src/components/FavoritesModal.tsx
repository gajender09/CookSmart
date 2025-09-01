import React, { useEffect, useState } from "react";
import { X, Heart, Trash2 } from "lucide-react";
import { Recipe } from "../types/recipe";
import { getRecipeDetails } from "../services/api";

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[]; // array of idMeal
  onRemoveFavorite?: (recipeId: string) => void;
  onRecipeClick?: (recipeId: string) => void;
  onClearFavorites?: () => void;
}

/**
 * Redesigned Favorites Modal — fixed Clear All, optimistic removal, better UI.
 */
export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onRecipeClick,
  onClearFavorites,
}) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Load recipe details whenever favorites or modal open changes
  useEffect(() => {
    const loadFavoriteRecipes = async () => {
      if (!isOpen) return;
      if (!favorites || favorites.length === 0) {
        setFavoriteRecipes([]);
        return;
      }

      setIsLoading(true);
      try {
        const promises = favorites.map((id) => getRecipeDetails(id));
        const responses = await Promise.all(promises);
        const recipes = responses
          .filter((r) => r && r.meals && r.meals.length > 0)
          .map((r) => r.meals![0]);
        setFavoriteRecipes(recipes);
      } catch (err) {
        console.error("Failed to load favorite recipes", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavoriteRecipes();
  }, [favorites, isOpen]);

  // Escape key and body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Optimistic remove (updates UI immediately, then calls parent)
  const handleRemove = (id: string) => {
    // update UI immediately
    setFavoriteRecipes((prev) => prev.filter((r) => r.idMeal !== id));

    // call parent handler if provided
    try {
      onRemoveFavorite && onRemoveFavorite(id);
    } catch (err) {
      console.error("onRemoveFavorite error:", err);
    }
  };

  // Clear all handler with optional fallback to localStorage
  const handleClearAll = async () => {
    // confirm UI handled outside this function (confirmOpen)
    setIsClearing(true);
    try {
      if (onClearFavorites) {
        // call parent clear
        await Promise.resolve(onClearFavorites());
      } else {
        // fallback: clear localStorage key used by the app
        try {
          localStorage.setItem("recipe-favorites", JSON.stringify([]));
        } catch (err) {
          console.error("Failed to clear favorites in localStorage", err);
        }
      }
      // clear modal UI immediately
      setFavoriteRecipes([]);
    } catch (err) {
      console.error("Failed to clear favorites", err);
    } finally {
      setIsClearing(false);
      setConfirmOpen(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Favorite recipes"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-white/10">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-rose-500 shadow">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Favorites
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {favorites.length} saved recipe
                {favorites.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Clear All with confirmation toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setConfirmOpen((v) => !v)}
                disabled={favoriteRecipes.length === 0 || isClearing}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  favoriteRecipes.length === 0 || isClearing
                    ? "bg-red-50 text-red-300 cursor-not-allowed"
                    : "bg-red-100 hover:bg-red-200 text-red-600"
                }`}
                aria-label="Clear all favorites"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>

              {/* Inline confirm box */}
              {confirmOpen && favoriteRecipes.length > 0 && (
                <div className="absolute right-0 mt-2 w-[260px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-3 z-20">
                  <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">
                    Are you sure you want to remove all favorites? This action
                    cannot be undone.
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setConfirmOpen(false)}
                      className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleClearAll}
                      disabled={isClearing}
                      className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition disabled:opacity-60"
                    >
                      {isClearing ? "Clearing..." : "Yes, clear"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 transition"
              aria-label="Close favorites"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          {/* Loading */}
          {isLoading ? (
            <div className="flex items-center gap-3 justify-center py-16">
              <div className="h-8 w-8 rounded-full border-4 border-t-transparent animate-spin border-emerald-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Loading favorites...
              </span>
            </div>
          ) : favoriteRecipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                No favorites yet
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                Save recipes you love and find them here. Click the heart on any
                recipe to save it.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteRecipes.map((r) => (
                <article
                  key={r.idMeal}
                  onClick={() => onRecipeClick && onRecipeClick(r.idMeal)}
                  className="flex gap-4 items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={r.strMealThumb}
                    alt={r.strMeal}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src =
                        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400")
                    }
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                      {r.strMeal}
                    </h5>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {r.strArea || "Unknown"} • {r.strCategory || "Unknown"}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(r.idMeal);
                        }}
                        className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
                        aria-label={`Remove ${r.strMeal} from favorites`}
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRecipeClick && onRecipeClick(r.idMeal);
                        }}
                        className="text-xs inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
                        aria-label={`Open ${r.strMeal}`}
                      >
                        <span className="text-xs font-medium">Open</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
