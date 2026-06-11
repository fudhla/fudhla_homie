import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"; // 1. Tambahkan import path di sini

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 2. Tambahkan blok resolve alias ini di bawah plugins
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
});