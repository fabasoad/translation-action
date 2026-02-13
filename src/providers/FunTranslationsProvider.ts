import ProviderBase from './ProviderBase'

type FunTranslationsResponse =
  { success: { total: number } | undefined, contents: { translated: string } }

export default class FunTranslationsProvider extends ProviderBase {
  private readonly apiKey: string

  constructor(apiKey: string) {
    super('https://api.funtranslations.com')
    this.apiKey = apiKey
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const url = `/translate/${lang}`
    const { success, contents }: FunTranslationsResponse =
      await this.api<FunTranslationsResponse>({
        url,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        data: { text },
      })
    if (success && success.total > 0) {
      return [contents.translated]
    }
    console.warn(
      'Result is either not success or doesn\'t have any translations')
    return [text]
  }
}
