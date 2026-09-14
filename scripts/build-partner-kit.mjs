// Renders the partner marketing kit (banners, logo PNGs) into public/partners/kit
// with headless Chrome, using the site's self-hosted fonts. Run from the repo
// root:  node scripts/build-partner-kit.mjs   (needs google-chrome on PATH).
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.url.replace("file://", ""), "../..");
const out = resolve(root, "public/partners/kit");
const tmp = resolve(root, ".partner-kit-tmp");
const fonts = resolve(root, "public/fonts");
mkdirSync(out, { recursive: true });
mkdirSync(tmp, { recursive: true });

const chrome = process.env.CHROME || "google-chrome";
const themes = {
  light: { bg: "#f8fafc", ink: "#1e293b", muted: "#475569", accent: "#0055ff", btnInk: "#ffffff", tile: "#ffffff", frame: "#0055ff", shadow: "#0041c4" },
  dark: { bg: "#0b1220", ink: "#f8fafc", muted: "#b6c2d4", accent: "#0055ff", btnInk: "#ffffff", tile: "#ffffff", frame: "#0055ff", shadow: "#0041c4" },
};
const mark = (t, size) => `<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true">
  <rect x="4" y="4" width="27" height="27" rx="7" fill="${t.shadow}"/>
  <rect x="1" y="1" width="27" height="27" rx="7" fill="${t.tile}" stroke="${t.frame}" stroke-width="2"/>
  <g transform="translate(1.7 1.7) scale(0.8)" fill="none" stroke="${t.frame}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7.5 5.5h4.3l2.1 5.2-3.1 2.3a17.8 17.8 0 0 0 8.2 8.2l2.3-3.1 5.2 2.1v4.3a2.5 2.5 0 0 1-2.5 2.5C13.5 27 5 18.5 5 8a2.5 2.5 0 0 1 2.5-2.5Z" stroke-width="2.8"/>
    <path d="M20 5q7 1 7 8M20.5 9q3.1.7 3.5 4" stroke-width="2.1"/>
  </g></svg>`;
const wordmark = (t, px) => `<span style="display:inline-flex;align-items:baseline;font-weight:700;letter-spacing:-0.05em;line-height:1;font-size:${px}px;color:${t.ink}">Vi<span style="color:${t.accent}">Fi</span><span style="position:relative;top:-0.55em;margin-left:0.1em;display:inline-block;width:0.26em;height:0.26em;border-radius:50%;border:0.08em solid ${t.accent}"></span></span>`;

