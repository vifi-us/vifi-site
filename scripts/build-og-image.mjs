// Renders the Open Graph share image from the homepage hero, so the card social
// networks show is always the hero that is live on the site.
//
// The eyebrow, headline, fine print and illustration (phone + float cards) are
// lifted straight out of src/components/home/HomeStory.astro and styled by the
// site's built stylesheet, then photographed by headless Chrome at 1200x630.
// The PNG lands in public/og/ under a name that carries a hash of everything it
// was made from, and src/data/og-image.json (served by src/data/site.ts as the
// default social image) points at it. A new name means social networks fetch
// the new card instead of serving a cached one.
//
//   npm run build      # the renderer reads the built stylesheet in dist/
//   npm run build:og   # needs google-chrome on PATH, or CHROME=/path/to/chrome
//
// scripts/og-image.test.mjs compares the hash in og-image.json with the current
// inputs, so a hero change cannot ship with a stale card.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const self = fileURLToPath(import.meta.url);
export const root = resolve(self, "../..");
export const manifestPath = resolve(root, "src/data/og-image.json");
export const outDir = resolve(root, "public/og");
export const WIDTH = 1200;
export const HEIGHT = 630;
const FILE_PATTERN = /^vifi-hero-[0-9a-f]{10}\.png$/;

const read = (path) => readFileSync(resolve(root, path), "utf8").replace(/\r\n/g, "\n");

/** Everything the card is made of. Its hash names the output file. */
export function collectInputs() {
  const story = read("src/components/home/HomeStory.astro");
  const hero = story.match(/<section class="hero shell" id="top">[\s\S]*?<\/section>/)?.[0];
  if (!hero) throw new Error("hero section not found in src/components/home/HomeStory.astro");
  const theme = read("src/styles/global.css").match(/@theme \{[\s\S]*?\n\}/)?.[0];
  if (!theme) throw new Error("@theme block not found in src/styles/global.css");
  return {
    hero,
    theme,
    wordmark: read("public/brand/vifi-logo.svg"),
    renderer: readFileSync(self, "utf8").replace(/\r\n/g, "\n"),
  };
}

export const hashInputs = (inputs) =>
  createHash("sha256").update(JSON.stringify(inputs)).digest("hex").slice(0, 10);

export const readManifest = () => JSON.parse(readFileSync(manifestPath, "utf8"));

/** The pieces of the hero section the card lays out. */
export function heroParts(hero) {
  const part = (name, re) => {
    const match = hero.match(re);
    if (!match) throw new Error(`hero ${name} not found`);
    return match[1];
  };
  const eyebrow = part("eyebrow", /<p class="eyebrow"><i><\/i>\s*([^<]+?)\s*<\/p>/);
  const headline = part("headline", /<h1>([\s\S]*?)<\/h1>/);
  const fine = part("fine print", /(<p class="fine">[\s\S]*?<\/p>)/);
  const visualLabel = part("visual label", /<div class="hero-visual"[^>]*aria-label="([^"]+)"/);
  // Greedy: the hero-visual closes on the last </div> before the section ends.
  const visual = part("visual", /<div class="hero-visual"[^>]*>([\s\S]*)<\/div>\s*<\/section>/);
  const plainHeadline = headline
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    eyebrow,
    headline: headline.replace(/<br\s*\/?>/g, " "),
    plainHeadline,
    fine,
    visual,
    visualLabel,
    alt: `ViFi graphic: “${plainHeadline}” ${visualLabel}.`,
  };
}

