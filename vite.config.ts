import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Project is published at https://khat713.github.io/hdfs/
export default defineConfig({
  base: "/hdfs/",
  plugins: [react(), tailwindcss()],
});
