import ProviderBase from './ProviderBase'
import { translate } from 'google-translate-api-x'
import fetch from 'cross-fetch'

export default class GoogleProvider extends ProviderBase {
  constructor() {
    super()
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const [from, to]: string[] = lang.split('-')
    return translate<string>(text, {
      from, to, requestFunction: fetch
    }).then(({ text }) => [text])
  }
}
