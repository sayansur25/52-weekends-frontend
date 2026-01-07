import { test, expect } from '@playwright/test';
import { AuthHelper, PageHelper, ValidationHelper } from './fixtures/helpers';

test.describe('Role-Based Access Control', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
  });

  test('admin can access admin dashboard', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'admin');
    await page.goto('/admin');
    expect(page.url()).toContain('/admin');
    await expect(page.locator('text=Overview')).toBeVisible();
  });

  test('admin cannot access organizer dashboard via URL', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'admin');
    await page.goto('/organizer');

    // Should be redirected or show access denied
    const isNotAuthorized = !page.url().includes('/organizer') ||
                           await ValidationHelper.hasText(page, /access denied|not authorized/i);
    expect(isNotAuthorized).toBeTruthy();
  });

  test('organizer can access organizer dashboard', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'organizer');
    await page.goto('/organizer');
    expect(page.url()).toContain('/organizer');
  });

  test('participant can access participant dashboard', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'participant');
    await page.goto('/participant');
    expect(page.url()).toContain('/participant');
  });

  test('resort can access resort dashboard', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'resort');
    await page.goto('/resort');
    expect(page.url()).toContain('/resort');
  });

  test('unauthenticated user cannot access any dashboard', async ({ page }) => {
    // Try to access admin without logging in
    await page.goto('/admin');

    // Should be redirected to login
    expect(page.url()).toContain('/auth/login');
  });

  test('dashboard redirect routes to correct dashboard by role', async ({ page }) => {
    const roleTests = [
      { role: 'admin', path: '/admin' },
      { role: 'organizer', path: '/organizer' },
      { role: 'participant', path: '/participant' },
      { role: 'resort_contact', path: '/resort' },
    ];

    for (const { role, path } of roleTests) {
      await page.evaluate(() => localStorage.clear());
      
      // Login and go to dashboard
      if (role === 'admin') {
        await AuthHelper.loginAsRole(page, 'admin');
      } else if (role === 'organizer') {
        await AuthHelper.loginAsRole(page, 'organizer');
      } else if (role === 'participant') {
        await AuthHelper.loginAsRole(page, 'participant');
      } else {
        await AuthHelper.loginAsRole(page, 'resort');
      }

      await page.goto('/dashboard');

      // Should redirect to appropriate dashboard
      expect(page.url()).toContain(path);
    }
  });
});
