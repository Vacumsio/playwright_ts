import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from "allure-playwright/dist/testplan";

export default defineConfig({
  testDir: './tests',
  retries: 2,
  reporter: [["line"], ["allure-playwright"]],
  grep: testPlanFilter(),
  // reporter: [['html', { outputFolder: 'tests/report', open: 'never' }]],
  use: {
    launchOptions: {
      timeout: 0,
      args: ['--start-maximized'],
    },
    headless: true,
    trace: 'on-first-retry',
  },
  expect: {
    toHaveScreenshot: {  maxDiffPixelRatio: 0.25 },
  },
  projects: [
    {
      name: 'Google Chrome',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        viewport: { width: 1920, height: 1080 },
        ignoreHTTPSErrors: true,
      },
    },
  ]
});
