import { Page, Browser, BrowserContext } from '@playwright/test';
import { TEST_USERS } from './auth';

/**
 * Helper class for common authentication operations
 */
export class AuthHelper {
  static async login(page: Page, email: string, password: string) {
    await page.goto('/auth/login');
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button:has-text("Sign In")');
    
    // Wait for redirect to dashboard
    await page.waitForURL(/\/(admin|organizer|participant|resort|dashboard)/);
  }

  static async loginAsRole(page: Page, role: 'admin' | 'organizer' | 'participant' | 'resort') {
    const user = TEST_USERS[role];
    await this.login(page, user.email, user.password);
  }

  static async logout(page: Page) {
    // Click on user menu or logout button
    await page.click('button:has-text("Logout")');
    await page.waitForURL('/auth/login');
  }

  static async isLoggedIn(page: Page): Promise<boolean> {
    try {
      const authToken = await page.evaluate(() => localStorage.getItem('authToken'));
      return !!authToken;
    } catch {
      return false;
    }
  }

  static async getCurrentRole(page: Page): Promise<string | null> {
    try {
      const role = await page.evaluate(() => localStorage.getItem('userRole'));
      return role;
    } catch {
      return null;
    }
  }
}

/**
 * Helper class for common page interactions
 */
export class PageHelper {
  static async clickTab(page: Page, tabName: string) {
    await page.click(`button:has-text("${tabName}")`);
    await page.waitForLoadState('networkidle');
  }

  static async isMobileViewport(page: Page): Promise<boolean> {
    const viewport = page.viewportSize();
    return viewport ? viewport.width < 768 : false;
  }

  static async takeScreenshot(page: Page, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `screenshots/${timestamp}-${name}.png`, fullPage: true });
  }

  static async waitForElement(page: Page, selector: string, timeout = 5000) {
    await page.waitForSelector(selector, { timeout });
  }

  static async fillForm(page: Page, fields: Record<string, string>) {
    for (const [selector, value] of Object.entries(fields)) {
      await page.fill(selector, value);
    }
  }

  static async submitForm(page: Page, submitButtonText = 'Submit') {
    await page.click(`button:has-text("${submitButtonText}")`);
    await page.waitForLoadState('networkidle');
  }
}

/**
 * Helper class for assertions and validations
 */
export class ValidationHelper {
  static async hasText(page: Page, text: string): Promise<boolean> {
    try {
      await page.waitForSelector(`text="${text}"`, { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  static async isVisible(page: Page, selector: string): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  static async hasClass(page: Page, selector: string, className: string): Promise<boolean> {
    const element = await page.$(selector);
    if (!element) return false;
    const classes = await element.getAttribute('class');
    return classes ? classes.includes(className) : false;
  }

  static async checkResponsiveness(page: Page) {
    const results = {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      hasResponsiveMenu: false,
      hasGridLayout: false,
    };

    const viewport = page.viewportSize();
    if (!viewport) return results;

    if (viewport.width < 640) results.isMobile = true;
    if (viewport.width >= 640 && viewport.width < 1024) results.isTablet = true;
    if (viewport.width >= 1024) results.isDesktop = true;

    // Check for responsive elements
    const menu = await page.$('[class*="mobile"]') || await page.$('[class*="hamburger"]');
    results.hasResponsiveMenu = !!menu;

    const grid = await page.$('[class*="grid-cols"]');
    results.hasGridLayout = !!grid;

    return results;
  }
}
