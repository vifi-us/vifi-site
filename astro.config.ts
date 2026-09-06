import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://vifi.us",
  output: "static",
  // Preserve prose spacing across inline elements after Astro 7's JSX default.
  compressHTML: true,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["test-site.vifi.us"],
    }
  },
});
