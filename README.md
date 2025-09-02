# 🍽️ CookSmart - Your Kitchen Companion

## Student ID - Naukri0925

## Overview

CookSmart is a user-friendly web app for busy professionals like Taylor, simplifying recipe discovery and cooking based on ingredients, time, or mood. Powered by TheMealDB API, it offers search, favorites, shopping list, and guided cooking features.

## Links

- 🌐 **Live Demo**: [CookSmart](https://cook-smart-two.vercel.app/) 
- 📹 **Walkthrough**: [YouTube Video](https://youtu.be/j3ZS1D1oJoA) 
- 💻 **Code**: [CodeSandbox](https://codesandbox.io/p/github/gajender09/CookSmart/main)

## Tech Stack

- **Frontend**: React, Tailwind CSS, JSX
- **API**: TheMealDB API (`filter.php?i={ingredient}`, `lookup.php?i={idMeal}`)
- **Storage**: localStorage for favorites and shopping list
- **Libraries**: Axios (API requests), Web Speech API (text-to-speech)
- **Features**: Responsive design, PWA for offline access, debounced search
- **Hosting**: Deployable on Netlify, Vercel, or similar

## Features

- 🔍 **Search & Discovery**: Search recipes by ingredients (e.g., "egg, spinach") with debounced input and error handling (no results, API failures)
- 📖 **Recipe Details**: View title, category, region, ingredients, steps, and YouTube links (if available)
- ❤️ **Favorites**: Save recipes to localStorage, view in grid, remove anytime
- 🛒 **Shopping List**: Add missing ingredients, mark as bought, edit manually, persists across sessions
- 🍳 **Guided Cooking Mode**: Fullscreen step-by-step instructions with large text, navigation, timers, and optional text-to-speech

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gajender09/CookSmart.git
   cd CookSmart
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   Or serve locally:

   ```bash
   npx serve
   ```

   You can also use VS Code Live Server.

## Usage

1. **Onboarding**: Start with search bar (ingredient chips: "egg", "spinach") and filters ("15-min", "Healthy")
2. **Search**: Enter ingredients to see a responsive recipe grid, ranked by match
3. **Recipe Details**: Click a recipe to view details, save to favorites, add to shopping list, or start cooking mode
4. **Favorites**: View or remove saved recipes in a grid layout
5. **Shopping List**: Manage ingredient checklist, mark as bought, edit manually
6. **Guided Cooking**: Follow step-by-step instructions with large text, timers, and voice support

## Example

Taylor searches "egg, spinach", selects "Spinach Omelette", adds "milk" to shopping list, and cooks using guided mode with voice instructions.

## Contact

- **Developer**: [Gajender](https://github.com/gajender09)
- **Project Link**: [https://github.com/gajender09/CookSmart](https://github.com/gajender09/CookSmart)
