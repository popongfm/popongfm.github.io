import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1280, height: 800 } });

test('3d mounts only after begin', async ({ page }) => {
  const urls: string[] = [];
  page.on('request', (r) => urls.push(r.url()));
  await page.goto('/');
  await page.waitForTimeout(1500);
  const before = urls.filter((u) => /Sky3D|three/i.test(u));
  expect(before).toEqual([]);
  await page.getByRole('link', { name: 'Begin the journey' }).click();
  await expect(page.locator('#sky')).toHaveAttribute('data-mode', '3d');
  await expect(page.locator('#sky .canvas-host canvas')).toBeVisible({ timeout: 8000 });
  expect(urls.some((u) => /Sky3D|three/i.test(u))).toBe(true);
});

test('3d select through the star layer', async ({ page }) => {
  await page.goto('/#journey');
  await expect(page.locator('#sky .canvas-host canvas')).toBeVisible({ timeout: 8000 });
  await page.waitForTimeout(2600);
  await page.locator('a.star[data-slug="ispace-lunar-workshop"]').click();
  await expect(page.locator('#panel-title')).toHaveText('ispace Lunar Mission Workshop', { timeout: 2000 });
});

test('webgl fallback', async ({ page }) => {
  await page.addInitScript(() => {
    const orig = HTMLCanvasElement.prototype.getContext;
    // @ts-expect-error test override
    HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) {
      if (/webgl/.test(type)) return null;
      return orig.call(this, type, ...rest);
    };
  });
  await page.goto('/');
  await page.getByRole('link', { name: 'Begin the journey' }).click();
  await expect(page.locator('#sky')).toHaveAttribute('data-mode', '2d');
  await page.locator('a.star[data-slug="dc-cellnet"]').click();
  await expect(page.locator('#panel-title')).toHaveText('DC-CellNet', { timeout: 2000 });
});

test('context lost falls back to 2d', async ({ page }) => {
  await page.goto('/#journey');
  await expect(page.locator('#sky .canvas-host canvas')).toBeVisible({ timeout: 8000 });
  await page.evaluate(() => {
    const c = document.querySelector<HTMLCanvasElement>('#sky .canvas-host canvas')!;
    (c.getContext('webgl2') as WebGL2RenderingContext).getExtension('WEBGL_lose_context')!.loseContext();
  });
  await expect(page.locator('#sky')).toHaveAttribute('data-mode', '2d');
  await expect(page.locator('#sky .canvas-host canvas')).toHaveCount(0);
});

test.describe('phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });
  test('phone stays 2d', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Begin the journey' }).click();
    await expect(page.locator('#sky')).toHaveAttribute('data-mode', '2d');
    await expect(page.locator('#sky canvas')).toHaveCount(0);
  });
});
