import type ProviderBase from '../../providers/ProviderBase'
import { ProviderError } from '../../providers/ProviderBase'

type NegativeOptions = {
  lang: string
  text: string
}

type PositiveOptions = NegativeOptions & {
  expected: string
}

export default class ProviderTester {
  private readonly provider: ProviderBase

  constructor(provider: ProviderBase) {
    this.provider = provider
  }

  async positive({ text, lang, expected }: PositiveOptions = {
    text: 'Poem',
    lang: 'en-uk',
    expected: 'Вірш'
  }): Promise<void> {
    try {
      const translations: string[] = await this.provider.translate(text, lang)
      expect(translations.length).toBeGreaterThan(0)
      expect(translations[0]).toEqual(expected)
    } catch (e: unknown) {
      let sc: number
      if (e instanceof ProviderError) {
        sc = (<ProviderError>e).status
      } else {
        const { statusCode } = e as never
        sc = statusCode
      }
      if (sc !== 429) {
        throw e
      }
    }
  }

  async negative({ text, lang }: NegativeOptions = {
    text: 'Anything',
    lang: 'en-abc123'
  }): Promise<void> {
    try {
      await this.provider.translate(text, lang)
    } catch (e) {
      expect(e).toBeTruthy()
      return
    }
    throw new Error('Request should fail due to unknown target language')
  }
}
