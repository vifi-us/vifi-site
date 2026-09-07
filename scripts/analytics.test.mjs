import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const source = readFileSync('src/components/site/Analytics.astro', 'utf8')
  .match(/<script is:inline>([\s\S]*?)<\/script>/)[1];

function analytics(hostname = 'vifi.us', globalPrivacyControl = false) {
  const scripts = [];
  const listeners = {};
  class Element {
    constructor(href) { this.href = href; this.textContent = 'Start free'; }
    closest() { return this; }
    getAttribute(name) { return name === 'href' ? this.href : null; }
  }
  const context = {
    location: { hostname, href: `https://${hostname}/pricing/`, pathname: '/pricing/' },
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

test('only exact app authentication destinations count as conversions', () => {
  const { context, listeners, Element } = analytics();
  for (const href of [
    'https://app.vifi.us/register-help', 'https://app.vifi.us/settings',
    'https://app.vifi.us.evil.example/register', '/pricing/',
  ]) listeners.click({ type: 'click', target: new Element(href) });
  assert.equal(context.posthog.length, 0);
  listeners.click({ type: 'click', target: new Element('https://app.vifi.us/register?source=site') });
  listeners.auxclick({ type: 'auxclick', button: 1, target: new Element('https://app.vifi.us/login/') });
  listeners.auxclick({ type: 'auxclick', button: 2, target: new Element('https://app.vifi.us/register') });
  assert.deepEqual(Array.from(context.posthog, event => event[1]), ['marketing_cta_clicked', 'marketing_login_clicked']);
});
