import { CrawlerCorinthiansController } from 'controller/crawler-corinthians.controller';
import { CrawlerPalmeirasController } from 'controller/crawler-palmeiras.controller';

class Init {
  constructor() {
    this._init();
  }
  private _init() {
    // new CrawlerPalmeirasController().init();
    new CrawlerCorinthiansController().init();
    console.log('inicializado com sucesso');
  }
}

new Init();
