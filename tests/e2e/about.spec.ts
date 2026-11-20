import { test, expect } from '@playwright/test';

test('tarot cards in order', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('.tarot .numeral')).toHaveText(['0', 'I', 'XVII']);
  await expect(page.locator('.tarot .card-name')).toHaveText(['The Fool', 'The Magician', 'The Star']);
});

test('turning a card', async ({ page }) => {
  await page.goto('/about');
  const magician = page.locator('.tarot button.card').nth(1);
  await expect(magician).toHaveAttribute('aria-expanded', 'false');
  await magician.click();
  await expect(magician).toHaveAttribute('aria-expanded', 'true');
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('tarot has no running transitions', async ({ page }) => {
    await page.goto('/about');
    const durations = await page.locator('.tarot *').evaluateAll((els) =>
      els.map((e) => getComputedStyle(e).transitionDuration).filter((d) => d.split(',').some((x) => parseFloat(x) > 0)));
    expect(durations).toEqual([]);
  });
});

test('skills, chronicle and contact', async ({ page }) => {
  await page.goto('/about');
  await expect(page.locator('#skills')).toContainText('PyTorch');
  await expect(page.locator('#skills')).not.toContainText('Jetson');
  await expect(page.locator('#chronicle')).toContainText('I did not develop the whole system');
  await expect(page.locator('#contact a[href="mailto:popong.faim@bumail.net"]')).toBeVisible();
  await expect(page.locator('#contact a[href="https://github.com/popongfm"]')).toBeVisible();
});

test('cv page', async ({ page }) => {
  await page.goto('/cv');
  await expect(page.locator('body')).toContainText('GPAX 3.36');
  await expect(page.locator('body')).toContainText('Mathematics for Data Science');
  await expect(page.getByRole('link', { name: 'Download PDF' })).toHaveCount(0);
  expect(await page.locator('body').innerText()).not.toMatch(/Jetson/i);
});