/** The stylesheet the built homepage links, with asset URLs pointed at dist/. */
function builtCss() {
  const index = resolve(root, "dist/index.html");
  if (!existsSync(index)) {
    throw new Error("dist/index.html not found: run `npm run build` first; the card uses the built stylesheet");
  }
  const hrefs = [...readFileSync(index, "utf8").matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((m) => m[1]);
  if (!hrefs.length) throw new Error("no stylesheet linked from dist/index.html");
  return hrefs
    .map((href) => readFileSync(resolve(root, "dist", `.${href}`), "utf8"))
    .join("\n")
    .replace(/url\(\//g, `url(file://${resolve(root, "dist")}/`);
}

export function cardHtml({ css, parts, wordmark }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>ViFi share image</title>
<style>${css}</style>
<style>
  html, body { margin: 0; width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  .og { box-sizing: border-box; width: ${WIDTH}px; height: ${HEIGHT}px; padding: 44px 60px 46px; display: flex; flex-direction: column; }
  .og-top { display: flex; align-items: center; justify-content: space-between; }
  .og-top svg { display: block; width: 98px; height: 46px; }
  .og-top .mono { font-size: 15px; letter-spacing: 0.08em; color: var(--muted-2); }
  .og-body { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr 460px; align-items: center; gap: 36px; }
  .og-copy { display: flex; flex-direction: column; align-items: flex-start; gap: 24px; }
  .og-copy .eyebrow { font-size: 15px; }
  .og-copy h1 { font-size: 66px; line-height: 1.04; letter-spacing: -0.035em; max-width: 600px; }
  .og-copy .fine { font-size: 15px; gap: 6px 14px; }
  .og-copy .fine i { width: 6px; height: 6px; }
  .og .hero-visual { min-height: 0; height: 520px; }
  .og .hero-art { width: 460px; }
  .og .f-memory { right: -12px; top: -4px; }
  /* One still frame of the animated hero. */
  .site * { animation: none !important; transition: none !important; }
  .hero-art .ring { opacity: 0.55; }
  .hero-art .bar { transform: scaleY(var(--a, 1)); }
</style>
</head>
<body>
<div class="site">
  <div class="og">
    <div class="og-top">${wordmark}<span class="mono">vifi.us</span></div>
    <div class="og-body">
      <div class="og-copy">
        <p class="eyebrow"><i></i> ${parts.eyebrow}</p>
        <h1>${parts.headline}</h1>
        ${parts.fine}
      </div>
      <div class="hero-visual">${parts.visual}</div>
    </div>
  </div>
</div>
</body>
</html>
`;
}

function findChrome() {
  const candidates = [process.env.CHROME, "google-chrome", "google-chrome-stable", "chromium", "chromium-browser"].filter(Boolean);
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ["--version"], { stdio: "ignore" });
      return candidate;
    } catch {
      // try the next one
    }
  }
  throw new Error("no Chrome found: install google-chrome or set CHROME=/path/to/chrome");
}

function screenshot(chrome, htmlFile, pngFile) {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      "--force-device-scale-factor=1",
      `--window-size=${WIDTH},${HEIGHT}`,
      "--virtual-time-budget=4000",
      `--screenshot=${pngFile}`,
      `file://${htmlFile}`,
    ],
    { stdio: "ignore", timeout: 60000 },
  );
}

/** Width, height and colour type from a PNG's IHDR chunk. */
export function pngInfo(buffer) {
  if (buffer.toString("latin1", 1, 4) !== "PNG") throw new Error("not a PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), colorType: buffer[25] };
}

async function main() {
  const chrome = findChrome();
  const inputs = collectInputs();
  const hash = hashInputs(inputs);
  const parts = heroParts(inputs.hero);
  const file = `vifi-hero-${hash}.png`;
  const png = resolve(outDir, file);

  const tmp = mkdtempSync(resolve(tmpdir(), "vifi-og-"));
  try {
    const htmlFile = resolve(tmp, "card.html");
    writeFileSync(htmlFile, cardHtml({ css: builtCss(), parts, wordmark: inputs.wordmark }));
    mkdirSync(outDir, { recursive: true });
    screenshot(chrome, htmlFile, png);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  const info = pngInfo(readFileSync(png));
  if (info.width !== WIDTH || info.height !== HEIGHT) {
    throw new Error(`rendered ${info.width}x${info.height}, expected ${WIDTH}x${HEIGHT}`);
  }
  for (const stale of readdirSync(outDir)) {
    if (stale !== file && FILE_PATTERN.test(stale)) unlinkSync(resolve(outDir, stale));
  }
  const manifest = { src: `/og/${file}`, width: WIDTH, height: HEIGHT, type: "image/png", alt: parts.alt, sourceHash: hash };
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`wrote public/og/${file} and src/data/og-image.json`);
}

if (process.argv[1] && resolve(process.argv[1]) === self) await main();
