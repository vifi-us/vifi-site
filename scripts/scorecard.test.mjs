import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const path = 'resources/ai-receptionist-test-scorecard';
const html = readFileSync(`dist/${path}/index.html`, 'utf8');

test('scorecard is ungated, printable and has all seven review scenarios', () => {
  assert.match(html, /No email or account is required/);
  assert.equal((html.match(/class="scorecard-row"/g) || []).length, 7);
  assert.match(html, /data-print-scorecard/);
  assert.match(html, /Stop|stop conditions/);
  assert.doesNotMatch(html, /<form|<input|<textarea/);
  assert.match(html, /name="description"/);
  assert.match(html, /rel="canonical"[^>]+vifi\.us\/resources\/ai-receptionist-test-scorecard/);
  assert.match(html, /data-cta="scorecard-start-trial"/);
  assert.match(html, /data-cta-version="test-scorecard-2026-09-v1"/);
  assert.match(readFileSync('dist/sitemap-0.xml', 'utf8'), new RegExp(path));
});

test('editable worksheet has seven rows and no populated customer data', () => {
  const rows = readFileSync(`dist/${path}.csv`, 'utf8').trim().split('\n');
  assert.equal(rows.length, 8);
  for (const row of rows) assert.equal(row.split(',').length, 7);
  assert.match(html, new RegExp(`href="/${path}\.csv" download`));
});

test('existing high-intent pages link to the worksheet', () => {
  for (const page of ['blog/test-ai-receptionist-home-services', 'solutions/home-services', 'solutions/hvac', 'solutions/plumbing', 'solutions/electricians']) {
    assert.ok(readFileSync(`dist/${page}/index.html`, 'utf8').includes(`href="/${path}/"`), page);
  }
});
