import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolve } from 'node:path';

const html = path => readFileSync(resolve('dist', path, 'index.html'), 'utf8');
const guidePath = 'blog/test-ai-receptionist-home-services';

test('homepage headline and trial CTA never wait for a scroll reveal', () => {
  const home = html('');
  const hero = home.match(/<section[^>]*id="top"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(hero);
  assert.doesNotMatch(hero, /data-reveal/);
  assert.match(hero, /data-cta="home-hero"/);
});

test('trial guide has seven scripts, discoverability and versioned signup links', () => {
  const guide = html(guidePath);
  assert.equal((guide.match(/<h2[^>]*>[1-7]\. /g) || []).length, 7);
  assert.match(guide, /name="description"/);
  assert.match(guide, /rel="canonical"[^>]+vifi\.us\/blog\/test-ai-receptionist-home-services/);
  assert.match(guide, /"@type":"BlogPosting"/);
  for (const placement of ['blog-test-calls-start', 'blog-test-calls-finish']) {
    assert.match(guide, new RegExp(`href="https://app.vifi.us/register" data-cta="${placement}" data-cta-version="test-calls-2026-09-v1"`));
  }
  assert.match(readFileSync('dist/sitemap-0.xml', 'utf8'), /test-ai-receptionist-home-services/);
});

test('trial guide is reachable from buyer and commercial pages', () => {
  for (const path of ['', 'blog', 'blog/ai-receptionist-home-services-buyers-guide', 'solutions/home-services', 'solutions/hvac', 'solutions/plumbing', 'solutions/electricians']) {
    assert.ok(html(path).includes(`href="/${guidePath}/"`), path);
  }
});

test('each home-service landing page has a versioned hero signup CTA', () => {
  for (const slug of ['home-services', 'hvac', 'plumbing', 'electricians']) {
    const page = html(`solutions/${slug}`);
    assert.match(page, new RegExp(`data-cta="solution-${slug}-hero"`));
    assert.match(page, /data-cta-version="trade-trial-2026-09-v1"/);
    assert.ok(page.indexOf(`data-cta="solution-${slug}-hero"`) < page.indexOf('class="ind-fig"'));
  }
});

test('guide internal links and fragment targets exist in the static build', () => {
  for (const [, href] of html(guidePath).matchAll(/href="(\/[^"?]*)"/g)) {
    const [path, fragment] = href.split('#');
    if (/\.[a-z\d]+$/i.test(path)) {
      assert.ok(existsSync(resolve('dist', path.slice(1))), href);
      continue;
    }
    const target = html(path.replace(/^\//, ''));
    if (fragment) assert.ok(target.includes(`id="${fragment}"`), href);
  }
});

test('production guard, privacy and cross-subdomain attribution remain intact', () => {
  const analytics = readFileSync('src/components/site/Analytics.astro', 'utf8');
  assert.match(analytics, /!navigator\.globalPrivacyControl/);
  assert.match(analytics, /cross_subdomain_cookie: true/);
  assert.match(analytics, /maskAllInputs: true/);
  assert.match(analytics, /marketing_cta_clicked/);
  assert.match(analytics, /marketing_login_clicked/);
  assert.equal(readFileSync('public/CNAME', 'utf8').trim(), 'vifi.us');
});
