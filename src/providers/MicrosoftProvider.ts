import ProviderBase from './ProviderBase';

type MicrosoftResponse = { translations: { text: string }[] }[];

export default class MicrosoftProvider extends ProviderBase {
  private readonly apiKey: string;
  private readonly addParam: string;

  constructor(apiKey: string, addParam: string) {
    super('https://api.cognitive.microsofttranslator.com');
    this.apiKey = apiKey;
    this.addParam = addParam;
  }

  translate(text: string, lang: string): Promise<string[]> {
    const url: string = `/translate?api-version=3.0&to=${lang}`;
    return this.api<MicrosoftResponse>({
      url,
      headers: {
        'ocp-apim-subscription-key': this.apiKey,
        'ocp-apim-subscription-region': this.addParam,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: { Text: text }
    }).then((resp) => resp[0].translations.map((t) => t.text));
  }
}
