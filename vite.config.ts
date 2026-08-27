import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/inspire-by-yuustore/",
  resolve: { alias: { "@": "/src" } },
});
