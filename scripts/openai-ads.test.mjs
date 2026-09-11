import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const component = readFileSync(new URL("../src/components/site/OpenAIAds.astro", import.meta.url), "utf8");
const script = component.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
const policyURL = "https://app.vifi.us/api/auth/ad-measurement-policy";
const settle = async () => { for (let i = 0; i < 5; i++) await new Promise(setImmediate); };
const deferred = () => { let resolve; const promise = new Promise((done) => { resolve = done; }); return { promise, resolve }; };

function browser(options = {}) {
  const { policy = { version: 2, default_allowed: true, account_opt_out: false }, cookie = "", fetchImpl, cookieFailure = false, duplicateCookie = "", ...overrides } = options;
  const scripts = [], cookieWrites = [], fetches = [];
  const cookies = new Map(cookie ? [["vifi_ads_consent", cookie]] : []);
  let extraCookie = duplicateCookie;
  const elements = new Map(), events = new Map();
  const control = { hidden: true, open: false, querySelector(selector) {
    if (!elements.has(selector)) elements.set(selector, { hidden: false, textContent: "", addEventListener: (event, handler) => events.set(selector + event, handler) });
    return elements.get(selector);
  } };
  const doc = {
    readyState: "complete", createElement: () => ({}),
    head: { appendChild: (element) => scripts.push(element) }, getElementById: () => control,
    get cookie() { return [...cookies].map(([key, value]) => key + "=" + value).concat(extraCookie ? ["vifi_ads_consent=" + extraCookie] : []).join("; "); },
    set cookie(raw) {
      if (cookieFailure) throw new Error("storage unavailable");
      cookieWrites.push(raw);
      const item = raw.split(";")[0], split = item.indexOf("="), name = item.slice(0, split);
      if (raw.includes("Max-Age=0")) {
        cookies.delete(name);
        if (name === "vifi_ads_consent") extraCookie = "";
      } else cookies.set(name, item.slice(split + 1));
    },
  };
  const context = vm.createContext({
    pixelId: "test-pixel", browserEnabled: true,
    location: { hostname: "vifi.us", pathname: "/pricing/", search: "?utm_campaign=spring" },
    navigator: {}, window: { addEventListener: (event, handler) => events.set(event, handler) }, document: doc,
    AbortController, setTimeout, clearTimeout,
    fetch: (...args) => {
      fetches.push(args);
      return fetchImpl ? fetchImpl(...args) : Promise.resolve({ ok: true, json: async () => policy });
    }, ...overrides,
  });
  return {
    context, scripts, cookies, cookieWrites, fetches, control, elements,
    click: (selector) => events.get(selector + "click")(), focus: () => events.get("focus")(),
    run: () => vm.runInContext(script, context),
    commands: () => Array.from(context.window.oaiq?.q || [], (args) => JSON.parse(JSON.stringify(Array.from(args)))),
    posts: () => fetches.filter(([, request]) => request.method === "POST").map(([, request]) => JSON.parse(request.headers["X-ViFi-Ads-Context"])),
  };
}

test("disabled identifiers, preview hosts and concept routes make no policy or SDK requests", async () => {
  for (const overrides of [
    { pixelId: "" }, { location: { hostname: "localhost", pathname: "/" } },
    { location: { hostname: "test-site.vifi.us", pathname: "/" } },
    { location: { hostname: "vifi.us.evil.example", pathname: "/" } },
    { location: { hostname: "vifi.us", pathname: "/signal" } },
    { location: { hostname: "vifi.us", pathname: "/signal/pricing/" } },
  ]) {
    const page = browser(overrides); page.run(); await settle();
    assert.equal(page.scripts.length, 0); assert.equal(page.fetches.length, 0);
  }
});

test("US default waits for policy, creates no consent cookie and keeps the control compact", async () => {
  const gate = deferred();
  const page = browser({ fetchImpl: (url) => url === policyURL ? gate.promise : Promise.resolve({ ok: true }) });
  page.run(); page.run();
  assert.equal(page.scripts.length, 0); assert.equal(page.control.open, false);
  assert.equal(page.fetches.length, 1);
  const [url, request] = page.fetches[0];
  assert.equal(url, policyURL); assert.equal(request.credentials, "include");
  assert.equal(request.cache, "no-store"); assert.equal(request.referrerPolicy, "no-referrer");
  assert.equal(request.redirect, "error"); assert.equal(request.headers, undefined);
  gate.resolve({ ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: false }) });
  await settle();
  assert.equal(page.scripts.length, 1); assert.equal(page.control.open, false);
  assert.equal(page.elements.get("[data-ads-status]").textContent, "On");
  assert.equal(page.cookies.has("vifi_ads_consent"), false);
  assert.equal(page.scripts[0].src, "https://bzrcdn.openai.com/sdk/oaiq.min.js");
  assert.deepEqual(page.commands(), [
    ["consent", true], ["init", { pixelId: "test-pixel" }],
    ["measure", "page_viewed", { type: "contents", contents: [{ id: "/pricing/", content_type: "page" }] }, { opt_out: true }],
  ]);
  assert.deepEqual(page.posts(), [{ v: 2, decision: "granted", basis: "regional_default", source_url: "https://app.vifi.us/privacy" }]);
});

