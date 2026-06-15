import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3310",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://localhost:3310",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  assetsInclude: ["**/*.JPG", "**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.webp"],
});
