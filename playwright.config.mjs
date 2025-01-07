// playwright.config.mjs
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome', // Uses your installed Chrome
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 30000,
        navigationTimeout: 30000,
        ignoreHTTPSErrors: true,
        launchOptions: {
          executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Path to your Chrome
          args: ['--start-maximized'] // Start with maximized window
        }
      },
    }
  ],
  timeout: 60000,
  expect: {
    timeout: 30000
  },
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://automationexercise.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on'
  },
});