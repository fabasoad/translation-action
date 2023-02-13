import ProviderBase from '../../providers/ProviderBase'
import GoogleProvider from '../../providers/GoogleProvider'

describe('GoogleProvider', () => {
  test('should get correct translation', async () => {
    const provider: ProviderBase = new GoogleProvider()
    const translations = await provider.translate('Kemenangan', 'ms-en')
    expect(translations.length).toEqual(1)
    expect(translations[0]).toEqual('Victory')
  })

  test('should fail because of invalid lang', async () => {
    const provider: ProviderBase = new GoogleProvider()
    try {
      await provider.translate('Evening', 'en-abc123')
    } catch (e) {
      expect(e).toBeTruthy()
      return
    }
    throw new Error('Request should fail due to unknown target language')
  })
})
