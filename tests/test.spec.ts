import {test, expect} from '@playwright/test'
import { chromium } from 'playwright';
const playwright = require('playwright');

test.describe('Find video', async ()=>{
    

    test.beforeEach(async ({page, browser, context})=>{   
      // browser = await playwright.chromium.launch();
      // context = await browser.newContext();
      // page = await context.newPage();
      await page.goto('https://dzen.ru/');
    })

    // test.afterEach(async ({browser})=>{
    //   // await browser.close();
    // })

    test('Video feed, subscribe visible', async({page})=>{
        // for (let i = 0; i < 2; i++){
        // await page.keyboard.press("PageDown")};
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });
        await page.waitForSelector('[data-testid=long_video_floor]:nth-child(1) .floor-title__title-2v:has-text("Видео")');
        await page.locator('[data-testid=long_video_floor]:nth-child(1) .floor-title__title-2v:has-text("Видео")').scrollIntoViewIfNeeded();
        await page.hover('[data-testid=long_video_floor]:nth-child(1) .adaptive-card-grid__container-2l article:nth-child(2) > div:last-child');
        await expect(page.locator(
          '[data-testid=long_video_floor]:nth-child(1) .card-part-author__hover-10'))
          .toBeVisible()
    })

    test('Video feed, avatar visible', async({page})=>{
      // for (let i = 0; i < 2; i++){
      // await page.keyboard.press("PageDown")};
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForSelector('[data-testid=long_video_floor]:nth-child(1) .floor-title__title-2v:has-text("Видео")');
      await page.locator('[data-testid=long_video_floor]:nth-child(1) .floor-title__title-2v:has-text("Видео")').scrollIntoViewIfNeeded();
      await expect(page.locator(
        '[data-testid=long_video_floor]:nth-child(1) .adaptive-card-grid__container-2l article:nth-child(2) > div:last-child .avatar__avatar-10'))
        .toBeVisible()
    })

    test('Video feed, has content', async({page})=>{
      // await page.keyboard.press("PageDown")
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await page.waitForSelector('[data-testid=long_video_floor]:nth-child(1) .floor-title__title-2v:has-text("Видео")');
      await page.locator('[data-testid=long_video_floor]:nth-child(1) .floor-title__title-2v:has-text("Видео")').scrollIntoViewIfNeeded();
      await expect(page.locator(
        '[data-testid=long_video_floor]:nth-child(1) .adaptive-card-grid__container-2l article:nth-child(2) > div:last-child .card-part-title__title-dF'))
        .toContainText(/./)
    })
    test('Play video, e2e',async ({page})=>{
      await page.locator('.desktop-layout-floors__leftColumn-2p a[href="/video"] li[aria-selected="false"]').click();
      await expect(page.locator(
        '.navigation-sidebar__container-TO a[href="/video"] li[aria-selected="true"]')).toBeVisible()

      await page.locator('.input-search__input-25[data-testid="search-input"]').fill("Синий трактор");
      await page.locator('.input-search__root-yl button[aria-label="Кнопка Найти"]').click();

      await page.locator('.feed__row:first-child .card-layer-video-view__player-block > a').click();
      expect(page.locator('.zen-ui-video-video-timeline__clickable-zone').waitFor({ state: 'hidden' })).toBeTruthy();
      await page.locator('.zen-ui-video-video-fullscreen-toggle').click();
    })

    test('Play video, goto, logo changed', async({page})=>{
      await page.locator('.desktop-layout-floors__leftColumn-2p a[href="/video"] li[aria-selected="false"]').click();
      await expect(page.locator('.navigation-sidebar__container-TO a[href="/video"] li[aria-selected="true"]')).toBeVisible()
    })

    test('Play video, search button visible',async ({page})=>{
      await page.locator('.desktop-layout-floors__leftColumn-2p a[href="/video"] li[aria-selected="false"]').click();

      await page.locator('.input-search__input-25[data-testid="search-input"]').fill("Синий трактор");
      expect(page.locator('.input-search__root-yl button[aria-label="Кнопка Найти"]')).toBeVisible()
    })

    test('Play video, wait for tabbar hidden',async ({page})=>{
      await page.locator('.desktop-layout-floors__leftColumn-2p a[href="/video"] li[aria-selected="false"]').click();

      await page.locator('.input-search__input-25[data-testid="search-input"]').fill("Синий трактор");
      await page.locator('.input-search__root-yl button[aria-label="Кнопка Найти"]').click();

      await page.locator('.feed__row:first-child .card-layer-video-view__player-block > a').click();
      expect(page.locator('.zen-ui-video-video-timeline__clickable-zone').waitFor({ state: 'hidden' })).toBeTruthy();
    })
    test('Play video, fullscreen',async ({page})=>{
      await page.locator('.desktop-layout-floors__leftColumn-2p a[href="/video"] li[aria-selected="false"]').click();

      await page.locator('.input-search__input-25[data-testid="search-input"]').fill("Синий трактор");
      await page.locator('.input-search__root-yl button[aria-label="Кнопка Найти"]').click();

      await page.locator('.feed__row:first-child .card-layer-video-view__player-block > a').click();
      await page.locator('.zen-ui-video-video-fullscreen-toggle').click();
      expect(page).toHaveScreenshot();
    })
})