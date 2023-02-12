import ProviderBase from '../../providers/ProviderBase'
import DeeplProvider from '../../providers/DeeplProvider'

require('dotenv').config();

describe('DeeplProvider', () => {
  test('should get correct translation', async () => {
    const provider: ProviderBase =
      new DeeplProvider(process.env.DEEPL_API_KEY || '')
    const translations = await provider.translate('Poem', 'en-uk')
    expect(translations.length).toEqual(1)
    expect(translations[0]).toEqual('Вірш')
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
