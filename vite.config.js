import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: "/banco-app-react/", // 🔹 Agregamos la base correcta para GitHub Pages
  plugins: [react()],
});
