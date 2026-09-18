import { test, expect } from '@playwright/test';

test('desktop navigation, project dialog, theme and contact validation', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('useful');
  await page.getByRole('button', { name: 'work', exact: true }).click();
  await expect(page.getByRole('button', { name: 'work', exact: true })).toHaveAttribute('aria-current', 'location');
  const trigger = page.getByRole('button', { name: 'Explore BVK Adult Foster Care' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'Live website' })).toHaveAttribute('href', 'https://bvk-adult-foster-care.onrender.com/');
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close project details' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'GitHub' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'contact', exact: true }).click();
  await page.getByRole('button', { name: 'Prepare email' }).click();
  await expect(page.getByLabel('Your name')).toBeFocused();
  await expect(page.getByRole('status')).toBeEmpty();
  await page.getByLabel('Your name').fill('Test visitor');
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page.getByLabel('Subject', { exact: true }).fill('Portfolio inquiry');
  await page.getByLabel('What would you like to work on?').fill('Testing the email composer.');
  await page.getByRole('button', { name: 'Prepare email' }).click();
  await expect(page.getByRole('status')).toContainText('Review and send it in your email app');
  expect(errors).toEqual([]);
});

for (const width of [360, 390, 768]) {
  test(`responsive navigation and no overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    const menu = page.getByRole('button', { name: 'Open navigation' });
    await menu.click();
    await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('button', { name: 'skills', exact: true }).click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#site-navigation button').filter({ hasText: /^skills$/ })).toHaveAttribute('aria-current', 'location');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await page.getByRole('button', { name: 'Explore BNB Manager' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'Close project details' }).click();
  });
}

test('scroll-linked skills reverse and reduced motion shows complete content', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const bar = page.locator('.skill-meter i').first();
  const scale = () => bar.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a);
  expect(await scale()).toBeLessThan(0.05);
  await page.locator('#skills').evaluate(element => window.scrollTo({ top: element.offsetTop + 150, behavior: 'instant' }));
  await expect.poll(scale).toBeGreaterThan(0.95);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(scale).toBeLessThan(0.05);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(scale).toBe(1);
  await expect(page.locator('.hero-copy')).toHaveCSS('transform', 'none');
  await expect(page.locator('.timeline-track path')).toHaveCSS('stroke-dashoffset', '0px');
});
