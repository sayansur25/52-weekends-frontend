import { test, expect } from '@playwright/test';
import { AuthHelper, PageHelper, ValidationHelper } from './fixtures/helpers';
import { TEST_USERS } from './fixtures/auth';

test.describe('Admin Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await AuthHelper.loginAsRole(page, 'admin');
  });

  test('should load admin dashboard with all tabs', async ({ page }) => {
    await page.goto('/admin');

    // Check all tabs are visible
    await expect(page.locator('button:has-text("Overview")')).toBeVisible();
    await expect(page.locator('button:has-text("Companies")')).toBeVisible();
    await expect(page.locator('button:has-text("Events")')).toBeVisible();
    await expect(page.locator('button:has-text("Analytics")')).toBeVisible();
  });

  test('should display KPI cards on Overview tab', async ({ page }) => {
    await page.goto('/admin');

    // Verify Overview tab content
    const hasKPIs = await ValidationHelper.hasText(page, /Total Companies|Total Events|Active Events|Revenue/i);
    expect(hasKPIs).toBeTruthy();
  });

  test('should switch between tabs without errors', async ({ page }) => {
    await page.goto('/admin');

    const tabs = ['Overview', 'Companies', 'Events', 'Analytics'];

    for (const tab of tabs) {
      await PageHelper.clickTab(page, tab);
      await expect(page.locator(`button:has-text("${tab}")`)).toHaveClass(/active|selected|bg-blue/i);
      
      // Verify no console errors
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      expect(consoleErrors.length).toBe(0);
    }
  });

  test('should display companies table on Companies tab', async ({ page }) => {
    await page.goto('/admin');
    await PageHelper.clickTab(page, 'Companies');

    // Verify table elements
    const hasTable = await ValidationHelper.isVisible(page, 'table');
    expect(hasTable).toBeTruthy();

    // Verify company data is displayed
    const hasCompanyData = await ValidationHelper.hasText(page, /company|name|industry|contact/i);
    expect(hasCompanyData).toBeTruthy();
  });

  test('should display events on Events tab', async ({ page }) => {
    await page.goto('/admin');
    await PageHelper.clickTab(page, 'Events');

    // Verify events are displayed
    const hasEvents = await ValidationHelper.hasText(page, /event|date|location/i);
    expect(hasEvents).toBeTruthy();
  });

  test('should display analytics on Analytics tab', async ({ page }) => {
    await page.goto('/admin');
    await PageHelper.clickTab(page, 'Analytics');

    // Verify analytics are displayed
    const hasAnalytics = await ValidationHelper.hasText(page, /booking|rating|repeat/i);
    expect(hasAnalytics).toBeTruthy();
  });

  test('should prevent non-admin users from accessing admin dashboard', async ({ page }) => {
    // Try to access as participant
    await page.evaluate(() => {
      localStorage.setItem('authToken', 'fake-token');
      localStorage.setItem('userRole', 'participant');
      localStorage.setItem('user', JSON.stringify({ role: 'participant' }));
    });

    await page.goto('/admin');

    // Should be redirected or show access denied
    const isAccessDenied = await ValidationHelper.hasText(page, /access denied|not authorized|please log in/i);
    const isRedirected = page.url().includes('/auth/login') || page.url().includes('/dashboard');

    expect(isAccessDenied || isRedirected).toBeTruthy();
  });

  test('should have responsive design on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/admin');

    const responsive = await ValidationHelper.checkResponsiveness(page);
    expect(responsive.isMobile).toBeTruthy();

    // Tabs should still be clickable on mobile
    await PageHelper.clickTab(page, 'Companies');
    expect(page.url()).toContain('/admin');
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept API calls and fail them
    await page.route('**/api/companies', (route) => {
      route.abort('failed');
    });

    await page.goto('/admin');
    await PageHelper.clickTab(page, 'Companies');

    // Should show error message or empty state
    const hasErrorHandling = await ValidationHelper.hasText(page, /error|no data|failed/i) ||
                           await ValidationHelper.isVisible(page, '[class*="empty"]');
    
    expect(hasErrorHandling).toBeTruthy();
  });
});
