import { readdirSync, readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { join } from 'node:path';

// ViFi's own website widget (src/components/site/VoiceWidget.astro) must be
// on every built page, loaded async from app.vifi.us, inside <body>, once,
// and withheld from visitors who send Global Privacy Control (the privacy
// policy promises them no analytics; the widget iframe runs the app's).
const LOADER = 'https://app.vifi.us/embed/widget.js?key=emb_8486e83bc6f600c11db1f1bcca057cfa';
const component = readFileSync('src/components/site/VoiceWidget.astro', 'utf8');
const inline = component.match(/<script is:inline[^>]*>([\s\S]*?)<\/script>/)[1];
const pages = readdirSync('dist', { recursive: true })
  .filter(path => path.endsWith('index.html'))
  .map(path => join('dist', path));

function widget(globalPrivacyControl) {
  const appended = [];
  const context = {
    navigator: { globalPrivacyControl },
    document: {
      currentScript: { getAttribute: name => (name === 'data-src' ? LOADER : null) },
      createElement: () => ({}),
      head: { appendChild: element => appended.push(element) },
    },
  };
  context.window = context;
  runInNewContext(inline, context);
  return appended;
}

test('the voice widget guard is on every page, inside <body>, exactly once', () => {
  assert.ok(pages.length > 10, 'the static build has the full page set');
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const tags = html.match(/<script data-vifi-widget[^>]*>/g) || [];
    assert.equal(tags.length, 1, page);
    assert.ok(tags[0].includes(`data-src="${LOADER}"`), page);
    const bodyStart = html.indexOf('<body');
    assert.ok(bodyStart !== -1 && html.indexOf(tags[0]) > bodyStart, page);
    assert.equal(html.indexOf('emb_'), html.lastIndexOf('emb_'), `${page}: the key appears once`);
    assert.doesNotMatch(html, /<script[^>]*\ssrc="https:\/\/app\.vifi\.us\/embed/, `${page}: the loader is injected, never static`);
  }
});

test('the loader is injected async for ordinary visitors and withheld under Global Privacy Control', () => {
  const [loader, ...rest] = widget(false);
  assert.equal(rest.length, 0);
  assert.equal(loader.src, LOADER);
  assert.equal(loader.async, true);
  assert.deepEqual(widget(true), []);
});

test('the widget component stays a plain external loader with a public key', () => {
  assert.match(component, /https:\/\/app\.vifi\.us\/embed\/widget\.js/);
  assert.match(component, /navigator\.globalPrivacyControl/);
  assert.doesNotMatch(component, /document\.write|client:load/);
});
