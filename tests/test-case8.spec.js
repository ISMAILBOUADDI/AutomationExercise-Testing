import { test, expect } from '@playwright/test';

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
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
    await expect(page.locator('.features_items')).toBeVisible();
    console.log('Products page verified');
    
    const products = page.locator('.features_items .product-image-wrapper');
    const productCount = await products.count();
    console.log(`Found ${productCount} products`);
    expect(productCount).toBeGreaterThan(0);
    
    const firstProduct = products.first();
    await firstProduct.scrollIntoViewIfNeeded();
    
    const viewProductButton = firstProduct.locator('a[href*="product_details"]').first();
    await viewProductButton.click();
    await page.waitForLoadState('networkidle');
    console.log('Clicked view product on first product');
    
    const productInfo = page.locator('.product-information');
    await expect(productInfo).toBeVisible();
    console.log('Product detail page loaded');
  
    const verificationTasks = [
      {
        name: 'Product Name',
        locator: productInfo.locator('h2').first(),
      },
      {
        name: 'Category',
        locator: productInfo.locator('p').filter({ hasText: 'Category:' }).first(),
      },
      {
        name: 'Price',
        locator: productInfo.locator('span').filter({ hasText: /^Rs\. \d+$/ }).first(),
      },
      {
        name: 'Availability',
        locator: productInfo.locator('p').filter({ hasText: 'Availability:' }).first(),
      },
      {
        name: 'Condition',
        locator: productInfo.locator('p').filter({ hasText: 'Condition:' }).first(),
      },
      {
        name: 'Brand',
        locator: productInfo.locator('p').filter({ hasText: 'Brand:' }).first(),
      }
    ];

    for (const task of verificationTasks) {
      await expect(task.locator).toBeVisible();
      const text = await task.locator.textContent();
      console.log(`${task.name}: ${text?.trim()}`);
    }
    
    console.log('All product details verified successfully');
    
  } catch (error) {
    console.error('Test Case 8 failed:', error);
    await page.screenshot({ path: `error-test-case8-${Date.now()}.png`, fullPage: true });
    throw error;
  }
});