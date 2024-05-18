import {test, expect} from '@playwright/test'
import { chromium } from 'playwright';
const playwright = require('playwright');

test.describe('Find video', async ()=>{
    test.beforeEach(async ({page})=>{   
      await page.goto('https://dzen.ru/');
    })

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

    test('Play video, after goto logo changed', async({page})=>{
      await page.locator('.desktop-layout-floors__leftColumn-2p a[href="/video"] li[aria-selected="false"]').click();
      await expect(page.locator('.navigation-sidebar__container-TO a[href="/video"] li[aria-selected="true"]')).toBeVisible()
    })

    test('Play video, is playing',async ({page, context})=>{
      await page.locator('.desktop-layout-floors__leftColumn-2p a[href="/video"] li[aria-selected="false"]').click();
      await page.locator('.input-search__input-25[data-testid="search-input"]').click();
      await page.fill('.input-search__input-25[data-testid="search-input"]','Синий трактор');
      await page.keyboard.press('Enter');
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.dispatchEvent('.feed__row:first-child .card-layer-video-view__player-block > a', 'click')
      ]);//Flacked sometimes
      await newPage.locator('.zen-ui-video-video-player__control-toggle').click();      
      await newPage.waitForSelector('.zen-ui-video-video-timeline__episode-progress');
      const element = await newPage.locator('.zen-ui-video-video-timeline__episode-progress');
      const transform = await element.getAttribute('style');
      const reg = /(\d[^,]+)/;
      const match = transform.match(reg);
      const getTimeline = match.map(parseFloat);
      expect(getTimeline[0]).toBeLessThan(1);
    })
    test('Play video, toggle to fullscreen',async ({page, context})=>{
      await page.locator('.desktop-layout-floors__leftColumn-2p a[href="/video"] li[aria-selected="false"]').click();
      await page.locator('.input-search__input-25[data-testid="search-input"]').click();
      await page.fill('.input-search__input-25[data-testid="search-input"]','Синий трактор');
      await page.keyboard.press('Enter');
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.dispatchEvent('.feed__row:first-child .card-layer-video-view__player-block > a', 'click')
      ]);//Flacked sometimes
      await newPage.locator('.zen-ui-video-video-player__control-toggle').click();
      await newPage.locator('.zen-ui-video-video-fullscreen-toggle').click();
      await newPage.waitForSelector('.zen-ui-video-video-controls__fullscreen-close',{state: 'visible'})
      const fullscreen = await newPage.locator('.zen-ui-video-video-controls__fullscreen-close')
      expect(fullscreen).toBeVisible();
    })
})