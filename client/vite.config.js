/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = resolve(__dirname, "src");
// const outDir = resolve(__dirname, "dist");

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  build: {
    // outDir,
    emptyOutDir: true,
    chunkSizeWarningLimit: 2048,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        comingsoon: resolve(root, "pages/coming-soon/index.html"),
        create: resolve(root, "pages/create/index.html"),
        traverse: resolve(root, "pages/traverse/index.html"),
        dashboard: resolve(root, "pages/dashboard/index.html"),
        catebooks: resolve(root, "pages/ebooks/catebooks/index.html"),
        createebook: resolve(root, "pages/ebooks/create-ebook/index.html"),
        csbooks: resolve(root, "pages/ebooks/csbooks/index.html"),
        reading: resolve(root, "pages/ebooks/reading/index.html"),
        physicalscience: resolve(root, "pages/ebooks/physical-science/index.html"),
        liveclass: resolve(root, "pages/liveclass/index.html"),
        catvideos: resolve(root, "pages/videobooks/catvideos/index.html"),
        createvideobook: resolve(root, "pages/videobooks/create-videobook/index.html"),
        csvideos: resolve(root, "pages/videobooks/csvideos/index.html"),
        physicalvid: resolve(root, "pages/videobooks/physicalvid/index.html"),
        watching: resolve(root, "pages/videobooks/watching/index.html"),
        profile: resolve(root, "pages/profile/index.html"),
        mint: resolve(root, "mint/index.html"),
      }
    }
  }
});
