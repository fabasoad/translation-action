import ProviderBase from './ProviderBase'
import { translate } from 'google-translate-api-x'

export default class GoogleProvider extends ProviderBase {
  constructor() {
    super()
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const [from, to]: string[] = lang.split('-')
    const result = await translate<string>(text, { from, to })
    return Promise.resolve([result.text])
  }
}
