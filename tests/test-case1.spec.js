import { test, expect } from '@playwright/test';
import { testUser } from './fixtures';

test('Test Case 1: Register User', async ({ page }) => {
  try {
    console.log('Attempting to navigate to website...');
    await page.goto('http://automationexercise.com', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    
    await expect(page.locator('.features_items')).toBeVisible({
      timeout: 20000
    });
    console.log('Home page verified');
    
    await page.getByRole('link', { name: ' Signup / Login'}).click();
    await page.waitForLoadState('domcontentloaded');
    console.log('Clicked signup/login button');
    
    await expect(page.locator('div.signup-form h2')).toHaveText('New User Signup!');
    console.log('Signup form visible');
    
    await page.fill('input[data-qa="signup-name"]', testUser.name);
    await page.fill('input[data-qa="signup-email"]', testUser.email);
    console.log('Filled signup details');
    
    const signupPromise = page.waitForResponse(response => 
      response.url().includes('/signup') && response.status() === 200
    );
    await page.click('button[data-qa="signup-button"]');
    await signupPromise;
    await page.waitForLoadState('domcontentloaded');
    console.log('Clicked signup button');
    
    await expect(page.getByText('Enter Account Information')).toBeVisible();
    console.log('Account information form visible');
  
    await page.check('#id_gender1');
    await page.fill('input[data-qa="password"]', testUser.password);
    await page.selectOption('select[data-qa="days"]', '1');
    await page.selectOption('select[data-qa="months"]', '1');
    await page.selectOption('select[data-qa="years"]', '2000');
    console.log('Filled account details');
    
    await page.check('#newsletter');
    await page.check('#optin');
    console.log('Selected checkboxes');
    
    await page.fill('input[data-qa="first_name"]', 'Test');
    await page.fill('input[data-qa="last_name"]', 'User');
    await page.fill('input[data-qa="company"]', 'Test Company');
    await page.fill('input[data-qa="address"]', '123 Test St');
    await page.fill('input[data-qa="address2"]', 'Apt 456');
    await page.selectOption('select[data-qa="country"]', 'United States');
    await page.fill('input[data-qa="state"]', 'California');
    await page.fill('input[data-qa="city"]', 'Test City');
    await page.fill('input[data-qa="zipcode"]', '12345');
    await page.fill('input[data-qa="mobile_number"]', '1234567890');
    console.log('Filled address information');
    
    await page.click('button[data-qa="create-account"]');
    await page.waitForLoadState('networkidle');
    console.log('Clicked create account');
    
    await expect(page.getByText('Account Created!')).toBeVisible();
    console.log('Account created confirmation visible');
    
    await page.click('a[data-qa="continue-button"]');
    await page.waitForLoadState('networkidle');
    console.log('Clicked continue');
    
    
    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({
      timeout: 20000
    });
    console.log('Logged in confirmation visible');
    
    const deleteAccountPromise = page.waitForResponse(response => 
      response.url().includes('/delete_account') && response.status() === 200
    );
    await page.click('a[href="/delete_account"]');
    await deleteAccountPromise;
    await page.waitForLoadState('domcontentloaded');
    console.log('Clicked delete account');
    
    await expect(page.getByText('Account Deleted!')).toBeVisible({
      timeout: 20000
    });
    console.log('Account deletion confirmed');
    
  } catch (error) {
    console.error('Test Case 1 failed:', error);
    await page.screenshot({ path: `error-${Date.now()}.png` });
    throw error;
  }
});