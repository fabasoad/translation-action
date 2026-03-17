import ProviderBase from './ProviderBase';

type MicrosoftResponse = { translations: { text: string }[] }

export default class MicrosoftProvider extends ProviderBase {
  private readonly apiKey: string;
  private readonly region: string;

  constructor(apiKey: string, region: string) {
    super('https://api.cognitive.microsofttranslator.com');
    this.apiKey = apiKey;
    this.region = region;
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const url = `/translate?api-version=3.0&to=${lang}`;
    const response: MicrosoftResponse[] = await this.api<MicrosoftResponse[]>({
      url,
      headers: {
        'ocp-apim-subscription-key': this.apiKey,
        'ocp-apim-subscription-region': this.region,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: { Text: text },
    });
    return response[0].translations.map(({ text }) => text);
  }
}
