import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 800 } });

test('leaving the sky while 3d loads leaves no renderer behind', async ({ page }) => {
  await page.route(/Sky3D/, async (route) => { await new Promise((r) => setTimeout(r, 1500)); await route.continue(); });
  await page.goto('/');
  await page.getByRole('link', { name: 'Begin the journey' }).click();
  await page.waitForTimeout(200);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(2500);
  await expect(page.locator('#sky')).toHaveAttribute('data-journey', 'false');
  await expect(page.locator('#sky canvas')).toHaveCount(0);
  const left = await page.locator('#sky .stars li').first().evaluate((e) => (e as HTMLElement).style.left);
  expect(left).toMatch(/%$/);
});

test('top menu stays visible and usable in the journey', async ({ page }) => {
  await page.goto('/?sky=2d#star-medi-ident-ai');
  await expect(page.locator('#panel')).toBeVisible();
  const work = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Work', exact: true });
  await expect(work).toBeVisible();
  const hit = await work.evaluate((el) => { const r = el.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return el === top || el.contains(top); });
  expect(hit).toBe(true);
  expect(await page.locator('a[data-begin]').evaluate((e) => !!e.closest('[inert]'))).toBe(true);
});
