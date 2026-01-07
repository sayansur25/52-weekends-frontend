import { test, expect } from '@playwright/test';
import { AuthHelper, PageHelper, ValidationHelper } from './fixtures/helpers';
import { TEST_USERS, INVALID_CREDENTIALS } from './fixtures/auth';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear());
  });

  test('should load login page', async ({ page }) => {
    await page.goto('/auth/login');
    expect(page).toHaveTitle(/52 Weekends|Login/i);
    await expect(page.locator('text=Sign In')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', INVALID_CREDENTIALS.email);
    await page.fill('input[type="password"]', INVALID_CREDENTIALS.password);
    await page.click('button:has-text("Sign In")');

    // Check for error message
    const hasError = await ValidationHelper.hasText(page, /invalid|error|failed/i);
    expect(hasError).toBeTruthy();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const user = TEST_USERS.admin;
    await AuthHelper.login(page, user.email, user.password);

    // Verify token is stored
    const token = await page.evaluate(() => localStorage.getItem('authToken'));
    expect(token).toBeTruthy();

    // Verify role is stored
    const role = await page.evaluate(() => localStorage.getItem('userRole'));
    expect(role).toBe('admin');
  });

  test('should redirect to appropriate dashboard after login', async ({ page }) => {
    const user = TEST_USERS.participant;
    await AuthHelper.login(page, user.email, user.password);

    // Verify redirect to correct dashboard
    expect(page.url()).toContain('/participant');
  });

  test('should load register page', async ({ page }) => {
    await page.goto('/auth/register');
    await expect(page.locator('text=Create Account')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('should show validation error if passwords do not match', async ({ page }) => {
    await page.goto('/auth/register');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Password123');
    await page.fill('input[name="confirmPassword"]', 'DifferentPassword');

    await page.click('button:has-text("Create Account")');

    const hasError = await ValidationHelper.hasText(page, /password.*do not match|passwords.*match/i);
    expect(hasError).toBeTruthy();
  });

  test('should logout successfully', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'admin');

    // Verify logged in
    let isLoggedIn = await AuthHelper.isLoggedIn(page);
    expect(isLoggedIn).toBeTruthy();

    // Logout
    await AuthHelper.logout(page);

    // Verify logged out
    isLoggedIn = await AuthHelper.isLoggedIn(page);
    expect(isLoggedIn).toBeFalsy();
    expect(page.url()).toContain('/auth/login');
  });

  test('should persist login on page refresh', async ({ page }) => {
    await AuthHelper.loginAsRole(page, 'admin');

    // Refresh page
    await page.reload();

    // Should still be logged in
    const isLoggedIn = await AuthHelper.isLoggedIn(page);
    expect(isLoggedIn).toBeTruthy();

    // Should still be on admin dashboard
    expect(page.url()).toContain('/admin');
  });
});
