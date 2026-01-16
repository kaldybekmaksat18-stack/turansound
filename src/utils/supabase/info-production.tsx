/* PRODUCTION CONFIGURATION - Использует переменные окружения */

// В продакшене используем переменные окружения из Vercel/Netlify
export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || "hpcwkbkglggimwcbxpoh";
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwY3drYmtnbGdnaW13Y2J4cG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNjEyODEsImV4cCI6MjA4MzkzNzI4MX0.CPw2nd06xBdqp0gr36wabDoXGG-64lGN7d-mYEImX8g";
