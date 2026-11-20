import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

test('lcp under 2.5s on throttled 4g', async ({ page }) => {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto('/');
  const lcp = await page.evaluate(() => new Promise<number>((res) => {
    new PerformanceObserver((l) => { const e = l.getEntries(); res(e[e.length - 1].startTime); }).observe({ type: 'largest-contentful-paint', buffered: true });
  }));
  expect(lcp).toBeLessThan(2500);
});

test('js before interaction under 60kb', async ({ page }) => {
  let bytes = 0;
  page.on('response', async (r) => {
    if (r.request().resourceType() === 'script') { try { bytes += (await r.body()).length; } catch { /* ignore */ } }
  });
  await page.goto('/');
  await page.waitForTimeout(1500);
  expect(bytes).toBeLessThan(60 * 1024 * 3); // raw bytes; ~60 KB gzipped
});

function* htmlFiles(dir: string): Generator<string> {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (p.endsWith('.html')) yield p;
  }
}

test('content guard', () => {
  const bad: string[] = [];
  for (const f of htmlFiles('dist')) {
    const s = readFileSync(f, 'utf8');
    for (const re of [/ANTARES/i, /Jetson/i, /<audio/i, /<video/i, /\+66/, /\[TODO/]) if (re.test(s)) bad.push(`${f}: ${re}`);
  }
  expect(bad).toEqual([]);
});
