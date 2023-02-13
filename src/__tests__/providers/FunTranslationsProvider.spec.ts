import FunTranslationsProvider from '../../providers/FunTranslationsProvider'
import ProviderBase, { ProviderError } from '../../providers/ProviderBase'

describe('FunTranslationsProvider', () => {
  test('should get correct translation', async () => {
    const provider: ProviderBase = new FunTranslationsProvider()
    try {
      const translations = await provider.translate('Evening', 'vulcan')
      expect(translations.length).toEqual(1)
      expect(translations[0]).toEqual('Khru')
    } catch (e: unknown) {
      if (!(e instanceof ProviderError)) {
        const { statusCode } = e as never
        if (statusCode !== 429) {
          throw e
        }
      }
    }
  })

  test('should fail because of invalid lang', async () => {
    const provider: ProviderBase = new FunTranslationsProvider()
    try {
      await provider.translate('Evening', 'abc123')
    } catch (e) {
      expect(e).toBeTruthy()
      return
    }
    fail()
  })
})
