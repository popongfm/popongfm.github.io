import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const url of ['/', '/work', '/work/medi-ident-ai', '/about', '/cv', '/th/']) {
  test(`axe ${url}`, async ({ page }) => {
    await page.goto(url);
    const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([]);
  });
}

test('axe open panel', async ({ page }) => {
  await page.goto('/?sky=2d#star-dc-cellnet');
  await expect(page.locator('#panel')).toBeVisible();
  const r = await new AxeBuilder({ page }).include('#panel').withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(r.violations.map((v) => v.id)).toEqual([]);
});
