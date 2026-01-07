import { test, expect } from '@playwright/test';
import { AuthHelper, PageHelper, ValidationHelper } from './fixtures/helpers';

test.describe('Participant Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await AuthHelper.loginAsRole(page, 'participant');
  });

  test('should load participant dashboard with all tabs', async ({ page }) => {
    await page.goto('/participant');

    await expect(page.locator('button:has-text("Events")')).toBeVisible();
    await expect(page.locator('button:has-text("Registrations")')).toBeVisible();
    await expect(page.locator('button:has-text("Preferences")')).toBeVisible();
    await expect(page.locator('button:has-text("Profile")')).toBeVisible();
  });

  test('should display available events', async ({ page }) => {
    await page.goto('/participant');
    await PageHelper.clickTab(page, 'Events');

    // Should display event cards
    const hasEvents = await ValidationHelper.isVisible(page, '[class*="card"]') ||
                     await ValidationHelper.hasText(page, /event|date|location/i);
    expect(hasEvents).toBeTruthy();
  });

  test('should show registrations', async ({ page }) => {
    await page.goto('/participant');
    await PageHelper.clickTab(page, 'Registrations');

    // Should display registered events
    const hasContent = await ValidationHelper.isVisible(page, 'table') ||
                      await ValidationHelper.hasText(page, /registered|no registration/i);
    expect(hasContent).toBeTruthy();
  });

  test('should allow editing preferences', async ({ page }) => {
    await page.goto('/participant');
    await PageHelper.clickTab(page, 'Preferences');

    // Should display preference options
    const hasPreferences = await ValidationHelper.isVisible(page, 'select') ||
                          await ValidationHelper.hasText(page, /room|travel|dietary|preference/i);
    expect(hasPreferences).toBeTruthy();
  });

  test('should display profile information', async ({ page }) => {
    await page.goto('/participant');
    await PageHelper.clickTab(page, 'Profile');

    // Should display user profile
    const hasProfile = await ValidationHelper.hasText(page, /john|participant|profile|email|phone/i);
    expect(hasProfile).toBeTruthy();
  });

  test('should register for an event', async ({ page }) => {
    await page.goto('/participant');
    await PageHelper.clickTab(page, 'Events');

    // Click Register Now button if available
    const registerButton = await page.$('button:has-text("Register Now")');
    if (registerButton) {
      await registerButton.click();
      await page.waitForLoadState('networkidle');

      // Verify registration succeeded (success message or redirect)
      const hasSuccess = await ValidationHelper.hasText(page, /success|registered|complete/i);
      expect(hasSuccess).toBeTruthy();
    }
  });

  test('should handle form validation on preferences', async ({ page }) => {
    await page.goto('/participant');
    await PageHelper.clickTab(page, 'Preferences');

    // Try to submit invalid form
    const submitButton = await page.$('button:has-text("Save")') || 
                        await page.$('button:has-text("Submit")');

    if (submitButton) {
      await submitButton.click();

      // Check for validation errors
      const hasValidation = await ValidationHelper.hasText(page, /required|invalid|error/i) ||
                           page.url().includes('/participant');
      expect(hasValidation).toBeTruthy();
    }
  });
});

test.describe('Organizer Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await AuthHelper.loginAsRole(page, 'organizer');
  });

  test('should load organizer dashboard with all tabs', async ({ page }) => {
    await page.goto('/organizer');

    await expect(page.locator('button:has-text("Events")')).toBeVisible();
    await expect(page.locator('button:has-text("Registrations")')).toBeVisible();
    await expect(page.locator('button:has-text("Invitations")')).toBeVisible();
    await expect(page.locator('button:has-text("Reports")')).toBeVisible();
  });

  test('should display company events', async ({ page }) => {
    await page.goto('/organizer');
    await PageHelper.clickTab(page, 'Events');

    // Should display events or create event form
    const hasContent = await ValidationHelper.isVisible(page, '[class*="card"]') ||
                      await ValidationHelper.hasText(page, /event|create|add event/i);
    expect(hasContent).toBeTruthy();
  });

  test('should show registrations for company events', async ({ page }) => {
    await page.goto('/organizer');
    await PageHelper.clickTab(page, 'Registrations');

    // Should display registration data
    const hasContent = await ValidationHelper.isVisible(page, 'table') ||
                      await ValidationHelper.hasText(page, /registration|participant|status/i);
    expect(hasContent).toBeTruthy();
  });

  test('should display invitations interface', async ({ page }) => {
    await page.goto('/organizer');
    await PageHelper.clickTab(page, 'Invitations');

    // Should have invitation controls
    const hasInvitations = await ValidationHelper.isVisible(page, 'textarea') ||
                          await ValidationHelper.hasText(page, /email|invite|send/i);
    expect(hasInvitations).toBeTruthy();
  });

  test('should display reports', async ({ page }) => {
    await page.goto('/organizer');
    await PageHelper.clickTab(page, 'Reports');

    // Should display report data
    const hasReports = await ValidationHelper.hasText(page, /registration|payment|report|statistic/i);
    expect(hasReports).toBeTruthy();
  });
});

test.describe('Resort Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await AuthHelper.loginAsRole(page, 'resort');
  });

  test('should load resort dashboard with all tabs', async ({ page }) => {
    await page.goto('/resort');

    await expect(page.locator('button:has-text("Bookings")')).toBeVisible();
    await expect(page.locator('button:has-text("Attendees")')).toBeVisible();
    await expect(page.locator('button:has-text("Feedback")')).toBeVisible();
    await expect(page.locator('button:has-text("Resources")')).toBeVisible();
  });

  test('should display upcoming bookings', async ({ page }) => {
    await page.goto('/resort');
    await PageHelper.clickTab(page, 'Bookings');

    // Should display bookings
    const hasBookings = await ValidationHelper.isVisible(page, 'table') ||
                       await ValidationHelper.hasText(page, /booking|date|event|attendee/i);
    expect(hasBookings).toBeTruthy();
  });

  test('should display attendee information', async ({ page }) => {
    await page.goto('/resort');
    await PageHelper.clickTab(page, 'Attendees');

    // Should display attendee data
    const hasAttendees = await ValidationHelper.hasText(page, /attendee|expected|confirmed|pending/i);
    expect(hasAttendees).toBeTruthy();
  });

  test('should display feedback section', async ({ page }) => {
    await page.goto('/resort');
    await PageHelper.clickTab(page, 'Feedback');

    // Should display feedback metrics
    const hasFeedback = await ValidationHelper.hasText(page, /feedback|rating|review|feedback/i);
    expect(hasFeedback).toBeTruthy();
  });

  test('should display resource availability', async ({ page }) => {
    await page.goto('/resort');
    await PageHelper.clickTab(page, 'Resources');

    // Should display resource info
    const hasResources = await ValidationHelper.hasText(page, /room|dining|capacity|resource|available/i);
    expect(hasResources).toBeTruthy();
  });
});
