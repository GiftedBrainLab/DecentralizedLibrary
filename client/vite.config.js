/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  // root,
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        comingsoon: resolve(__dirname, "src/pages/coming-soon/index.html"),
        create: resolve(__dirname, "src/pages/create/index.html"),
        traverse: resolve(__dirname, "src/pages/traverse/index.html"),
        dashboard: resolve(__dirname, "src/pages/dashboard/index.html"),
        catebooks: resolve(__dirname, "src/pages/ebooks/catebooks/index.html"),
        createebook: resolve(__dirname, "src/pages/ebooks/create-ebook/index.html"),
        csbooks: resolve(__dirname, "src/pages/ebooks/csbooks/index.html"),
        reading: resolve(__dirname, "src/pages/ebooks/reading/index.html"),
        physicalscience: resolve(__dirname, "pages/ebooks/physical-science/index.html"),
        liveclass: resolve(__dirname, "src/pages/liveclass/index.html"),
        catvideos: resolve(__dirname, "src/pages/videobooks/catvideos/index.html"),
        createvideobook: resolve(__dirname, "src/pages/videobooks/create-videobook/index.html"),
        csvideos: resolve(__dirname, "src/pages/videobooks/csvideos/index.html"),
        physicalvid: resolve(__dirname, "src/pages/videobooks/physicalvid/index.html"),
        watching: resolve(__dirname, "src/pages/videobooks/watching/index.html"),
        profile: resolve(__dirname, "src/pages/profile/index.html"),
        mint: resolve(__dirname, "src/mint/index.html"),
      }
    }
  }
});
