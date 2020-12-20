import ProviderBase from './ProviderBase';

type MyMemoryResponse = { matches: { match: number, translation: string }[] };

export default class MyMemoryProvider extends ProviderBase {
  private apiKey: string | undefined;

  constructor(apiKey?: string) {
    super();
    this.apiKey = apiKey;
  }

  translate(text: string, lang: string): Promise<string[]> {
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${lang}`;
    url += (this.apiKey ? `&key=${this.apiKey}` : '');
    return this.api<MyMemoryResponse>(url).then(({ matches }) => {
      matches.sort((a, b) => a.match > b.match ? 1 : -1);
      return matches.map(({ translation }) => translation);
    });
  }
}
