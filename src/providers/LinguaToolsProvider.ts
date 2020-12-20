/* eslint-disable camelcase */
import ProviderBase from './ProviderBase';

type LinguaToolsResponse = { freq: number, l1_text: string }[];

export default class LinguaToolsProvider extends ProviderBase {
  translate(text: string, lang: string): Promise<string[]> {
    const url: string =
      `https://lt-translate-test.herokuapp.com/?langpair=${lang}&query=${text}`;
    return this.api<LinguaToolsResponse>(url).then((translations) => {
      translations.sort((a, b) => a.freq > b.freq ? 1 : -1);
      return translations.map(({ l1_text }) => l1_text);
    });
  }
}
