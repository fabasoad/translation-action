import ProviderBase from './ProviderBase';

type MyMemoryResponse = { matches: { match: number, translation: string }[] };

export default class MyMemoryProvider extends ProviderBase {
  private readonly apiKey: string | undefined;

  constructor(apiKey?: string) {
    super('https://api.mymemory.translated.net');
    this.apiKey = apiKey;
  }

  translate(text: string, lang: string): Promise<string[]> {
    let url = `/get?q=${text}&langpair=${lang}`;
    url += (this.apiKey ? `&key=${this.apiKey}` : '');
    return this.api<MyMemoryResponse>({ url, method: 'GET' })
      .then(({ matches }) => {
        matches.sort((a, b) => a.match > b.match ? 1 : -1);
        return matches.map(({ translation }) => translation);
      });
  }
}
