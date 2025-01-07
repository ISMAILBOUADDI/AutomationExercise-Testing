import { test, expect } from '@playwright/test';

test('Contact Us Form', async ({ page }) => {
  try {
    await page.goto('http://automationexercise.com');
    await expect(page.locator('.logo.pull-left')).toBeVisible();
    
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.click('a[href="/contact_us"]')
    ]);
    
    const contactHeader = page.locator('div.contact-form h2.title');
    await expect(contactHeader).toBeVisible();
    await expect(contactHeader).toHaveText('Get In Touch');
    
    await page.fill('input[data-qa="name"]', 'Test User');
    await page.fill('input[data-qa="email"]', 'test@example.com');
    await page.fill('input[data-qa="subject"]', 'Test Contact Form');
    await page.fill('textarea[data-qa="message"]', 'This is a test message for the contact form.');
    
    await page.locator('input[name="upload_file"]').setInputFiles({
      name: 'test-upload.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('This is a test file for upload')
    });
    
    page.once('dialog', dialog => dialog.accept());
    await page.click('input[data-qa="submit-button"]');
    
    const successMessage = page.locator('.status.alert.alert-success');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('Success! Your details have been submitted successfully.');
    
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.click('a[href="/"]')
    ]);
    
    await expect(page.locator('.logo.pull-left')).toBeVisible();
    
  } catch (error) {
    console.error('Contact form submission failed:', error);
    await page.screenshot({ path: 'contact-error.png' });
    throw error;
  }
});