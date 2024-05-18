import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 2,
  reporter: [['html', { outputFolder: 'tests/report', open: 'never' }]], //,[["line"], ["allure-playwright"]]
  /*Error: Cannot find module 'line allure-playwright'
Require stack:
- D:\git\playwright_ts\node_modules\playwright\lib\program.js
- D:\git\playwright_ts\node_modules\@playwright\test\cli.js
    at Module._resolveFilename (node:internal/modules/cjs/loader:1145:15)
    at Function.resolve (node:internal/modules/helpers:190:19)
    at resolveReporter (D:\git\playwright_ts\node_modules\playwright\lib\program.js:321:18)
    at D:\git\playwright_ts\node_modules\playwright\lib\program.js:315:40
    at Array.map (<anonymous>)
    at resolveReporterOption (D:\git\playwright_ts\node_modules\playwright\lib\program.js:315:30)
    at overridesFromOptions (D:\git\playwright_ts\node_modules\playwright\lib\program.js:274:15)
    at runTests (D:\git\playwright_ts\node_modules\playwright\lib\program.js:171:24)
    at async t.<anonymous> (D:\git\playwright_ts\node_modules\playwright\lib\program.js:54:7) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'D:\\git\\playwright_ts\\node_modules\\playwright\\lib\\program.js',
    'D:\\git\\playwright_ts\\node_modules\\@playwright\\test\\cli.js'
  ]
}*/
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
