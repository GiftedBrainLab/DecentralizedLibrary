/* eslint-disable import/no-extraneous-dependencies */

import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        create: resolve(root, "pages/create", "index.html"),
        traverse: resolve(root, "pages/traverse", "index.html"),
        liveclass: resolve(root, "pages/liveclass", "index.html"),
        comingsoon: resolve(root, "pages/coming-soon", "index.html"),
        live: resolve(root, "pages/live", "index.html"),
        dashboard: resolve(root, "pages/dashboard", "index.html"),
        catebooks: resolve(root, "pages/catebooks", "index.html"),
        createebook: resolve(root, "pages/create-ebook", "index.html"),
        csbooks: resolve(root, "pages/csbooks", "index.html"),
        reading: resolve(root, "pages/reading", "index.html"),
        physicalscience: resolve(root, "pages/physicalscience", "index.html"),
        catvideos: resolve(root, "pages/catvideos", "index.html"),
        createvideobook: resolve(root, "pages/create-videobook", "index.html"),
        csvideos: resolve(root, "pages/csvideos", "index.html"),
        physicalvid: resolve(root, "pages/physicalvid", "index.html"),
        watching: resolve(root, "pages/watching", "index.html"),
        profile: resolve(root, "pages/profile", "index.html"),
        mint: resolve(root, "pages/mint", "index.html"),
      }
    }
  }
});
