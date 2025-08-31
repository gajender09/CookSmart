# CookSmart - Your Kitchen Companion

## Overview
CookSmart is a web app for busy professionals like Taylor, enabling easy recipe discovery and cooking based on ingredients, time, or mood. It uses TheMealDB API for recipe data and includes features like favorites, shopping list, and guided cooking.

## Live Demo
- **App**: [CookSmart Live Demo](https://cooksmart-demo.netlify.app) *(Placeholder, update with actual link)*
- **Video**: [CookSmart Walkthrough](https://www.youtube.com/watch?v=placeholder) *(Placeholder, update with actual video)*

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **API**: TheMealDB API (`filter.php`, `lookup.php`)
- **Storage**: localStorage
- **Libraries**: Axios, Web Speech API
- **Features**: Responsive UI, PWA support, debounced search

## Features
- **Search**: Find recipes by ingredients (e.g., "egg, spinach") with error handling.
- **Recipe Details**: View ingredients, step-by-step instructions, and YouTube links (if available).
- **Favorites**: Save recipes to localStorage, view or remove anytime.
- **Shopping List**: Add missing ingredients, mark as bought, persists across sessions.
- **Guided Cooking**: Fullscreen step-by-step mode with large text and optional text-to-speech.

## Setup
1. Clone the repo:
   ```bash
   git clone <repo-url>
