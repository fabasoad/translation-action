import ProviderBase from './ProviderBase';

type MicrosoftResponse = { translations: { text: string }[] }[];

export default class MicrosoftProvider extends ProviderBase {
  private apiKey: string;
  private addParam: string;

  constructor(apiKey: string, addParam: string) {
    super();
    this.apiKey = apiKey;
    this.addParam = addParam;
  }

  translate(text: string, lang: string): Promise<string[]> {
    const url: string = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`;
    return this.api<MicrosoftResponse>(url, {
      headers: {
        'ocp-apim-subscription-key': this.apiKey,
        'ocp-apim-subscription-region': this.addParam,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify([{
        Text: text
      }]),
    }).then((resp) => resp[0].translations.map((t) => t.text));
  }
}
