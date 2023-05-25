import { link } from 'fs';
import { startPuppeteerService } from 'services/start-puppeteer.service';

export class CrawlerCorinthiansController {
  constructor() {}
  public async init() {
    try {
      const page = await startPuppeteerService.start(
        'https://www.corinthians.com.br/noticias',
      );

      const selector = '.ct-news-list .ct-news-list-item';
      await page.waitForSelector(selector);

      const nodes = await page.$$(selector);
      const payload: Array<{ link: string; titulo: string; date: string }> = [];

      for (const node of nodes) {
        const link = await page.evaluate((el: Element) => {
          return el
            .querySelector('.ct-news-list-item-content a')
            ?.getAttribute('href');
        }, node);

        const titulo = await page.evaluate((el: Element) => {
          return el
            .querySelector('.ct-news-list-item-content a h4')
            ?.innerHTML.replace(/\n/g, '')
            .replace(/<p>.*?<\/p>/g, '')
            .trim();
        }, node);

        const date = await page.evaluate((el: Element) => {
          return el
            .querySelector('.ct-news-list-item-content a h4 p')
            ?.innerHTML.replace(/\n/g, '')
            .replace(/<strong>.*?<\/strong>/g, '')
            .replace(/-/g, '')
            .trim();
        }, node);
        if (!link || !titulo || !date) {
          throw new Error('Esses itens não são validos');
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
