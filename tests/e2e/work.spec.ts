import { test, expect } from '@playwright/test';

test('work index groups by constellation', async ({ page }) => {
  await page.goto('/work');
  const groups = page.locator('section.group');
  await expect(groups.locator('h2 .rune')).toHaveText(['ᚢ', 'ᛏ', 'ᚱ', 'ᚨ']);
  const counts = await groups.evaluateAll((els) => els.map((e) => e.querySelectorAll('li').length));
  expect(counts).toEqual([3, 2, 2, 5]);
});

test('cubesat is named honestly', async ({ page }) => {
  await page.goto('/work/grb-cubesat');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gamma-Ray Burst CubeSat');
  expect(await page.locator('body').innerText()).not.toMatch(/ANTARES/i);
});

test('medi-ident credits teammates', async ({ page }) => {
  await page.goto('/work/medi-ident-ai');
  await expect(page.locator('article')).toContainText('A senior teammate designed the server and the app');
  await expect(page.locator('.badge')).toHaveText('In progress');
});

test('dc-cellnet links to github', async ({ page }) => {
  await page.goto('/work/dc-cellnet');
  await expect(page.locator('a[href="https://github.com/popongfm/DC-CellNet"]')).toBeVisible();
});

test('no phone number', async ({ page }) => {
  for (const url of ['/work', '/work/medi-ident-ai', '/cv', '/about']) {
    await page.goto(url);
    expect(await page.content()).not.toContain('+66');
  }
});
