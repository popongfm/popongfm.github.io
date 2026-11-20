import { test, expect } from '@playwright/test';

test('nav links', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main' });
  for (const name of ['Work', 'About', 'CV', 'Contact']) {
    await expect(nav.getByRole('link', { name, exact: true })).toBeVisible();
  }
  await expect(nav.locator('a[href="/th/"]')).toBeVisible();
});

test('skip link', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toHaveText('Skip to content');
});

test('phone width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const w = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(w).toBeLessThanOrEqual(390);
});

test('no audio', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('audio, video').count()).toBe(0);
});
