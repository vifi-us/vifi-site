/**
 * Use the published page's dates, never the time the site happened to build.
 * @param {string} html
 * @returns {string | undefined}
 */
export function articleLastmod(html) {
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(match[1]);
    const entries = Array.isArray(data) ? data : [data];
    for (const entry of entries) {
      if (!entry || typeof entry !== "object" || entry["@type"] !== "BlogPosting") continue;
      const value = entry.dateModified ?? entry.datePublished;
      if (value === undefined) return undefined;
      if (typeof value !== "string" || !Number.isFinite(Date.parse(value))) {
        throw new Error("BlogPosting has an invalid publication/update date");
      }
      return new Date(value).toISOString();
    }
  }
  return undefined;
}
