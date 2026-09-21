import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { articleLastmod } from "../src/integrations/articleLastmod.mjs";

const schema = (data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`;

test("article sitemap uses the content update date, falling back to publication", () => {
  assert.equal(articleLastmod(schema({
    "@type": "BlogPosting", datePublished: "2026-03-05T00:00:00.000Z",
    dateModified: "2026-09-17T00:00:00.000Z",
  })), "2026-09-17T00:00:00.000Z");
  assert.equal(articleLastmod(schema({
    "@type": "BlogPosting", datePublished: "2026-03-05T19:00:00-05:00",
  })), "2026-03-06T00:00:00.000Z");
});

test("unrelated and undated schema do not acquire a build-time freshness date", () => {
  assert.equal(articleLastmod(schema({ "@type": "WebPage", dateModified: "2026-09-21" })), undefined);
  assert.equal(articleLastmod(schema({ "@type": "BlogPosting" })), undefined);
  assert.equal(articleLastmod("<html></html>"), undefined);
  assert.throws(() => articleLastmod(schema({ "@type": "BlogPosting", dateModified: "bad-date" })), /invalid/);
});

test("built sitemap includes every article's actual date and no invented dates elsewhere", async () => {
  const xml = await readFile(new URL("../dist/sitemap-0.xml", import.meta.url), "utf8");
  let articles = 0;
  for (const [, entry] of xml.matchAll(/<url>(.*?)<\/url>/gs)) {
    const url = new URL(entry.match(/<loc>(.*?)<\/loc>/s)[1]);
    const lastmod = entry.match(/<lastmod>(.*?)<\/lastmod>/s)?.[1];
    if (url.pathname.startsWith("/blog/") && url.pathname !== "/blog/") {
      const path = url.pathname.replace(/^\/|\/$/g, "");
      const html = await readFile(new URL(`../dist/${path}/index.html`, import.meta.url), "utf8");
      const expected = articleLastmod(html);
      assert.ok(expected, `${path} has a content publication date`);
      assert.ok(lastmod, `${path} is dated in the sitemap`);
      assert.equal(new Date(lastmod).toISOString(), expected, path);
      articles++;
    } else {
      assert.equal(lastmod, undefined, `${url.pathname} has no invented date`);
    }
  }
  assert.ok(articles > 0, "sitemap contains articles");
});
