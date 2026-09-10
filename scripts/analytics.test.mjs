import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const source = readFileSync('src/components/site/Analytics.astro', 'utf8')
  .match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

const touchKey = 'vifi_marketing_touch_v1';
const touchLifetime = 30 * 60 * 1000;
const now = Date.parse('2026-09-10T14:00:00Z');

function tabStorage() {
  const data = new Map();
  const calls = [];
  return {
    data, calls,
    getItem(key) { calls.push(['get', key]); return data.get(key) ?? null; },
    setItem(key, value) { calls.push(['set', key]); data.set(key, String(value)); },
    removeItem(key) { calls.push(['remove', key]); data.delete(key); },
  };
}

function analytics(hostname = 'vifi.us', globalPrivacyControl = false, pageHref, options = {}) {
  const scripts = [];
  const listeners = {};
  class Element {
    constructor(href, attributes = {}) {
      this.href = href;
      this.attributes = attributes;
      this.textContent = 'Start free';
    }
    closest() { return this; }
    getAttribute(name) {
      return name === 'href' ? this.href : (this.attributes[name] ?? null);
    }
  }
  const clock = options.clock ?? { now };
  class TestDate extends Date {
    constructor(...args) { super(...(args.length ? args : [clock.now])); }
    static now() { return clock.now; }
  }
  const context = {
    location: {
      hostname,
      href: pageHref ?? `https://${hostname}/pricing/`,
      pathname: new URL(pageHref ?? `https://${hostname}/pricing/`).pathname,
    },
    navigator: { globalPrivacyControl }, URL, Element, Date: TestDate,
    sessionStorage: options.storage ?? tabStorage(),
    document: {
      createElement: () => ({}),
      head: { appendChild: value => scripts.push(value) },
      getElementsByTagName: () => [{ parentNode: { insertBefore: value => scripts.push(value) } }],
      addEventListener: (name, listener) => { listeners[name] = listener; },
    },
  };
  context.window = context;
  runInNewContext(source, context);
  return { context, scripts, listeners, Element };
}

test('privacy and preview guards prevent loading either analytics provider', () => {
  for (const [host, gpc] of [['localhost', false], ['test-site.vifi.us', false], ['vifi.us', true]]) {
    const { scripts, listeners, context } = analytics(host, gpc);
    assert.equal(scripts.length, 0);
    assert.equal(Object.keys(listeners).length, 0);
    assert.equal(context.posthog, undefined);
    assert.equal(context.gtag, undefined);
  }
});

test('approved campaign values cross the website-to-app boundary', () => {
  const page = 'https://vifi.us/solutions/home-services/?utm_source=linkedin&utm_medium=social&utm_campaign=home_services_category_2026_09_v1&utm_content=company_page&li_fat_id=abc-123';
  const { context, listeners, Element } = analytics('vifi.us', false, page);
  const anchor = new Element('https://app.vifi.us/register?plan=starter#signup');
  listeners.click({ type: 'click', target: anchor });

  const destination = new URL(anchor.href);
  assert.equal(destination.searchParams.get('plan'), 'starter');
  assert.equal(destination.searchParams.get('utm_source'), 'linkedin');
  assert.equal(destination.searchParams.get('utm_medium'), 'social');
  assert.equal(destination.searchParams.get('utm_campaign'), 'home_services_category_2026_09_v1');
  assert.equal(destination.searchParams.get('utm_content'), 'company_page');
  assert.equal(destination.searchParams.get('li_fat_id'), 'abc-123');
  assert.equal(destination.hash, '#signup');
  assert.equal(context.posthog[0][2].destination, destination.href);
});

