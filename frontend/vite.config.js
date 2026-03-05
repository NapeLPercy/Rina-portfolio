import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    host: true,
    allowedHosts: ["ddbd-105-4-3-10.ngrok-free.app"],
  },
  plugins: [react(), tailwindcss()],
});