test("non-US and malformed or failed policies stay off, including remembered grants on failure", async () => {
  for (const policy of [null, {}, { version: 1, default_allowed: true, account_opt_out: false },
    { version: 2, default_allowed: "true", account_opt_out: false },
    { version: 2, default_allowed: true }, { version: 2, default_allowed: false, account_opt_out: false }]) {
    const page = browser({ policy }); page.run(); await settle();
    assert.equal(page.scripts.length, 0); assert.equal(page.cookies.has("vifi_ads_consent"), false);
  }
  for (const cookie of ["", "v1.granted", "v2.granted"]) {
    for (const fetchImpl of [async () => { throw new Error("offline"); }, async () => ({ ok: false })]) {
      const page = browser({ cookie, fetchImpl }); page.run(); await settle(); assert.equal(page.scripts.length, 0);
    }
  }
});

test("GPC and every saved refusal or ambiguous cookie override US default and clear attribution", async () => {
  for (const overrides of [
    { navigator: { globalPrivacyControl: true } }, { cookie: "v1.denied" }, { cookie: "v2.denied" },
    { cookie: "unknown" }, { cookie: "v2.granted", duplicateCookie: "v1.denied" },
    { cookie: "v2.granted", duplicateCookie: "v2.granted" },
  ]) {
    const page = browser(overrides); page.cookies.set("vifi_ads_oppref", "old-click");
    page.run(); await settle();
    assert.equal(page.scripts.length, 0); assert.equal(page.cookies.has("vifi_ads_oppref"), false);
    assert.ok(page.posts().every((post) => post.decision === "denied" && !post.explicit_action));
  }
});

test("fresh explicit Allow works outside US and uses v2 without changing personalization", async () => {
  const page = browser({ policy: { version: 2, default_allowed: false, account_opt_out: false } });
  page.run(); await settle(); page.click("[data-ads-allow]"); await settle();
  assert.equal(page.cookies.get("vifi_ads_consent"), "v2.granted"); assert.equal(page.scripts.length, 1);
  assert.ok(page.posts().some((post) => post.decision === "granted" && post.basis === "explicit" && post.explicit_action === true));
  assert.ok(page.commands().filter((cmd) => cmd[0] === "measure").every((cmd) => cmd[3].opt_out === true));
  page.focus(); await settle(); assert.equal(page.posts().filter((post) => post.explicit_action).length, 1);
});

test("legacy explicit grants retain attribution but never silently enable public contact matching", async () => {
  const page = browser({ cookie: "v1.granted", location: { hostname: "vifi.us", pathname: "/pricing/", search: "?oppref=raw%2Fopaque" } });
  page.run(); await settle();
  assert.equal(page.cookies.get("vifi_ads_oppref"), "raw%2Fopaque"); assert.equal(page.scripts.length, 0);
  assert.equal(page.elements.get("[data-ads-legacy]").hidden, false);
  page.click("[data-ads-allow]"); await settle();
  assert.equal(page.cookies.get("vifi_ads_consent"), "v2.granted"); assert.equal(page.scripts.length, 1);
});

test("account refusal requires successful fresh Allow and a policy readback before Pixel load", async () => {
  let optedOut = true;
  const post = deferred();
  const page = browser({ cookie: "v2.granted", fetchImpl: (url) => url === policyURL
    ? Promise.resolve({ ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: optedOut }) }) : post.promise });
  page.run(); await settle(); assert.equal(page.scripts.length, 0); assert.equal(page.posts().length, 0);
  page.click("[data-ads-allow]"); await settle(); assert.equal(page.scripts.length, 0);
  optedOut = false; post.resolve({ ok: true }); await settle(); assert.equal(page.scripts.length, 1);
  const refused = browser({ cookie: "v2.granted", fetchImpl: async (url) => url === policyURL
    ? { ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: true }) } : { ok: false } });
  refused.run(); await settle(); refused.click("[data-ads-allow]"); await settle(); assert.equal(refused.scripts.length, 0);
});

