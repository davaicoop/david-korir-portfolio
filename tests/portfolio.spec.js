import { test, expect } from '@playwright/test';
import { projects } from '../src/data/projects.js';

const widths = [1440, 1280, 1024, 768, 430, 390, 375, 360];
const menuAt = 850;

function observeErrors(page) {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => {
    if (response.url().startsWith('http://127.0.0.1:4173') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  return errors;
}

async function navigate(page, id, width) {
  if (width <= menuAt) await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('button', { name: id, exact: true }).click();
  await expect(page.getByRole('button', { name: id, exact: true })).toHaveAttribute('aria-current', 'location');
  await expect(page).toHaveURL(new RegExp(`#${id}$`));
}

for (const width of widths) {
  test(`complete layout and project journeys at ${width}px`, async ({ page }, testInfo) => {
    const errors = observeErrors(page);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('useful');
    await expect(page.locator('.project')).toHaveCount(5);
    for (const id of ['about', 'work', 'experience', 'security', 'skills', 'contact']) await expect(page.locator(`#${id}`)).toBeAttached();
    await navigate(page, 'work', width);
    if (width <= menuAt) await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');

    for (const project of projects) {
      const card = page.getByRole('article', { name: project.title, exact: true });
      await card.scrollIntoViewIfNeeded();
      if (project.image) {
        await expect.poll(() => card.locator('img').evaluate(image => image.complete && image.naturalWidth > 0)).toBeTruthy();
        await expect(card.locator('img')).toHaveAttribute('alt', project.imageAlt);
      }
      const trigger = card.getByRole('button', { name: `Explore ${project.title}` });
      await trigger.click();
      const dialog = page.getByRole('dialog', { name: project.title, exact: true });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('heading', { name: 'The problem' })).toBeVisible();
      await expect(dialog.getByRole('heading', { name: 'What I built' })).toBeVisible();
      if (project.live) await expect(dialog.getByRole('link', { name: project.liveLabel })).toHaveAttribute('href', project.live);
      if (project.privateSource) {
        await expect(dialog.getByRole('link', { name: 'Request code walkthrough' })).toHaveAttribute('href', /^mailto:/);
        await expect(dialog.locator('.source-reference')).toContainText(project.repository);
      } else if (project.repository) await expect(dialog.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', project.repository);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    }

    await navigate(page, 'skills', width);
    await expect(page.getByRole('heading', { name: 'Kabarak University' })).toBeVisible();
    await expect(page.getByRole('meter')).toHaveCount(0);
    await navigate(page, 'contact', width);
    await expect(page.locator('.contact-form')).toBeVisible();
    const overflow = await page.locator('main button, main a, input, textarea, .nav-inner').evaluateAll(elements => elements.filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.width && (rect.left < -1 || rect.right > innerWidth + 1);
    }).map(element => element.textContent || element.tagName));
    expect(overflow).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`portfolio-${width}-dark.png`), fullPage: true });
    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('#contact')).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    if (width === 1440 || width === 390) await page.screenshot({ path: testInfo.outputPath(`portfolio-${width}-light.png`), fullPage: true });
    expect(errors).toEqual([]);
  });
}

test('dialog traps keyboard focus and restores the trigger', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Explore BVK Adult Foster Care' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close project details' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('link', { name: 'Request code walkthrough' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close project details' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('mobile menu supports keyboard dismissal and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('button', { name: 'about', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
});

test('contact validates before preparing a draft without native form navigation', async ({ page }) => {
  const errors = observeErrors(page);
  await page.goto('/#contact');
  await page.getByRole('button', { name: 'Prepare email' }).click();
  await expect(page.getByLabel('Your name')).toBeFocused();
  await expect(page.getByRole('status')).toBeEmpty();
  await page.getByLabel('Your name').fill('Test visitor');
  await page.getByLabel('Email address').fill('invalid-email');
  await page.getByRole('button', { name: 'Prepare email' }).click();
  await expect(page.getByLabel('Email address')).toBeFocused();
  await page.getByLabel('Email address').fill('visitor@example.com');
  await page.getByLabel('Subject', { exact: true }).fill('Portfolio inquiry');
  await page.getByLabel('What would you like to work on?').fill('Testing the email composer.');
  await page.getByRole('button', { name: 'Prepare email' }).click();
  await expect(page.getByRole('status')).toContainText('Review and send it in your email app');
  await expect(page.locator('.contact-form')).toBeVisible();
  await expect(page).toHaveURL(/#contact$/);
  await page.getByLabel('Subject', { exact: true }).fill('Another inquiry');
  await expect(page.getByRole('status')).toBeEmpty();
  expect(errors).toEqual([]);
});

test('scroll motion reverses and reduced motion shows complete content', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const bar = page.locator('.skill-meter i').first();
  const scale = () => bar.evaluate(element => new DOMMatrix(getComputedStyle(element).transform).a);
  await expect.poll(scale).toBeLessThan(0.05);
  await page.locator('#skills').evaluate(element => window.scrollTo({ top: element.offsetTop + 150, behavior: 'instant' }));
  await expect.poll(scale).toBeGreaterThan(0.95);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(scale).toBeLessThan(0.05);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(scale).toBe(1);
  await expect(page.locator('.hero-copy')).toHaveCSS('transform', 'none');
  await expect(page.locator('.timeline-track path')).toHaveCSS('stroke-dashoffset', '0px');
  await expect(page.locator('.project-browser').first()).toHaveCSS('transform', 'none');
});

test('assets load locally, links are explicit and storage failure is recoverable', async ({ page, request }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage disabled'); };
    Storage.prototype.setItem = () => { throw new Error('Storage disabled'); };
  });
  const external = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4173')) external.push(request.url()); });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  for (const path of ['/favicon.ico', '/favicon.svg', '/fonts/dmsans-latin.woff2', '/fonts/spacegrotesk-latin.woff2']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect((await response.body()).length).toBeGreaterThan(100);
  }
  const allowed = new Set(projects.filter(project => project.live).map(project => project.live));
  projects.filter(project => project.repository && !project.privateSource).forEach(project => allowed.add(project.repository));
  allowed.add('https://github.com/davaicoop/');
  for (const href of await page.locator('a[target="_blank"]').evaluateAll(links => links.map(link => link.href))) expect(allowed.has(href)).toBeTruthy();
  expect(external).toEqual([]);
});
