import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), tailwindcss()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Kanit", "sans-serif"], // ทำให้ font-sans = Kanit
      },
    },
  },
});