test('CTA decoration rejects arbitrary, duplicate, PII-like and oversized values', () => {
  const oversized = 'x'.repeat(129);
  const page = `https://vifi.us/pricing/?utm_source=trusted&utm_source=duplicate&utm_campaign=${oversized}&utm_term=jason%40example.com&email=jason%40example.com&phone=2025550147&fbclid=valid-click-id&gclid=2025550147`;
  const { listeners, Element } = analytics('vifi.us', false, page);
  const anchor = new Element('https://app.vifi.us/register?plan=starter');
  listeners.click({ type: 'click', target: anchor });

  const destination = new URL(anchor.href);
  assert.equal(destination.searchParams.get('plan'), 'starter');
  assert.equal(destination.searchParams.get('fbclid'), 'valid-click-id');
  for (const key of ['utm_source', 'utm_campaign', 'utm_term', 'email', 'phone', 'gclid']) {
    assert.equal(destination.searchParams.has(key), false, key);
  }
});

test('campaign survives guide to category navigation without labeling internal clicks as conversions', () => {
  const storage = tabStorage();
  const landing = analytics('vifi.us', false,
    'https://vifi.us/blog/test-ai-receptionist-home-services/?utm_source=linkedin&utm_medium=social&utm_campaign=call_scorecard_2026_09_v1&li_fat_id=click-abc&email=visitor%40example.com',
    { storage });
  const internal = new landing.Element('/solutions/home-services/');
  landing.listeners.click({ type: 'click', target: internal });
  assert.equal(internal.href, '/solutions/home-services/');
  assert.equal(landing.context.posthog.length, 0);

  const category = analytics('vifi.us', false, 'https://vifi.us/solutions/home-services/', { storage });
  const signup = new category.Element('https://app.vifi.us/register?plan=starter#start');
  category.listeners.click({ type: 'click', target: signup });
  const destination = new URL(signup.href);
  assert.equal(destination.searchParams.get('utm_source'), 'linkedin');
  assert.equal(destination.searchParams.get('utm_campaign'), 'call_scorecard_2026_09_v1');
  assert.equal(destination.searchParams.get('li_fat_id'), 'click-abc');
  assert.equal(destination.searchParams.get('plan'), 'starter');
  assert.equal(destination.hash, '#start');
  const saved = JSON.parse(storage.data.get(touchKey));
  assert.deepEqual(Object.keys(saved).sort(), ['observedAt', 'values', 'version']);
  assert.deepEqual(Object.keys(saved.values).sort(), ['li_fat_id', 'utm_campaign', 'utm_medium', 'utm_source']);
  assert.doesNotMatch(storage.data.get(touchKey), /visitor|example|https:|\/blog\//);
});

test('a new campaign replaces the complete prior bundle rather than mixing sources and click IDs', () => {
  const storage = tabStorage();
  analytics('vifi.us', false, 'https://vifi.us/?utm_source=linkedin&utm_medium=social&li_fat_id=old-click', { storage });
  analytics('vifi.us', false, 'https://vifi.us/?utm_source=google&utm_campaign=new-search', { storage });
  const page = analytics('vifi.us', false, 'https://vifi.us/pricing/', { storage });
  const signup = new page.Element('https://app.vifi.us/register');
  page.listeners.click({ type: 'click', target: signup });
  assert.deepEqual(Object.fromEntries(new URL(signup.href).searchParams), {
    utm_source: 'google', utm_campaign: 'new-search',
  });
});

test('explicit destination attribution is never combined with current or saved campaign values', () => {
  for (const pageHref of ['https://vifi.us/?utm_source=linkedin&utm_campaign=source', 'https://vifi.us/pricing/']) {
    const storage = tabStorage();
    analytics('vifi.us', false, 'https://vifi.us/?utm_source=facebook&fbclid=saved-click', { storage });
    const page = analytics('vifi.us', false, pageHref, { storage });
    for (const destination of [
      'https://app.vifi.us/register?utm_medium=explicit',
      'https://app.vifi.us/register?gclid=explicit-click&plan=starter#trial',
      'https://app.vifi.us/register?utm_source=&utm_source=duplicate',
    ]) {
      const signup = new page.Element(destination);
      page.listeners.click({ type: 'click', target: signup });
      assert.equal(signup.href, destination);
    }
  }
});

test('campaign lifetime is fixed across clean navigation and reloads of the same tagged page', () => {
  const storage = tabStorage();
  const clock = { now };
  const tagged = 'https://vifi.us/?utm_source=linkedin&utm_campaign=scorecard';
  analytics('vifi.us', false, tagged, { storage, clock });
  clock.now += 10 * 60 * 1000;
  analytics('vifi.us', false, tagged, { storage, clock });
  clock.now += 10 * 60 * 1000;
  const page = analytics('vifi.us', false, 'https://vifi.us/pricing/', { storage, clock });
  assert.equal(JSON.parse(storage.data.get(touchKey)).observedAt, now);
  clock.now = now + touchLifetime;
  const signup = new page.Element('https://app.vifi.us/register');
  page.listeners.click({ type: 'click', target: signup });
  assert.equal(signup.href, 'https://app.vifi.us/register');
  assert.equal(storage.data.has(touchKey), false);
});

test('expired, future, corrupt, unbounded and unsanitized records are discarded', () => {
  const valid = { version: 1, observedAt: now, values: { utm_source: 'linkedin' } };
  const records = [
    '{broken', 'null', '[]', 'x'.repeat(8193),
    JSON.stringify({ ...valid, observedAt: now + 1 }),
    JSON.stringify({ ...valid, observedAt: now - touchLifetime }),
    JSON.stringify({ ...valid, observedAt: String(now) }),
    JSON.stringify({ ...valid, version: 2 }),
    JSON.stringify({ ...valid, rawUrl: 'https://vifi.us/?email=visitor@example.com' }),
    JSON.stringify({ ...valid, values: {} }),
    JSON.stringify({ ...valid, values: [] }),
    JSON.stringify({ ...valid, values: { utm_source: 42 } }),
    JSON.stringify({ ...valid, values: { utm_source: 'visitor@example.com' } }),
    JSON.stringify({ ...valid, values: { email: 'visitor@example.com' } }),
  ];
  for (const raw of records) {
    const storage = tabStorage();
    storage.data.set(touchKey, raw);
    const page = analytics('vifi.us', false, 'https://vifi.us/pricing/', { storage });
    const signup = new page.Element('https://app.vifi.us/register');
    page.listeners.click({ type: 'click', target: signup });
    assert.equal(signup.href, 'https://app.vifi.us/register', raw);
    assert.equal(storage.data.has(touchKey), false, raw);
  }
});

test('reusing a middle-clicked link does not carry an expired decoration forward', () => {
  const storage = tabStorage();
  const clock = { now };
  analytics('vifi.us', false, 'https://vifi.us/?utm_source=linkedin', { storage, clock });
  const page = analytics('vifi.us', false, 'https://vifi.us/pricing/', { storage, clock });
  const signup = new page.Element('https://app.vifi.us/register');
  page.listeners.auxclick({ type: 'auxclick', button: 1, target: signup });
  assert.equal(new URL(signup.href).searchParams.get('utm_source'), 'linkedin');
  clock.now += touchLifetime;
  page.listeners.click({ type: 'click', target: signup });
  assert.equal(signup.href, 'https://app.vifi.us/register');
});

test('invalid fresh campaign parameters do not fall back to an unrelated saved touch', () => {
  for (const query of ['utm_source=visitor%40example.com', 'utm_source=a&utm_source=b', 'utm_campaign=']) {
    const storage = tabStorage();
    analytics('vifi.us', false, 'https://vifi.us/?utm_source=old', { storage });
    const page = analytics('vifi.us', false, `https://vifi.us/pricing/?${query}`, { storage });
    const signup = new page.Element('https://app.vifi.us/register');
    page.listeners.click({ type: 'click', target: signup });
    assert.equal(signup.href, 'https://app.vifi.us/register');
    assert.equal(storage.data.has(touchKey), false);
  }
});

test('storage failures leave app navigation and direct current-URL attribution working', () => {
  const denied = () => { throw new Error('Storage blocked'); };
  const storage = { getItem: denied, setItem: denied, removeItem: denied };
  for (const query of ['', '?utm_source=linkedin&utm_campaign=scorecard']) {
    const page = analytics('vifi.us', false, `https://vifi.us/pricing/${query}`, { storage });
    const signup = new page.Element('https://app.vifi.us/register');
    assert.doesNotThrow(() => page.listeners.click({ type: 'click', target: signup }));
    assert.equal(new URL(signup.href).searchParams.get('utm_source'), query ? 'linkedin' : null);
    assert.equal(page.context.posthog[0][1], 'marketing_cta_clicked');
  }
});

test('GPC clears only the owned storage key without reading attribution or starting analytics', () => {
  const storage = tabStorage();
  storage.data.set(touchKey, 'existing-record');
  storage.data.set('unrelated', 'keep');
  const page = analytics('vifi.us', true, 'https://vifi.us/?utm_source=linkedin', { storage });
  assert.deepEqual(storage.calls, [['remove', touchKey]]);
  assert.equal(storage.data.has(touchKey), false);
  assert.equal(storage.data.get('unrelated'), 'keep');
  assert.equal(page.scripts.length, 0);
  assert.equal(page.context.posthog, undefined);
  assert.equal(Object.keys(page.listeners).length, 0);
});

test('preview hosts do not access attribution storage', () => {
  const storage = tabStorage();
  analytics('localhost', false, 'https://localhost/?utm_source=linkedin', { storage });
  analytics('test-site.vifi.us', true, 'https://test-site.vifi.us/?utm_source=linkedin', { storage });
  assert.deepEqual(storage.calls, []);
});

test('a privacy change stops curated tracking and removes our prior link decoration', () => {
  const storage = tabStorage();
  const page = analytics('vifi.us', false, 'https://vifi.us/?utm_source=linkedin', { storage });
  const signup = new page.Element('https://app.vifi.us/register');
  page.listeners.auxclick({ type: 'auxclick', button: 1, target: signup });
  assert.equal(page.context.posthog.length, 1);
  page.context.navigator.globalPrivacyControl = true;
  storage.calls.length = 0;
  page.listeners.click({ type: 'click', target: signup });
  assert.equal(page.context.posthog.length, 1);
  assert.deepEqual(storage.calls, [['remove', touchKey]]);
  assert.equal(signup.href, 'https://app.vifi.us/register');
});

test('only exact app authentication destinations count as conversions', () => {
  const { context, listeners, Element } = analytics();
  for (const href of [
    'https://app.vifi.us/register-help', 'https://app.vifi.us/settings',
    'https://app.vifi.us.evil.example/register', '/pricing/',
  ]) listeners.click({ type: 'click', target: new Element(href) });
  assert.equal(context.posthog.length, 0);
  listeners.click({
    type: 'click',
    target: new Element('https://app.vifi.us/register?source=site', {
      'data-cta': 'alternatives-banner',
      'data-cta-version': 'comparison-intent-2026-09-v1',
      'data-cta-intent': 'comparison',
    }),
  });
  listeners.auxclick({ type: 'auxclick', button: 1, target: new Element('https://app.vifi.us/login/') });
  listeners.auxclick({ type: 'auxclick', button: 2, target: new Element('https://app.vifi.us/register') });
  assert.deepEqual(Array.from(context.posthog, event => event[1]), ['marketing_cta_clicked', 'marketing_login_clicked']);
  assert.deepEqual(
    JSON.parse(JSON.stringify(context.posthog[0][2])),
    {
      placement: 'alternatives-banner',
      cta_version: 'comparison-intent-2026-09-v1',
      cta_intent: 'comparison',
      cta_text: 'Start free',
      destination: 'https://app.vifi.us/register?source=site',
      page: '/pricing/',
    },
  );
});
