import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const component = readFileSync(new URL("../src/components/site/AffiliateReferral.astro", import.meta.url), "utf8");
const script = component.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];

function browser(options = {}) {
  const { hostname = "vifi.us", href = "https://vifi.us/pricing", gpc = false, toltPublicKey = "pub_1234567890", stored = null, now = 1_000_000, storageFailure = false } = options;
  const storage = new Map(stored ? [["vifi_affiliate_referral", JSON.stringify(stored)]] : []);
  const scripts = [];
  const listeners = new Map();
  const localStorage = {
    getItem: (key) => { if (storageFailure) throw new Error("blocked"); return storage.get(key) ?? null; },
    setItem: (key, value) => { if (storageFailure) throw new Error("blocked"); storage.set(key, value); },
    removeItem: (key) => { storage.delete(key); },
  };
  class Element {}
  const context = vm.createContext({
    toltPublicKey,
    location: { hostname, href },
    navigator: { globalPrivacyControl: gpc },
    window: { localStorage },
    document: {
      createElement: () => ({ setAttribute(name, value) { this[name] = value; } }),
      head: { appendChild: (element) => scripts.push(element) },
      addEventListener: (event, handler) => listeners.set(event, handler),
    },
    Element, URL, JSON, Date: { now: () => now }, Number,
  });
  const anchor = (href) => {
    const el = new Element();
    el.href = href;
    el.getAttribute = () => el.href;
    el.closest = () => el;
    return el;
  };
  return {
    run: () => vm.runInContext(script, context),
    storage, scripts,
    click: (href, type = "click", button = 0) => {
      const el = anchor(href);
      listeners.get(type)({ type, button, target: el });
      return el.href;
    },
    stored: () => storage.get("vifi_affiliate_referral"),
  };
}

test("remembers the first well-formed ref for 90 days and loads the Tolt script", () => {
  const b = browser({ href: "https://vifi.us/?ref=jason&utm_source=x" });
  b.run();
  assert.deepEqual(JSON.parse(b.stored()), { value: "jason", captured_at: 1_000_000 });
  assert.equal(b.scripts.length, 1);
  assert.equal(b.scripts[0].src, "https://files.tlt-cdn.com/tlt.js");
  assert.equal(b.scripts[0]["data-tolt"], "pub_1234567890");
  assert.equal(b.scripts[0].async, true);
});

test("first touch wins over a later partner link until it expires", () => {
  const stored = { value: "first", captured_at: 1_000_000 };
  const later = browser({ href: "https://vifi.us/?ref=second", stored, now: 1_000_000 + 5_000 });
  later.run();
  assert.equal(JSON.parse(later.stored()).value, "first");

  const expired = browser({ href: "https://vifi.us/?ref=second", stored, now: 1_000_000 + 91 * 24 * 60 * 60 * 1000 });
  expired.run();
  assert.equal(JSON.parse(expired.stored()).value, "second");
});

test("ignores ill-formed or repeated ref values", () => {
  for (const href of ["https://vifi.us/?ref=not%20a%20slug", "https://vifi.us/?ref=a&ref=b", "https://vifi.us/?ref=user%40example.com", "https://vifi.us/?via=jason"]) {
    const b = browser({ href });
    b.run();
    assert.equal(b.stored(), undefined, href);
  }
});

test("decorates only app.vifi.us/register links that carry no ref of their own", () => {
  const b = browser({ stored: { value: "jason", captured_at: 1_000_000 } });
  b.run();
  assert.equal(b.click("https://app.vifi.us/register"), "https://app.vifi.us/register?ref=jason");
  assert.equal(b.click("https://app.vifi.us/register/"), "https://app.vifi.us/register/?ref=jason");
  assert.equal(b.click("https://app.vifi.us/register?utm_source=x", "auxclick", 1), "https://app.vifi.us/register?utm_source=x&ref=jason");
  assert.equal(b.click("https://app.vifi.us/register?ref=other"), "https://app.vifi.us/register?ref=other");
  assert.equal(b.click("https://app.vifi.us/login"), "https://app.vifi.us/login");
  assert.equal(b.click("https://vifi.us/pricing"), "https://vifi.us/pricing");
  assert.equal(b.click("https://app.vifi.us/register", "auxclick", 2), "https://app.vifi.us/register");
});

test("does nothing on preview hosts, under Global Privacy Control, or with a bad key", () => {
  for (const options of [
    { hostname: "localhost" }, { hostname: "test-site.vifi.us" }, { hostname: "vifi.us.evil.example" }, { gpc: true },
  ]) {
    const b = browser({ href: "https://vifi.us/?ref=jason", stored: { value: "jason", captured_at: 1_000_000 }, ...options });
    b.run();
    assert.equal(b.scripts.length, 0, JSON.stringify(options));
    if (!options.gpc) assert.equal(b.stored(), b.stored());
  }
  const noKey = browser({ href: "https://vifi.us/?ref=jason", toltPublicKey: "" });
  noKey.run();
  assert.equal(noKey.scripts.length, 0);
  assert.equal(JSON.parse(noKey.stored()).value, "jason", "referral memory works without the vendor script");
  const badKey = browser({ toltPublicKey: "<script>" });
  badKey.run();
  assert.equal(badKey.scripts.length, 0);
});

test("a blocked storage never throws and never loads twice", () => {
  const b = browser({ href: "https://vifi.us/?ref=jason", storageFailure: true });
  assert.doesNotThrow(() => b.run());
  assert.equal(b.scripts.length, 1);
  assert.equal(b.click("https://app.vifi.us/register"), "https://app.vifi.us/register");
});
