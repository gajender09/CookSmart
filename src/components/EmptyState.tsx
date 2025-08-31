import React from 'react';
import { ChefHat, Search, Sparkles, Clock, Users, Globe, Heart } from 'lucide-react';

interface EmptyStateProps {
  type: 'welcome' | 'no-results';
  searchTerm?: string;
}

/**
 * Premium empty state with glassy design and engaging visuals
 */
export const EmptyState: React.FC<EmptyStateProps> = ({ type, searchTerm }) => {
  if (type === 'welcome') {
    return (
      <div className="text-center py-20 px-4">
        <div className="flex justify-center mb-12">
          <div className="relative group">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
            
            <div className="relative p-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 dark:border-gray-700/50">
              <ChefHat className="w-32 h-32 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform duration-500" />
              <Sparkles className="absolute -top-2 -right-2 w-12 h-12 text-yellow-400 animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
        
        <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 dark:from-gray-100 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            Ready to cook
          </span>
          <br />
          <span className="bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 dark:from-red-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
            something amazing?
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-medium">
          Tell us what ingredients you have, and we'll help you create 
          <span className="text-orange-600 dark:text-orange-400 font-bold"> culinary magic</span>. 
          From quick weeknight dinners to impressive weekend feasts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group relative p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 dark:border-gray-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="p-6 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Search className="w-10 h-10 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                🔍 Smart Discovery
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                Enter any ingredients you have at home. Our AI-powered search finds the perfect recipes that make the most of your pantry.
              </p>
            </div>
          </div>
          
          <div className="group relative p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 dark:border-gray-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="p-6 bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/30 dark:to-red-900/30 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Clock className="w-10 h-10 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                ⚡ Quick & Guided
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                Step-by-step cooking mode with voice guidance and smart timers. Perfect for busy professionals who want restaurant-quality meals.
              </p>
            </div>
          </div>
          
          <div className="group relative p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 dark:border-gray-700/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative">
              <div className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Globe className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                🌍 Global Flavors
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                Explore authentic cuisines from around the world. From Italian comfort food to exotic Asian delicacies.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Start Tips */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-10 border border-white/20 dark:border-gray-700/50 shadow-2xl">
            <h4 className="text-2xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
                🚀 Quick Start Guide
              </span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 shadow-lg"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Try popular ingredients like "chicken", "pasta", or "salmon"
                </span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mt-2 shadow-lg"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Use multiple ingredients separated by commas
                </span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mt-2 shadow-lg"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Browse cuisine categories for inspiration
                </span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 shadow-lg"></div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  Save favorites and build smart shopping lists
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-20 px-4">
      <div className="flex justify-center mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full blur-xl opacity-30"></div>
          <div className="relative p-8 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-full shadow-xl border border-white/20 dark:border-gray-700/50">
            <Search className="w-20 h-20 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        No recipes found
      </h2>
      
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        {searchTerm 
          ? `We couldn't find recipes with "${searchTerm}". Try different ingredients or explore our cuisine categories below.`
          : 'No recipes match your search. Try different ingredients or browse our categories.'
        }
      </p>
      
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-8 shadow-xl">
          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-6 text-xl">
            💡 Try these popular ingredients:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
            <div className="flex items-center gap-2">
              <span>🍗</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">chicken</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🥩</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">beef</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🐟</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">salmon</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🍝</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">pasta</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🍚</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">rice</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🍅</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">tomato</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🥚</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">egg</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🥔</span>
              <span className="text-gray-700 dark:text-gray-300 font-medium">potato</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};