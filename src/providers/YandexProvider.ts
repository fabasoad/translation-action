import provider from 'yandex-translate';
import ProviderBase from './ProviderBase';

export default class YandexProvider extends ProviderBase {
  private apiKey: string;

  constructor(apiKey: string) {
    super();
    this.apiKey = apiKey;
  }

  translate(text: string, lang: string): Promise<string[]> {
    const translate = provider(this.apiKey);
    return new Promise((resolve, reject) => {
      try {
        translate.translate(text, { to: lang }, (err, res) => {
          if (err) {
            reject(err);
          } else if (res.code === 200) {
            resolve(res.text);
          } else {
            reject(new Error(res.message));
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
