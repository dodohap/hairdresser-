import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173, // Ensure this matches the port you're mapping in Docker Compose
  },
  plugins: [react()],
});
