import ProviderBase from './ProviderBase'
import { googleTranslateApi, translate } from 'google-translate-api-x'
import fetch from 'cross-fetch'
import TranslationResponse = googleTranslateApi.TranslationResponse

export default class GoogleProvider extends ProviderBase {
  constructor() {
    super()
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const [from, to]: string[] = lang.split('-')
    const response: TranslationResponse = await translate<string>(text, {
      from, to, requestFunction: fetch
    })
    return [response.text]
  }
}
