import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const component = readFileSync(
  new URL("../src/components/site/OpenAIAds.astro", import.meta.url), "utf8",
);
const script = component.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];

function browser(overrides = {}) {
  const scripts = [];
  const cookies = new Map(overrides.cookie === "" ? [] : [["vifi_ads_consent", overrides.cookie || "v1.granted"]]);
  const cookieWrites = [];
  const fetches = [];
  const elements = new Map();
  const events = new Map();
  const control = { hidden: true, open: false, querySelector(selector) {
    if (!elements.has(selector)) elements.set(selector, { hidden: false, textContent: "", addEventListener: (event, handler) => events.set(selector + event, handler) });
    return elements.get(selector);
  } };
  const doc = {
    readyState: "complete",
    createElement: () => ({}),
    head: { appendChild: (element) => scripts.push(element) },
    getElementById: () => control,
    get cookie() { return [...cookies].map(([key, value]) => key + "=" + value).join("; "); },
    set cookie(raw) {
      cookieWrites.push(raw);
      const item = raw.split(";")[0];
      const split = item.indexOf("=");
      if (raw.includes("Max-Age=0")) cookies.delete(item.slice(0, split));
      else cookies.set(item.slice(0, split), item.slice(split + 1));
    },
  };
  const context = vm.createContext({
    pixelId: "test-pixel",
    location: { hostname: "vifi.us", pathname: "/pricing/", search: "?utm_campaign=spring" },
    navigator: {},
    window: { addEventListener: (event, handler) => events.set(event, handler) },
    document: doc,
    fetch: (...args) => { fetches.push(args); return Promise.resolve({ ok: true }); },
    ...overrides,
  });
  return {
    context, scripts, cookies, cookieWrites, fetches, control,
    click: (selector) => events.get(selector + "click")(),
    run: () => vm.runInContext(script, context),
    commands: () => Array.from(context.window.oaiq?.q || [], (args) =>
      JSON.parse(JSON.stringify(Array.from(args)))),
  };
}

test("disabled IDs, preview hosts, concept routes and GPC never load or measure", () => {
  for (const overrides of [
    { pixelId: "" },
    { location: { hostname: "localhost", pathname: "/" } },
    { location: { hostname: "test-site.vifi.us", pathname: "/" } },
    { location: { hostname: "vifi.us.evil.example", pathname: "/" } },
    { location: { hostname: "vifi.us", pathname: "/signal" } },
    { location: { hostname: "vifi.us", pathname: "/signal/pricing/" } },
    { navigator: { globalPrivacyControl: true } },
  ]) {
    const page = browser(overrides);
    page.run();
    assert.equal(page.scripts.length, 0);
    assert.deepEqual(page.commands(), []);
  }
});

test("queues one initialization and page view per document with personalization excluded", () => {
  const page = browser();
  page.run();
  page.run();
  assert.equal(page.scripts.length, 1);
  assert.equal(page.scripts[0].async, true);
  assert.equal(page.scripts[0].src, "https://bzrcdn.openai.com/sdk/oaiq.min.js");
  assert.deepEqual(page.commands(), [
    ["consent", true],
    ["init", { pixelId: "test-pixel" }],
    ["measure", "page_viewed", {
      type: "contents", contents: [{ id: "/pricing/", content_type: "page" }],
    }, { opt_out: true }],
  ]);
  assert.equal(JSON.stringify(page.commands()).includes("private"), false);
});

test("measurement defaults off and a new explicit choice enables it", () => {
  const page = browser({ cookie: "" });
  page.run();
  assert.equal(page.scripts.length, 0);
  assert.deepEqual(page.commands(), []);
  assert.equal(page.control.hidden, false);
  assert.equal(page.control.open, true);
  page.click("[data-ads-allow]");
  assert.equal(page.cookies.get("vifi_ads_consent"), "v1.granted");
  assert.equal(page.scripts.length, 1);
  assert.deepEqual(page.commands()[0], ["consent", true]);
  assert.ok(page.cookieWrites.some((value) => value.includes("Domain=.vifi.us; Path=/; SameSite=Lax; Secure")));
});

test("no explicit grant leaves an existing SDK consent denial untouched", () => {
  const calls = [];
  const page = browser({ cookie: "", window: { oaiq: (...args) => calls.push(args), addEventListener() {} } });
  page.run();
  assert.equal(page.scripts.length, 0);
  assert.deepEqual(calls, []);
});

test("only a consented raw click is handed to app.vifi.us through a dedicated shared cookie", () => {
  const location = { hostname: "vifi.us", pathname: "/pricing/", search: "?oppref=opaque%2Bunchanged==" };
  const page = browser({ location, cookie: "" });
  page.run();
  assert.equal(page.cookies.has("vifi_ads_oppref"), false);
  page.click("[data-ads-allow]");
  assert.equal(page.cookies.get("vifi_ads_oppref"), "opaque%2Bunchanged==");
  assert.ok(page.cookieWrites.includes("vifi_ads_oppref=opaque%2Bunchanged==; Max-Age=2592000; Domain=.vifi.us; Path=/; SameSite=Lax; Secure"));
  assert.equal(JSON.stringify(page.commands()).includes("opaque"), false);
  assert.equal(JSON.stringify(page.fetches).includes("opaque"), false);
  page.click("[data-ads-decline]");
  assert.equal(page.cookies.has("vifi_ads_oppref"), false);
  assert.equal(page.cookies.get("vifi_ads_consent"), "v1.denied");
  assert.deepEqual(page.commands().at(-1), ["consent", false]);
  const [, request] = page.fetches.at(-1);
  assert.equal(request.method, "POST");
  assert.equal(JSON.parse(request.headers["X-ViFi-Ads-Context"]).decision, "denied");
});

test("GPC cannot be overridden and unsafe query/hash pages do not load the SDK", () => {
  const gpc = browser({ navigator: { globalPrivacyControl: true } });
  gpc.run();
  gpc.click("[data-ads-allow]");
  assert.equal(gpc.scripts.length, 0);
  assert.equal(gpc.cookies.get("vifi_ads_consent"), "v1.denied");
  for (const location of [
    { hostname: "vifi.us", pathname: "/pricing/", search: "?email=private" },
    { hostname: "vifi.us", pathname: "/pricing/", hash: "#secret" },
  ]) {
    const page = browser({ location });
    page.run();
    assert.equal(page.scripts.length, 0);
  }
});

test("only individual primary blog articles publish a content view", () => {
  for (const pathname of ["/blog/", "/blog/welcome/", "/blog/welcome", "/pricing/"]) {
    const page = browser({ location: { hostname: "www.vifi.us", pathname } });
    page.run();
    const events = page.commands().filter((args) => args[1] === "contents_viewed");
    assert.equal(events.length, pathname.includes("welcome") ? 1 : 0);
    for (const event of events) {
      assert.deepEqual(event[2], {
        type: "contents", contents: [{ id: pathname, content_type: "article" }],
      });
      assert.deepEqual(event[3], { opt_out: true });
    }
  }
});

test("SDK and DOM failures do not escape into the page", () => {
  const sdkFailure = browser({ window: { oaiq: () => { throw new Error("blocked"); } } });
  assert.doesNotThrow(sdkFailure.run);
  assert.equal(sdkFailure.control.hidden, false);
  sdkFailure.click("[data-ads-decline]");
  assert.equal(JSON.parse(sdkFailure.fetches.at(-1)[1].headers["X-ViFi-Ads-Context"]).decision, "denied");
  const domFailure = browser({ document: { createElement: () => { throw new Error("blocked"); } } });
  assert.doesNotThrow(domFailure.run);
});
