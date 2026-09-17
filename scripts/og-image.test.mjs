import { readFileSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolve } from 'node:path';
import { collectInputs, hashInputs, heroParts, outDir, pngInfo, readManifest, root, HEIGHT, WIDTH } from './build-og-image.mjs';

const manifest = readManifest();

test('the share image was rendered from the current homepage hero', () => {
  assert.equal(
    manifest.sourceHash,
    hashInputs(collectInputs()),
    'the hero (or the card renderer) changed after the share image was last rendered: run `npm run build` then `npm run build:og` and commit public/og and src/data/og-image.json',
  );
  assert.equal(manifest.alt, heroParts(collectInputs().hero).alt);
});

test('the share image file matches its manifest and is the only card shipped', () => {
  assert.match(manifest.src, /^\/og\/vifi-hero-[0-9a-f]{10}\.png$/);
  assert.equal(manifest.src, `/og/vifi-hero-${manifest.sourceHash}.png`);
  const info = pngInfo(readFileSync(resolve(root, `public${manifest.src}`)));
  assert.deepEqual([info.width, info.height], [WIDTH, HEIGHT]);
  assert.deepEqual([manifest.width, manifest.height, manifest.type], [WIDTH, HEIGHT, 'image/png']);
  assert.deepEqual(readdirSync(outDir).filter((f) => f.endsWith('.png')), [manifest.src.slice('/og/'.length)]);
});

test('every built page shares the current card with its dimensions and alt text', () => {
  const image = `https://vifi.us${manifest.src}`;
  for (const path of ['', 'pricing', 'features', 'blog/test-ai-receptionist-home-services']) {
    const page = readFileSync(resolve(root, 'dist', path, 'index.html'), 'utf8');
    assert.ok(page.includes(`<meta property="og:image" content="${image}">`), path);
    assert.ok(page.includes(`<meta name="twitter:image" content="${image}">`), path);
    assert.ok(page.includes(`<meta property="og:image:width" content="${WIDTH}">`), path);
    assert.ok(page.includes(`<meta property="og:image:height" content="${HEIGHT}">`), path);
    assert.ok(page.includes(`<meta property="og:image:alt" content="${manifest.alt}">`), path);
    assert.doesNotMatch(page, /og-default\.png|og-vifi-answer-every-call/);
  }
});
