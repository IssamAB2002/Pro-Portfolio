import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],

  // Assets are served from /static/ path (WhiteNoise will serve these)
  base: "/static/",

  build: {
    // Output directory for production build
    outDir: "../backend/frontend/dist",
    // Don't empty the output dir to preserve other files
    emptyOutDir: true,
    // Ensure proper source maps for debugging
    sourcemap: false,
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "axios"],
          ui: ["react-icons", "react-responsive-carousel"],
        },
      },
    },
  },

  server: {
    // Development server configuration
    host: "127.0.0.1",
    port: 5173,

    // Proxy API requests to Django backend
    proxy: {
      // API endpoints
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },

      // Django admin
      "/admin": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },

      // Admin URL (from settings.ADMIN_URL)
      "/secret-admin": {
        target: "http://127.0.0.1:8000",
        changeOrigin: false,
        secure: false,
        // Handle redirects properly
        configure: (proxy) => {
          proxy.on("proxyRes", (proxyRes) => {
            const location = proxyRes.headers.location;
            if (typeof location === "string") {
              proxyRes.headers.location = location
                .replace("http://127.0.0.1:8000", "")
                .replace("http://localhost:8000", "");
            }
          });
        },
      },

      // Authentication endpoints
      "/accounts": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },

      // Media files (user uploads, etc.)
      "/media": {
        target: "http://127.0.0.1:8000",
        changeOrigin: false,
        secure: false,
      },
    },
  },
}));
