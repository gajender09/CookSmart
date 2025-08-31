CookSmart - Your Kitchen Companion
Overview
CookSmart is a web app for busy professionals like Taylor, making it easy to find and cook recipes based on ingredients, time, or mood. Powered by TheMealDB API, it offers recipe search, favorites, a shopping list, and a guided cooking mode.
Live Demo

App: CookSmart Live Demo (Placeholder, update with actual link)
Video: CookSmart Walkthrough (Placeholder, update with actual video)

Tech Stack

Frontend: React, Tailwind CSS
API: TheMealDB API
Storage: localStorage
Libraries: Axios, Web Speech API
Features: Responsive UI, PWA for offline use, debounced search

Features

Search: Find recipes by ingredients (e.g., "egg, spinach") with error handling.
Recipe Details: View ingredients, steps, and YouTube links (if available).
Favorites: Save recipes to localStorage.
Shopping List: Add missing ingredients, mark as bought, persists across sessions.
Guided Cooking: Step-by-step mode with large text and optional text-to-speech.

Setup

Clone: git clone <repo-url>
Serve: Use npx serve or any local server.
Deploy: Host on Netlify/Vercel.

Usage

Home: Search by ingredients or use filters (e.g., "15-min", "Healthy").
Search: Enter ingredients to see recipe cards.
Details: Click a recipe to view details, save, or add to shopping list.
Favorites: View or remove saved recipes.
Shopping List: Manage ingredients checklist.
Cooking Mode: Follow steps with voice support.

Example
Taylor searches "egg, spinach", picks "Spinach Omelette", adds "milk" to the shopping list, and cooks using guided mode.
License
MIT
