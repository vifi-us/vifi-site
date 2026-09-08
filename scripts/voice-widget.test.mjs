import { readdirSync, readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { join } from 'node:path';

// ViFi's own website widget (src/components/site/VoiceWidget.astro) must be
// on every built page, loaded async from app.vifi.us, inside <body>, once,
// for every visitor: Global Privacy Control is honoured inside the widget by
// the app itself (vifi-platform #847), so the site adds no guard of its own.
const LOADER = 'https://app.vifi.us/embed/widget.js?key=emb_8486e83bc6f600c11db1f1bcca057cfa';
const pages = readdirSync('dist', { recursive: true })
  .filter(path => path.endsWith('index.html'))
  .map(path => join('dist', path));

test('the voice widget loader is on every page, async, inside <body>, exactly once', () => {
  assert.ok(pages.length > 10, 'the static build has the full page set');
  for (const page of pages) {
    const html = readFileSync(page, 'utf8');
    const tags = html.match(/<script[^>]*\ssrc="https:\/\/app\.vifi\.us\/embed\/widget\.js[^"]*"[^>]*><\/script>/g) || [];
    assert.equal(tags.length, 1, page);
    assert.ok(tags[0].includes(`src="${LOADER}"`), page);
    assert.match(tags[0], /\basync\b/, page);
    assert.doesNotMatch(tags[0], /\bdefer\b|type="module"/, page);
    const bodyStart = html.indexOf('<body');
    assert.ok(bodyStart !== -1 && html.indexOf(tags[0]) > bodyStart, page);
    assert.equal(html.indexOf('emb_'), html.lastIndexOf('emb_'), `${page}: the key appears once`);
  }
});

test('the widget component is a plain external loader with no visitor gating', () => {
  const source = readFileSync('src/components/site/VoiceWidget.astro', 'utf8');
  assert.match(source, /is:inline async src=\{loaderSrc\}/);
  assert.match(source, /https:\/\/app\.vifi\.us\/embed\/widget\.js/);
  assert.doesNotMatch(source, /globalPrivacyControl\)|document\.write|client:load/);
});

test('the marketing site never shows the app support bubble next to the widget', () => {
  const analytics = readFileSync('src/components/site/Analytics.astro', 'utf8');
  assert.match(analytics, /disable_conversations: true/);
});
