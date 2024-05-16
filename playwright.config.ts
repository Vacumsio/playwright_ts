import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 2,
  reporter: [['html', { outputFolder: 'tests/report', open: 'never' }]],
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
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ]
});
