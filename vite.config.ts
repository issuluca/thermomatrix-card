import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: new URL("./src/thermomatrix-card.ts", import.meta.url).pathname,
      formats: ["es"],
      fileName: () => "thermomatrix-card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: "esbuild",
  },
});