test("an observed account refusal survives anonymous policies and network errors until a fresh Allow readback", async () => {
  let policyState = "refused";
  const page = browser({ cookie: "v2.granted", fetchImpl: async (url) => {
    if (url !== policyURL) return { ok: true };
    if (policyState === "offline") throw new Error("offline");
    return { ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: policyState === "refused" }) };
  } });
  page.run(); await settle();
  for (const state of ["anonymous", "offline", "anonymous"]) {
    policyState = state; page.focus(); await settle();
    assert.equal(page.scripts.length, 0);
    assert.equal(page.elements.get("[data-ads-status]").textContent, "Off");
  }
  assert.equal(page.posts().length, 0);
  page.click("[data-ads-allow]"); await settle();
  assert.equal(page.scripts.length, 1);
  assert.ok(page.posts().some((post) => post.explicit_action === true));
});

test("a fresh Allow readback cannot clear an observed refusal after a newer Turn off", async () => {
  const readback = deferred(); let policyCalls = 0, postCalls = 0;
  const page = browser({ cookie: "v2.granted", fetchImpl: (url) => {
    if (url === policyURL) return ++policyCalls === 1
      ? Promise.resolve({ ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: true }) })
      : readback.promise;
    return Promise.resolve({ ok: ++postCalls < 3 });
  } });
  page.run(); await settle(); page.click("[data-ads-allow]"); await settle();
  assert.equal(policyCalls, 2);
  page.click("[data-ads-decline]"); await settle();
  readback.resolve({ ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: false }) });
  await settle(); assert.equal(page.scripts.length, 0);
  page.click("[data-ads-allow]"); await settle();
  assert.equal(postCalls, 3);
  assert.equal(page.scripts.length, 0);
  assert.equal(page.elements.get("[data-ads-status]").textContent, "Off");
});

test("a refusal during an outstanding policy request cannot be reopened by its late reply", async () => {
  const gate = deferred();
  const page = browser({ fetchImpl: (url) => url === policyURL ? gate.promise : Promise.resolve({ ok: true }) });
  page.run(); page.click("[data-ads-decline]");
  gate.resolve({ ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: false }) });
  await settle();
  assert.equal(page.scripts.length, 0); assert.equal(page.cookies.get("vifi_ads_consent"), "v2.denied");
  assert.ok(page.posts().every((post) => post.decision === "denied"));
});

test("browser flag stays independent and opaque attribution never enters event or preference payloads", async () => {
  for (const browserEnabled of [false, undefined]) {
    const page = browser({ browserEnabled, location: { hostname: "vifi.us", pathname: "/pricing/", search: "?oppref=opaque%2Bunchanged==" } });
    page.run(); await settle();
    assert.equal(page.cookies.get("vifi_ads_oppref"), "opaque%2Bunchanged==");
    assert.equal(page.scripts.length, 0); assert.deepEqual(page.commands(), []);
    assert.equal(JSON.stringify(page.fetches).includes("opaque"), false);
    page.click("[data-ads-decline]"); await settle();
    assert.equal(page.cookies.has("vifi_ads_oppref"), false); assert.equal(page.cookies.get("vifi_ads_consent"), "v2.denied");
  }
});

test("GPC cannot be overridden and a failed consent write stays off", async () => {
  for (const overrides of [{ navigator: { globalPrivacyControl: true } }, { cookieFailure: true }]) {
    const page = browser({ ...overrides, policy: { version: 2, default_allowed: false, account_opt_out: false } });
    page.run(); await settle(); page.click("[data-ads-allow]"); await settle();
    assert.equal(page.scripts.length, 0); assert.ok(page.posts().every((post) => post.decision === "denied"));
  }
});

test("unsafe URL state never loads Pixel; only individual blog articles send contents_viewed", async () => {
  for (const location of [{ hostname: "vifi.us", pathname: "/pricing/", search: "?email=private" }, { hostname: "vifi.us", pathname: "/pricing/", hash: "#private" }]) {
    const page = browser({ location }); page.run(); await settle(); assert.equal(page.scripts.length, 0);
  }
  for (const pathname of ["/blog/", "/blog/welcome/", "/blog/welcome", "/pricing/"]) {
    const page = browser({ location: { hostname: "www.vifi.us", pathname } }); page.run(); await settle();
    const views = page.commands().filter((cmd) => cmd[1] === "contents_viewed");
    assert.equal(views.length, pathname.includes("welcome") ? 1 : 0); assert.ok(views.every((cmd) => cmd[3].opt_out === true));
  }
});

