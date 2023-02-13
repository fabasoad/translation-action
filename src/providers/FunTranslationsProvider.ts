import ProviderBase from './ProviderBase'

type FunTranslationsResponse =
  { success: { total: number } | undefined, contents: { translated: string } }

export default class FunTranslationsProvider extends ProviderBase {
  constructor() {
    super('https://api.funtranslations.com')
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const url = `/translate/${lang}.json?text=${text}`
    return this.api<FunTranslationsResponse>({ url, method: 'GET' })
      .then(({ success, contents }) => {
        if (success && success.total > 0) {
          return [contents.translated]
        }
        console.warn(
          'Result is either not success or doesn\'t have any translations')
        return [text]
      })
  }
}
