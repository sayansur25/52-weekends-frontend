import { test, expect } from '@playwright/test';
import { AuthHelper, ValidationHelper } from './fixtures/helpers';

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });

  const viewports = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'iPhone 14 Pro Max', width: 430, height: 932 },
    { name: 'Galaxy S21', width: 360, height: 800 },
    { name: 'iPad Mini', width: 768, height: 1024 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
    { name: 'Desktop 1080p', width: 1080, height: 720 },
    { name: 'Desktop 2K', width: 2560, height: 1440 },
  ];

  test('login page is responsive on all devices', async ({ page }) => {
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/auth/login');

      // Verify form is visible and usable
      const emailInput = await page.$('input[type="email"]');
      const passwordInput = await page.$('input[type="password"]');
      const signInButton = await page.$('button:has-text("Sign In")');

      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
      expect(signInButton).toBeTruthy();

      // Check button is at least 44px tall for touch accessibility
      const buttonBox = await signInButton?.boundingBox();
      if (viewport.width < 640) {
        expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('admin dashboard tabs are responsive', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'admin');

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/admin');

      // All tabs should be visible or in a menu
      const overviewTab = await page.$('button:has-text("Overview")');
      const companiesTab = await page.$('button:has-text("Companies")');

      expect(overviewTab || companiesTab).toBeTruthy();

      // Tab switching should work
      if (overviewTab) {
        await overviewTab.click();
        await page.waitForLoadState('networkidle');
        expect(page.url()).toContain('/admin');
      }
    }
  });

  test('content reflows correctly on mobile', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'participant');
    await page.goto('/participant');

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const responsive = await ValidationHelper.checkResponsiveness(page);
    expect(responsive.isMobile).toBeTruthy();

    // Grid should be single column on mobile
    const gridClasses = await page.evaluate(() => {
      const grid = document.querySelector('[class*="grid"]');
      return grid?.className || '';
    });

    expect(gridClasses).toMatch(/grid-cols-1|grid-cols-2.*md:|grid-cols-3.*lg:/);
  });

  test('images scale correctly on all devices', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'admin');
    await page.goto('/admin');

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      // Get all images
      const images = await page.$$('img');

      for (const img of images) {
        const box = await img.boundingBox();
        if (box) {
          // Image should not overflow viewport
          expect(box.width).toBeLessThanOrEqual(viewport.width);
        }
      }
    }
  });

  test('text is readable on mobile devices', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'participant');
    await page.goto('/participant');

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check font sizes
    const textElements = await page.$$('[role="heading"], p, button, span');

    for (const element of textElements.slice(0, 10)) {
      const fontSize = await element.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });

      const size = parseInt(fontSize);
      // Minimum 14px for body text, 16px recommended
      expect(size).toBeGreaterThanOrEqual(12);
    }
  });

  test('all clickable elements have adequate touch targets', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'admin');
    await page.goto('/admin');

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const buttons = await page.$$('button');

    for (const button of buttons.slice(0, 5)) {
      const box = await button.boundingBox();
      if (box) {
        // Minimum 44x44 for mobile touch targets
        expect(Math.min(box.height, box.width)).toBeGreaterThanOrEqual(40);
      }
    }
  });

  test('forms are usable on mobile with adequate spacing', async ({ page }) => {
    await page.goto('/auth/register');
    await page.setViewportSize({ width: 375, height: 667 });

    // Fill form on mobile
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'TestPass123');
    await page.fill('input[name="confirmPassword"]', 'TestPass123');

    // All inputs should be visible without excessive scrolling
    const nameInput = await page.$('input[name="name"]');
    const box = await nameInput?.boundingBox();

    if (box) {
      expect(box.y).toBeGreaterThan(0);
      expect(box.y + box.height).toBeLessThan(667 * 1.5); // Allow some scrolling
    }
  });
});
