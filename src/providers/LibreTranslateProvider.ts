import ProviderBase from './ProviderBase'

/* eslint-disable camelcase */
type LibreTranslateResponse = { translatedText: string }

export default class LibreTranslateProvider extends ProviderBase {
  private apiKey: string

  constructor(apiKey: string) {
    super('https://libretranslate.com/translate')
    this.apiKey = apiKey
  }

  translate(text: string, lang: string): Promise<string[]> {
    const [source, target] = lang.split('-', 2)
    const data = {
      q: text,
      source,
      target,
      format: 'text',
      api_key: this.apiKey
    }
    return this.api<LibreTranslateResponse>({ data, url: '/', method: 'POST' })
      .then(({ translatedText }) => [translatedText])
  }
}