const base = (t, w, h, body) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:"Instrument Sans";font-weight:400 700;src:url("file://${fonts}/instrument-sans-latin.woff2") format("woff2")}
@font-face{font-family:"JetBrains Mono";font-weight:400 600;src:url("file://${fonts}/jetbrains-mono-latin.woff2") format("woff2")}
html,body{margin:0;padding:0;width:${w}px;height:${h}px;overflow:hidden;background:${t.bg};font-family:"Instrument Sans",system-ui,sans-serif;color:${t.ink};-webkit-font-smoothing:antialiased}
.ad{box-sizing:border-box;width:${w}px;height:${h}px;display:flex;position:relative}
.h{font-weight:700;letter-spacing:-0.025em;line-height:1.05;margin:0}
.s{color:${t.muted};margin:0;line-height:1.3}
.btn{display:inline-flex;align-items:center;justify-content:center;background:${t.accent};color:${t.btnInk};font-weight:600;border-radius:8px;white-space:nowrap;box-shadow:3px 3px 0 ${t.shadow}}
.eyebrow{font-family:"JetBrains Mono",monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${t.accent};margin:0}
</style></head><body>${body}</body></html>`;

const HEADLINE = "Never miss a call again.";
const SUB = "AI phone assistant for small business. Answers 24/7, sends you the recap.";
const CTA = "Start free trial";

const layouts = {
  "728x90": (t) => `<div class="ad" style="align-items:center;gap:18px;padding:0 22px">
    ${mark(t, 46)}<div style="display:flex;flex-direction:column;gap:4px;flex:1;min-width:0">
      <p class="h" style="font-size:24px">${HEADLINE}</p><p class="s" style="font-size:13px">${SUB}</p></div>
    ${wordmark(t, 26)}<span class="btn" style="font-size:14px;height:38px;padding:0 18px;margin-left:16px">${CTA}</span></div>`,
  "320x100": (t) => `<div class="ad" style="align-items:center;gap:12px;padding:0 14px">
    ${mark(t, 40)}<div style="display:flex;flex-direction:column;gap:3px;flex:1;min-width:0">
      <p class="h" style="font-size:17px">${HEADLINE}</p><p class="s" style="font-size:11px">Answers 24/7. Recap after every call.</p></div>
    <span class="btn" style="font-size:12px;height:32px;padding:0 12px">Try free</span></div>`,
  "300x250": (t) => `<div class="ad" style="flex-direction:column;justify-content:space-between;padding:22px 24px">
    <div style="display:flex;align-items:center;gap:10px">${mark(t, 34)}${wordmark(t, 24)}</div>
    <div><p class="eyebrow" style="margin-bottom:8px">AI phone assistant</p><p class="h" style="font-size:30px">${HEADLINE}</p>
      <p class="s" style="font-size:14px;margin-top:10px">Answers 24/7 and sends you a summary, transcript and recording after every call.</p></div>
    <span class="btn" style="font-size:15px;height:42px;padding:0 20px;align-self:flex-start">${CTA}</span></div>`,
  "160x600": (t) => `<div class="ad" style="flex-direction:column;align-items:center;text-align:center;justify-content:space-between;padding:26px 16px">
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px">${mark(t, 56)}${wordmark(t, 30)}</div>
    <div><p class="h" style="font-size:28px">Never miss a call again.</p><p class="s" style="font-size:14px;margin-top:14px">Your AI phone assistant answers 24/7 and briefs you after every call.</p></div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:12px"><span class="btn" style="font-size:14px;height:42px;padding:0 18px">Try it free</span><p class="s" style="font-size:11px">7-day trial · no card</p></div></div>`,
  "300x600": (t) => `<div class="ad" style="flex-direction:column;justify-content:space-between;padding:32px 30px">
    <div style="display:flex;align-items:center;gap:12px">${mark(t, 44)}${wordmark(t, 30)}</div>
    <div><p class="eyebrow" style="margin-bottom:12px">AI phone assistant</p><p class="h" style="font-size:44px">${HEADLINE}</p>
      <p class="s" style="font-size:17px;margin-top:16px">It answers 24/7, has a real conversation, and sends you a summary, transcript and recording the moment the call ends.</p></div>
    <div style="display:flex;flex-direction:column;gap:12px"><span class="btn" style="font-size:16px;height:48px;padding:0 22px;align-self:flex-start">${CTA}</span><p class="s" style="font-size:12px">7-day free trial · No credit card · Keep your number</p></div></div>`,
  "1200x628": (t) => `<div class="ad" style="align-items:center;gap:56px;padding:0 72px">
    <div style="flex:1"><div style="display:flex;align-items:center;gap:16px;margin-bottom:34px">${mark(t, 64)}${wordmark(t, 44)}</div>
      <p class="eyebrow" style="font-size:14px;margin-bottom:16px">AI phone assistant for small business</p>
      <p class="h" style="font-size:72px">${HEADLINE}</p>
      <p class="s" style="font-size:26px;margin-top:22px;max-width:640px">Answers 24/7, has a real conversation, and sends you a summary, transcript and recording after every call.</p>
      <div style="display:flex;align-items:center;gap:20px;margin-top:34px"><span class="btn" style="font-size:20px;height:60px;padding:0 30px;border-radius:10px">${CTA}</span><p class="s" style="font-size:16px">7-day free trial · No credit card</p></div></div>
    ${mark(t, 220)}</div>`,
  "1080x1080": (t) => `<div class="ad" style="flex-direction:column;justify-content:space-between;padding:80px 84px">
    <div style="display:flex;align-items:center;gap:18px">${mark(t, 72)}${wordmark(t, 52)}</div>
    <div><p class="eyebrow" style="font-size:16px;margin-bottom:22px">AI phone assistant for small business</p>
      <p class="h" style="font-size:96px">${HEADLINE}</p>
      <p class="s" style="font-size:32px;margin-top:30px;max-width:880px">It answers 24/7, helps the caller, and sends you a summary, transcript and recording the moment the call ends.</p></div>
    <div style="display:flex;align-items:center;gap:26px"><span class="btn" style="font-size:26px;height:76px;padding:0 40px;border-radius:12px">${CTA}</span><p class="s" style="font-size:22px">7-day free trial · No credit card</p></div></div>`,
};

function shoot(name, w, h, html, scale = 1, transparent = false) {
  const file = resolve(tmp, `${name}.html`);
  writeFileSync(file, html);
  execFileSync(chrome, [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars", "--allow-file-access-from-files",
    ...(transparent ? ["--default-background-color=00000000"] : []),
    `--force-device-scale-factor=${scale}`, `--window-size=${w},${h}`, `--screenshot=${resolve(out, `${name}.png`)}`, `file://${file}`,
  ], { stdio: "ignore", timeout: 60000 });
  console.log("wrote", `${name}.png`);
}

for (const [size, layout] of Object.entries(layouts)) {
  const [w, h] = size.split("x").map(Number);
  for (const [theme, t] of Object.entries(themes)) shoot(`banner-${size}-${theme}`, w, h, base(t, w, h, layout(t)));
}
for (const [theme, t] of Object.entries(themes)) {
  shoot(`vifi-wordmark-${theme}`, 640, 220, base(t, 640, 220, `<div class="ad" style="align-items:center;justify-content:center;gap:24px">${mark(t, 96)}${wordmark(t, 120)}</div>`), 2);
}
shoot("vifi-mark-512", 512, 512, base({ ...themes.light, bg: "transparent" }, 512, 512, `<div class="ad" style="align-items:center;justify-content:center">${mark(themes.light, 480)}</div>`), 1, true);
rmSync(tmp, { recursive: true, force: true });
