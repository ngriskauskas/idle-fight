import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // relative paths, so the build runs from any folder (itch.io serves it from a CDN subpath)
  base: command === "build" ? "./" : "/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
}));
