import { test, expect } from '@playwright/test';

test('Test Case 4: Login and Logout User', async ({ page }) => {
  try {
    console.log('Navigating to website...');
    await page.goto('http://automationexercise.com');
    
    await expect(page.locator('.features_items')).toBeVisible();
    console.log('Home page verified');
    
    await page.click('a[href="/login"]');
    await page.waitForLoadState('networkidle');
    console.log('Clicked login button');
    
    await expect(page.locator('div.login-form h2')).toHaveText('Login to your account');
    console.log('Login form visible');
    
    await page.fill('input[data-qa="login-email"]', 'test50058544@example.com');
    await page.fill('input[data-qa="login-password"]', 'test123');
    console.log('Entered login credentials');
    
    await page.click('button[data-qa="login-button"]');
    await page.waitForLoadState('networkidle');
    console.log('Clicked login button');
    
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();
    console.log('Verified logged in status');
    
    await page.click('a[href="/logout"]');
    await page.waitForLoadState('networkidle');
    console.log('Clicked logout button');
    
    await expect(page.locator('div.login-form h2')).toHaveText('Login to your account');
    console.log('Verified return to login page');
    
  } catch (error) {
    console.error('Test Case 4 failed:', error);
    await page.screenshot({ path: `error-test-case4-${Date.now()}.png` });
    throw error;
  }
});