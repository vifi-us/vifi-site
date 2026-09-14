import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import { test } from "node:test";

const page = readFileSync("dist/partners/index.html", "utf8");

test("the partner program page states the terms that Tolt is configured with", () => {
  for (const pattern of [/20%/, /90[- ]day/, /net-30/i, /PayPal/, /Wise/, /wire/i, /United States, the United Kingdom, and Canada|United States|United Kingdom/]) {
    assert.match(page, pattern);
  }
  assert.match(page, /\$9\.80/);
  assert.match(page, /\$29\.80/);
  assert.match(page, /\$69\.80/);
  assert.doesNotMatch(page, /24 months|two years|for a limited time/i, "duration is lifetime today; no cap is stated");
});

test("sign-up CTAs go to the Tolt portal and the terms are linked", () => {
  assert.ok((page.match(/href="https:\/\/partners\.vifi\.us\/signup"/g) || []).length >= 2);
  assert.match(page, /data-cta="partners-hero-apply"/);
  assert.match(page, /data-cta="partners-banner"/);
  assert.match(page, /href="\/legal\/affiliate-terms"/);
  assert.match(page, /href="\/partners\/playbook\/"/);
  assert.match(page, /href="\/partners\/resources\/"/);
  assert.match(page, /rel="canonical"[^>]+vifi\.us\/partners\//);
  assert.match(page, /name="description"/);
  assert.match(page, /"@type":"FAQPage"/);
});

test("the playbook, marketing kit, terms and redirects are built", () => {
  for (const path of ["partners/playbook", "partners/resources", "legal/affiliate-terms", "affiliates", "affiliate-program"]) {
    assert.ok(existsSync(`dist/${path}/index.html`), path);
  }
  assert.match(readFileSync("dist/affiliates/index.html", "utf8"), /\/partners\//);
  const kit = readFileSync("dist/partners/resources/index.html", "utf8");
  for (const size of ["728x90", "300x250", "160x600", "300x600", "320x100", "1200x628", "1080x1080"]) {
    for (const theme of ["light", "dark"]) {
      const file = `partners/kit/banner-${size}-${theme}.png`;
      assert.ok(existsSync(`dist/${file}`), file);
      assert.match(kit, new RegExp(`href="/${file}"`));
    }
  }
  for (const file of ["partners/kit/vifi-mark.svg", "partners/kit/vifi-mark-512.png", "partners/kit/vifi-wordmark-light.png", "partners/kit/vifi-wordmark-dark.png"]) {
    assert.ok(existsSync(`dist/${file}`), file);
  }
  const sitemap = readFileSync("dist/sitemap-0.xml", "utf8");
  for (const path of ["partners/", "partners/playbook/", "partners/resources/", "legal/affiliate-terms/"]) assert.match(sitemap, new RegExp(path));
});

test("the footer links to the program and the terms from every page", () => {
  for (const path of ["index", "pricing/index", "about/index"]) {
    const html = readFileSync(`dist/${path}.html`, "utf8");
    assert.match(html, /href="\/partners\/"/, path);
    assert.match(html, /href="\/legal\/affiliate-terms"/, path);
  }
});
