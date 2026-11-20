import { test, expect } from '@playwright/test';

test('thai home is in thai', async ({ page }) => {
  await page.goto('/th/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'th');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('อ่านท้องฟ้า');
  await expect(page.locator('.hero-text .lead')).toContainText('โมเดล');
  await expect(page.locator('.stats')).toContainText('ผู้เข้าอบรม');
  await expect(page.getByRole('link', { name: 'เริ่มการเดินทาง' })).toBeVisible();
});

test('thai project page has no fallback', async ({ page }) => {
  await page.goto('/th/work/medi-ident-ai');
  await expect(page.getByText('ยังไม่มีฉบับภาษาไทย')).toHaveCount(0);
  await expect(page.locator('article')).toContainText('แอป Android');
  await expect(page.locator('article')).toContainText('บทบาทของฉัน');
});

test('every thai project page is translated', async ({ page }) => {
  await page.goto('/th/work');
  const hrefs = await page.locator('section.group li a').evaluateAll((as) => as.map((a) => a.getAttribute('href')!));
  expect(hrefs.length).toBe(12);
  for (const h of hrefs) {
    await page.goto(h);
    await expect(page.getByText('ยังไม่มีฉบับภาษาไทย'), h).toHaveCount(0);
  }
});

test('thai about, skills, chronicle and cv', async ({ page }) => {
  await page.goto('/th/about');
  await expect(page.locator('.self-intro').first()).toContainText('นักศึกษา');
  await expect(page.locator('#skills')).toContainText('โมเดล');
  await expect(page.locator('#chronicle')).toContainText('ฉันไม่ได้พัฒนาทั้งระบบ');
  await page.goto('/th/cv');
  await expect(page.locator('body')).toContainText('การศึกษา');
  await expect(page.locator('body')).toContainText('วิศวกรรมปัญญาประดิษฐ์');
});

test('language switch keeps the page', async ({ page }) => {
  await page.goto('/work/dc-cellnet');
  await page.getByRole('navigation', { name: 'Main' }).locator('a[hreflang="th"]').click();
  await expect(page).toHaveURL(/\/th\/work\/dc-cellnet$/);
  await expect(page.locator('article')).toContainText('งานวิจัย');
  await page.getByRole('navigation', { name: 'Main' }).locator('a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/work\/dc-cellnet$/);
});

test('thai labels are not letter-spaced', async ({ page }) => {
  await page.goto('/th/');
  const ls = await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'ผลงาน' }).evaluate((e) => parseFloat(getComputedStyle(e).letterSpacing) || 0);
  expect(ls).toBeLessThan(1);
});
