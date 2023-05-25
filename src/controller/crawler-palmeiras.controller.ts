import { startPuppeteerService } from 'services/start-puppeteer.service';

export class CrawlerPalmeirasController {
  constructor() {}

  public async init() {
    try {
      const page = await startPuppeteerService.start(
        'https://www.palmeiras.com.br/central-de-midia/noticias/',
      );
    } catch (error) {
      console.log(error);
    }
  }
}
