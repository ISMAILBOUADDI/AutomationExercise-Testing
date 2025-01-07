import { test, expect } from '@playwright/test';

test('Test Case 9: Search Product', async ({ page }) => {
  try {
    console.log('Navigating to website...');
    await page.goto('http://automationexercise.com');
    
    await expect(page.locator('.features_items')).toBeVisible();
    console.log('Home page verified');
    
    await Promise.all([
      page.waitForLoadState('networkidle'),
      page.click('a[href="/products"]')
    ]);
    console.log('Clicked Products button');
    
    await expect(page.url()).toContain('/products');
    await expect(page.locator('h2.title')).toContainText('All Products');
    console.log('Products page verified');
    
    const searchTerm = 'Blue Top';
    await page.fill('#search_product', searchTerm);
    await page.click('#submit_search');
    await page.waitForLoadState('networkidle');
    console.log(`Searched for product: ${searchTerm}`);
    
    await expect(page.locator('h2.title')).toContainText('Searched Products');
    console.log('Search results heading verified');
    
    const searchResults = page.locator('.features_items .product-image-wrapper');
    const resultCount = await searchResults.count();
    expect(resultCount).toBeGreaterThan(0);
    
    for (let i = 0; i < resultCount; i++) {
      const productName = await searchResults.nth(i).locator('.productinfo p').textContent();
      console.log(`Found product: ${productName}`);
      expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
    
    console.log(`Found ${resultCount} matching products`);
    
  } catch (error) {
    console.error('Test Case 9 failed:', error);
    await page.screenshot({ path: `error-test-case9-${Date.now()}.png`, fullPage: true });
    throw error;
  }
});