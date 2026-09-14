import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://vifi.us",
  output: "static",
  // Partner-program aliases: the program is marketed as "Partners"; affiliate
  // directories and old links use the other names.
  redirects: {
    "/affiliates": "/partners/",
    "/affiliate": "/partners/",
    "/affiliate-program": "/partners/",
  },
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
