import { test, expect } from '@playwright/test';

// The English-fallback path is covered by the localize() unit tests; every project now has Thai text.
test('th project page renders in thai', async ({ page }) => {
  await page.goto('/th/work/grb-cubesat');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gamma-Ray Burst CubeSat');
  await expect(page.locator('article')).toContainText('หัวหน้าทีม');
  await expect(page.locator('html')).toHaveAttribute('lang', 'th');
});

test('hreflang', async ({ page }) => {
  await page.goto('/work');
  await expect(page.locator('link[rel="alternate"][hreflang="th"]')).toHaveAttribute('href', 'https://popongfm.github.io/th/work');
});

test('thai nav', async ({ page }) => {
  await page.goto('/th/');
  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'ผลงาน' })).toHaveAttribute('href', '/th/work');
});
