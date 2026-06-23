import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set NETLIFY=true env var when building for Netlify to get separate files.
// Default build produces a single inlined HTML file (works in preview sandboxes).
const isNetlify = process.env.NETLIFY === "true";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(isNetlify ? [] : [viteSingleFile()]),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    // Inline all assets as base64 for single-file preview builds.
    // Netlify build serves images as separate files (default behavior).
    assetsInlineLimit: isNetlify ? 4096 : 100000000,
  },
});
