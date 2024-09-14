import path from "path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [viteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://mern-basic-crud-server-ashy.vercel.app",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
