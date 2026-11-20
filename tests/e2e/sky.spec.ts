import { test, expect } from '@playwright/test';

const dialog = (page: any) => page.locator('#panel');

test('begin', async ({ page }) => {
  await page.goto('/?sky=2d');
  await page.getByRole('link', { name: 'Begin the journey' }).click();
  await expect(page.locator('#sky')).toHaveAttribute('data-journey', 'true');
  await expect(page).toHaveURL(/#journey$/);
});

test('open star', async ({ page }) => {
  await page.goto('/?sky=2d#journey');
  await page.locator('a.star[data-slug="medi-ident-ai"]').click();
  await expect(dialog(page)).toBeVisible();
  await expect(page.locator('#panel-title')).toHaveText('Medi-Ident AI', { timeout: 1500 });
  await expect(page).toHaveURL(/#star-medi-ident-ai$/);
  await page.goBack();
  await expect(dialog(page)).toBeHidden();
});

test('deep link', async ({ page }) => {
  await page.goto('/?sky=2d#star-dc-cellnet');
  await expect(dialog(page)).toBeVisible();
  await expect(dialog(page)).toContainText('In progress');
});

test('unknown star hash', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('/?sky=2d#star-nope');
  await expect(page.locator('#sky')).toHaveAttribute('data-journey', 'true');
  await expect(dialog(page)).toBeHidden();
  await expect(page).toHaveURL(/#journey$/);
  expect(errors.filter((e) => !/fonts\.g/.test(e))).toEqual([]);
});

test('keyboard', async ({ page }) => {
  await page.goto('/?sky=2d#journey');
  const stars = page.locator('a.star');
  await stars.first().focus();
  await page.keyboard.press('ArrowRight');
  await expect(stars.nth(1)).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(dialog(page)).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog(page)).toBeHidden();
  await expect(stars.nth(1)).toBeFocused();
});

test('ring rune opens contact', async ({ page }) => {
  await page.goto('/?sky=2d#journey');
  await page.locator('a.ring-rune[data-panel="contact"]').click();
  await expect(dialog(page).locator('a[href="mailto:popong.faim@bumail.net"]')).toBeVisible();
  await expect(page).toHaveURL(/#panel-contact$/);
});

test('phone bottom sheet', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#star-medi-ident-ai');
  await expect(page.locator('#sky')).toHaveAttribute('data-mode', '2d');
  const box = await dialog(page).boundingBox();
  expect(box!.y).toBeGreaterThan(100);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('heading is final immediately', async ({ page }) => {
    await page.goto('/?sky=2d#journey');
    await page.locator('a.star[data-slug="grb-cubesat"]').click();
    expect(await page.locator('#panel-title').textContent()).toBe('Gamma-Ray Burst CubeSat');
  });
});
