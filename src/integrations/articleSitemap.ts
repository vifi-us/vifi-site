import { readFile } from "node:fs/promises";
import type { AstroIntegration } from "astro";
import sitemap from "@astrojs/sitemap";
import { articleLastmod } from "./articleLastmod.mjs";

export default function articleSitemap(): AstroIntegration[] {
  const dates = new Map<string, string>();
  return [
    {
      name: "vifi-article-sitemap-dates",
      hooks: {
        // This hook runs before @astrojs/sitemap. Reading rendered JSON-LD keeps
        // the sitemap and schema on the same validated content-collection dates.
        "astro:build:done": async ({ dir, pages }) => {
          dates.clear();
          for (const page of pages) {
            const pathname = page.pathname.replace(/^\/|\/$/g, "");
            if (!pathname.startsWith("blog/")) continue;
            const html = await readFile(new URL(`${pathname}/index.html`, dir), "utf8");
            const lastmod = articleLastmod(html);
            if (lastmod) dates.set(`/${pathname}`, lastmod);
          }
        },
      },
    },
    sitemap({
      serialize(item) {
        const lastmod = dates.get(new URL(item.url).pathname.replace(/\/$/, ""));
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ];
}
