import { test, expect } from '@playwright/test';

test('featured order', async ({ page }) => {
  await page.goto('/');
  const headings = page.locator('.stones h3');
  await expect(headings).toHaveText(['Medi-Ident AI', 'ispace Lunar Mission Workshop', 'DC-CellNet']);
  await expect(page.locator('.stones li').nth(2)).toContainText('In progress');
});

test.describe('without javascript', () => {
  test.use({ javaScriptEnabled: false });
  test('works without js', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#sky a.star')).toHaveCount(12);
    await expect(page.getByRole('link', { name: 'Quick view' })).toHaveAttribute('href', '/work');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Reading the sky');
  });
});

test('no three on load', async ({ page }) => {
  const urls: string[] = [];
  page.on('request', (r) => urls.push(r.url()));
  await page.goto('/');
  await page.waitForTimeout(2000);
  expect(urls.filter((u) => /three/i.test(u))).toEqual([]);
});

test('phone width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test('rune tooltip', async ({ page }) => {
  await page.goto('/');
  const glyph = page.locator('.stones .rune-glyph').first();
  await glyph.hover();
  const tip = glyph.locator('.tip');
  await expect(tip).toBeVisible();
  await expect(tip).toContainText('Uruz');
  await expect(tip).toContainText('vitality, health');
  await expect(tip).toContainText('traditional meaning');
});

test('proof stats and co-op line', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Looking for a 6-month Data Science or MLOps co-op from June 2027')).toBeVisible();
  await expect(page.locator('.stats')).toContainText('89.2%');
  await expect(page.locator('.stats')).toContainText('1 of 31');
});
