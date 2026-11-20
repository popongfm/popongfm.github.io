import { test, expect } from '@playwright/test';

test('home shows the portrait medallion', async ({ page }) => {
  await page.goto('/');
  const img = page.locator('.hero-text .medallion img');
  await expect(img).toBeVisible();
  await expect(img).toHaveAttribute('alt', 'Portrait of Popong Faimoon');
  expect(await img.evaluate((i: HTMLImageElement) => i.naturalWidth)).toBeGreaterThan(0);
});

test('about shows the sky-gazing portrait with the profile', async ({ page }) => {
  await page.goto('/about');
  const fig = page.locator('figure.self');
  await expect(fig.locator('img')).toBeVisible();
  expect(await fig.locator('img').evaluate((i: HTMLImageElement) => i.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator('.self-intro').first()).toContainText('builds ML solutions end-to-end');
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('medallion runes do not spin', async ({ page }) => {
    await page.goto('/');
    const running = await page.locator('.medallion').evaluate((el) => el.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length);
    expect(running).toBe(0);
  });
});

test('phone width with portraits', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const url of ['/', '/about']) {
    await page.goto(url);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  }
});
