import { test, expect } from '@playwright/test';
import { testUser } from './fixtures';

test('Login User with correct credentials', async ({ page }) => {
  try {
    await page.goto('http://automationexercise.com');
    
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.click('a[href="/login"]')
    ]);
    
    const loginHeader = page.locator('div.login-form h2');
    await expect(loginHeader).toBeVisible();
    await expect(loginHeader).toHaveText('Login to your account');
    
    await page.fill('input[data-qa="login-email"]', testUser.email);
    await page.fill('input[data-qa="login-password"]', testUser.password);
    
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.click('button[data-qa="login-button"]')
    ]);
    
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({ timeout: 10000 });
    
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.click('a[href="/delete_account"]')
    ]);
  
    
  } catch (error) {
    console.error('Login failed:', error);
    await page.screenshot({ path: 'login-error.png' });
    throw error;
  }
});