test("policy refresh observes account refusal and never repeats page views", async () => {
  let optedOut = false;
  const page = browser({ fetchImpl: async (url) => url === policyURL
    ? { ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: optedOut }) } : { ok: true } });
  page.run(); await settle(); optedOut = true; page.focus(); await settle();
  assert.deepEqual(page.commands().at(-1), ["consent", false]);
  assert.equal(page.elements.get("[data-ads-status]").textContent, "Off");
  assert.equal(page.commands().filter((cmd) => cmd[0] === "measure").length, 1);
});

test("SDK and DOM failures stay outside the page's critical path", async () => {
  const page = browser({ window: { oaiq: () => { throw new Error("blocked"); }, addEventListener() {} } });
  assert.doesNotThrow(page.run); await settle(); page.click("[data-ads-decline]"); await settle();
  assert.equal(page.posts().at(-1).decision, "denied"); assert.doesNotThrow(browser({ document: {} }).run);
});

test("ordinary pages need no preference component to measure or enforce account denial", async () => {
  let optedOut = false;
  const page = browser({ fetchImpl: async (url) => url === policyURL
    ? { ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: optedOut }) } : { ok: true } });
  page.context.document.getElementById = () => null;
  page.run(); await settle(); assert.equal(page.scripts.length, 1);
  page.cookies.set("vifi_ads_oppref", "clear-on-denial");
  optedOut = true; page.focus(); await settle();
  assert.equal(page.cookies.has("vifi_ads_oppref"), false);
  assert.deepEqual(page.commands().at(-1), ["consent", false]);
});

test("the preference UI exists only inline on the Privacy page", () => {
  const layout = readFileSync(new URL("../src/layouts/BaseLayout.astro", import.meta.url), "utf8");
  const legal = readFileSync(new URL("../src/pages/legal/[...slug].astro", import.meta.url), "utf8");
  const preferences = readFileSync(new URL("../src/components/site/AdsPreferences.astro", import.meta.url), "utf8");
  assert.doesNotMatch(layout, /AdsPreferences/);
  assert.match(legal, /page\.id === "privacy" && <AdsPreferences/);
  assert.match(preferences, /<section[^>]*aria-labelledby="ad-measurement"/);
  assert.doesNotMatch(preferences, /position:\s*(fixed|absolute)|<details|<dialog/);
});

test("a later refusal is sent after an already-started Allow and never gains explicit_action", async () => {
  const gate = deferred(); let postCount = 0;
  const page = browser({ fetchImpl: async (url) => {
    if (url === policyURL) return { ok: true, json: async () => ({ version: 2, default_allowed: false, account_opt_out: false }) };
    return ++postCount === 1 ? gate.promise : { ok: true };
  } });
  page.run(); await settle(); page.click("[data-ads-allow]"); await settle();
  page.click("[data-ads-decline]"); await settle(); assert.equal(postCount, 1);
  gate.resolve({ ok: true }); await settle();
  assert.deepEqual(page.posts().map((post) => post.decision), ["granted", "denied"]);
  assert.equal(page.posts().at(-1).explicit_action, undefined);
  assert.equal(page.cookies.get("vifi_ads_consent"), "v2.denied");
});

test("a stale policy response cannot supersede a newer account denial", async () => {
  const first = deferred(), second = deferred(); let calls = 0;
  const page = browser({ fetchImpl: (url) => url === policyURL
    ? (++calls === 1 ? first.promise : second.promise) : Promise.resolve({ ok: true }) });
  page.run(); page.focus();
  second.resolve({ ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: true }) });
  await settle();
  first.resolve({ ok: true, json: async () => ({ version: 2, default_allowed: true, account_opt_out: false }) });
  await settle(); assert.equal(page.scripts.length, 0); assert.equal(page.posts().length, 0);
});

test("cookie storage failure never restores the US default after a new refusal", async () => {
  const page = browser({ cookieFailure: true }); page.run(); await settle();
  assert.equal(page.scripts.length, 1);
  page.click("[data-ads-decline]"); await settle(); page.focus(); await settle();
  assert.equal(page.elements.get("[data-ads-status]").textContent, "Off");
  assert.deepEqual(page.commands().at(-1), ["consent", false]);
  assert.equal(page.posts().at(-1).decision, "denied");
});
