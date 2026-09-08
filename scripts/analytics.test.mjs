import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const source = readFileSync('src/components/site/Analytics.astro', 'utf8')
  .match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

function analytics(hostname = 'vifi.us', globalPrivacyControl = false, pageHref) {
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
  const context = {
    location: {
      hostname,
      href: pageHref ?? `https://${hostname}/pricing/`,
      pathname: new URL(pageHref ?? `https://${hostname}/pricing/`).pathname,
    },
    navigator: { globalPrivacyControl }, URL, Element,
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
  const anchor = new Element('https://app.vifi.us/register?utm_medium=existing');
  listeners.click({ type: 'click', target: anchor });

  const destination = new URL(anchor.href);
  assert.equal(destination.searchParams.get('utm_medium'), 'existing');
  assert.equal(destination.searchParams.get('fbclid'), 'valid-click-id');
  for (const key of ['utm_source', 'utm_campaign', 'utm_term', 'email', 'phone', 'gclid']) {
    assert.equal(destination.searchParams.has(key), false, key);
  }
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
