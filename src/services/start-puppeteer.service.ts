import puppeteer, { Page } from 'puppeteer';

class StartPuppeteerService {
  constructor() {}

  public async start(url: string): Promise<Page | string> {
    return new Promise(async (resolve, reject) => {
      const browser = await puppeteer.launch({
        headless: false,
      });

      const page = await browser.newPage();
      const allPages = await browser.pages();
      allPages[0].close();
      await page.goto(url);

      if (!page) {
        return reject('configuração não corresponde');
      }

      return resolve(page);
    });
  }
}

export const startPuppeteerService = new StartPuppeteerService();
