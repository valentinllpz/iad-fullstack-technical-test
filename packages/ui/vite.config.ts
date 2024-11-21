import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import pkg from "./package.json";

export default defineConfig({
  plugins: [
    dts({
      staticImport: true,
    }),
    react(),
  ],
  build: {
    lib: {
      entry: "./index.ts",
      name: pkg.name,
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.mjs" : "index.cjs"),
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
