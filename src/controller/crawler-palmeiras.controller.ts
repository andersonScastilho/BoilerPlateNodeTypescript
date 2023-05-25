import { startPuppeteerService } from 'services/start-puppeteer.service';

export class CrawlerPalmeirasController {
  constructor() {}

  public async init() {
    try {
      const page = await startPuppeteerService.start(
        'https://www.palmeiras.com.br/central-de-midia/noticias/',
      );

      const selector = '.central-de-midia-container .items-central';

      await page.waitForSelector(selector);

      const nodes = await page.$$(selector);
      const payload: Array<{ link: string; titulo: string; date: string }> = [];

      for (const node of nodes) {
        const link = await page.evaluate((el: Element) => {
          return el.querySelector('a')?.getAttribute('href');
        }, node);

        const titulo = await page.evaluate((el: Element) => {
          return el.querySelector('a .items-central-txt h4')?.textContent;
        }, node);

        const date = await page.evaluate((el: Element) => {
          return el.querySelector('a .items-central-date')?.textContent;
        }, node);

        if (!link || !titulo || !date) {
          throw new Error('Esses item não são validos');
        }

        payload.push({
          link,
          titulo,
          date,
        });
      }

      console.log(payload);
      page.close();
    } catch (error) {
      console.log(error);
    }
  }
}
