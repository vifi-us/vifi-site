import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const guide = readFileSync('dist/blog/ai-receptionist-home-services-buyers-guide/index.html', 'utf8');
const contentStart = guide.indexOf('<article');
const firstSection = guide.indexOf('<h2', contentStart);
const earlyContent = guide.slice(contentStart, firstSection);

test('buyer guide offers a relevant commercial path before the long evaluation checklist', () => {
  assert.ok(contentStart >= 0);
  assert.ok(firstSection > contentStart);
  assert.match(earlyContent, /href="\/solutions\/home-services\/"/);
  assert.match(earlyContent, /AI receptionist workflow for home services/);
  assert.match(earlyContent, /href="\/blog\/test-ai-receptionist-home-services\/"/);
  assert.match(earlyContent, /Keep your normal phone routing in place/);
});

test('early buyer-guide signup has a unique placement and version without fabricated acquisition tags', () => {
  const cta = earlyContent.match(/<a\b[^>]*data-cta="blog-home-services-guide-start"[^>]*>/)?.[0];
  assert.ok(cta);
  assert.match(cta, /href="https:\/\/app\.vifi\.us\/register"/);
  assert.match(cta, /data-cta-version="evaluation-guide-2026-09-v2"/);
  assert.match(cta, /data-cta-intent="evaluation"/);
  assert.doesNotMatch(cta, /utm_/);
  assert.equal((guide.match(/data-cta="blog-home-services-guide-start"/g) ?? []).length, 1);
  assert.match(guide, /data-cta="blog-home-services-guide"/);
});

test('buyer guide keeps its recently deployed search intent and self-canonical URL', () => {
  assert.match(guide, /<title>How to Evaluate an AI Receptionist for Home Services \| ViFi Blog<\/title>/);
  assert.match(guide, /rel="canonical"[^>]+vifi\.us\/blog\/ai-receptionist-home-services-buyers-guide/);
  assert.match(guide, /"dateModified":"2026-09-10T00:00:00\.000Z"/);
});
