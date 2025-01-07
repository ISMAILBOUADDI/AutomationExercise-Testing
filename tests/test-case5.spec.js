import { test, expect } from '@playwright/test';

test('Test Case 5: Register User with existing email', async ({ page }) => {
  try {
    console.log('Navigating to website...');
    await page.goto('http://automationexercise.com');
    
    await expect(page.locator('.features_items')).toBeVisible();
    console.log('Home page verified');
    
    await page.click('a[href="/login"]');
    await page.waitForLoadState('networkidle');
    console.log('Clicked Signup/Login button');
    
    await expect(page.locator('div.signup-form h2')).toHaveText('New User Signup!');
    console.log('Signup form visible');
    
    await page.fill('input[data-qa="signup-name"]', 'Test User');
    //test@example.com already exist will use it for test
    await page.fill('input[data-qa="signup-email"]', 'test@example.com');
    console.log('Entered existing email');
    
    await page.click('button[data-qa="signup-button"]');
    await page.waitForLoadState('networkidle');
    console.log('Clicked signup button');
    
    const errorMessage = page.locator('p[style*="color: red"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Email Address already exist!');
    console.log('Error message verified');
    
  } catch (error) {
    console.error('Test Case 5 failed:', error);
    await page.screenshot({ path: `error-test-case5-${Date.now()}.png` });
    throw error;
  }
});