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
        console.log(node);
      }

      page.close();
    } catch (error) {
      console.log(error);
    }
  }
}
