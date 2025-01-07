import { test, expect } from '@playwright/test';

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
  try {
    console.log('Navigating to website...');
    await page.goto('http://automationexercise.com');
    
    await expect(page.locator('.features_items')).toBeVisible();
    console.log('Home page verified');
    
    await page.click('a[href="/test_cases"]');
    await page.waitForLoadState('networkidle');
    console.log('Clicked Test Cases button');
    
    await expect(page.url()).toContain('/test_cases');
    await expect(page.locator('h2.title')).toContainText('Test Cases');
    console.log('Test Cases page verified');
    
  } catch (error) {
    console.error('Test Case 7 failed:', error);
    await page.screenshot({ path: `error-test-case7-${Date.now()}.png` });
    throw error;
  }
});