import { test, expect } from '@playwright/test';

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
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
    
    await page.fill('input[data-qa="login-email"]', 'incorrect@example.com');
    await page.fill('input[data-qa="login-password"]', 'wrongpassword123');
    console.log('Entered incorrect credentials');
    
    await page.click('button[data-qa="login-button"]');
    await page.waitForLoadState('networkidle');
    console.log('Clicked login button');
    
    const errorMessage = page.locator('p[style*="color: red"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Your email or password is incorrect!');
    console.log('Error message verified');
    
  } catch (error) {
    console.error('Test Case 3 failed:', error);
    await page.screenshot({ path: `error-test-case3-${Date.now()}.png` });
    throw error;
  }
});