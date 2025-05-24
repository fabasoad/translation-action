import ProviderBase from './ProviderBase';

/* eslint-disable camelcase */
type LinguaToolsResponse = { freq: number, l1_text: string }

export default class LinguaToolsProvider extends ProviderBase {
  constructor() {
    super('https://lt-translate-test.herokuapp.com')
  }

  translate(text: string, lang: string): Promise<string[]> {
    const url = `/?langpair=${lang}&query=${text}`
    return this.api<LinguaToolsResponse[]>({ url, method: 'GET' })
      .then((translations: LinguaToolsResponse[]) => {
        translations.sort((a: LinguaToolsResponse, b: LinguaToolsResponse) => a.freq > b.freq ? 1 : -1)
        return translations.map(({ l1_text }) => l1_text)
      })
  }
}
/* eslint-enable camelcase */
