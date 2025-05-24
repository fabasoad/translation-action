import ProviderBase from './ProviderBase'

/* eslint-disable camelcase */
type LibreTranslateResponse = { translatedText: string }

export default class LibreTranslateProvider extends ProviderBase {
  private apiKey: string

  constructor(apiKey: string) {
    super('https://libretranslate.com/translate')
    this.apiKey = apiKey
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const [source, target] = lang.split('-', 2)
    const data = {
      q: text,
      source,
      target,
      format: 'text',
      api_key: this.apiKey
    }
    const { translatedText }: LibreTranslateResponse =
      await this.api<LibreTranslateResponse>({ data, url: '/', method: 'POST' })
    return [translatedText]
  }
}
