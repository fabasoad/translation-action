import ProviderBase, {ProviderError} from '../../providers/ProviderBase'
import DeeplProvider from '../../providers/DeeplProvider'
import { config } from 'dotenv'
import FunTranslationsProvider from '../../providers/FunTranslationsProvider';

config()

describe('DeeplProvider', () => {
  test('should get correct translation', async () => {
    const provider: ProviderBase =
      new DeeplProvider(process.env.DEEPL_API_KEY || '')
    try {
      const translations = await provider.translate('Poem', 'en-uk')
      expect(translations.length).toEqual(1)
      expect(translations[0]).toEqual('Вірш')
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
  })

  test('should fail because of invalid lang', async () => {
    const provider: ProviderBase =
      new DeeplProvider(process.env.DEEPL_API_KEY || '')
    try {
      await provider.translate('Evening', 'en-abc123')
    } catch (e) {
      expect(e).toBeTruthy()
      return
    }
    throw new Error('Request should fail due to unknown target language')
  })
})
