import LinguaToolsProvider from '../../providers/LinguaToolsProvider'
import ProviderBase from '../../providers/ProviderBase'

describe('LinguaToolsProvider', () => {
  test.skip('should get correct translation', async () => {
    const provider: ProviderBase = new LinguaToolsProvider()
    const translations = await provider.translate('Evening', 'en-de')
    expect(translations.length).toEqual(1)
    expect(translations[0]).toEqual('Abend')
  })

  test.skip('should fail because of invalid lang', async () => {
    const provider: ProviderBase = new LinguaToolsProvider()
    try {
      await provider.translate('Evening', 'abc123')
    } catch (e) {
      if ((<any>e).status && (<any>e).status === 404) {
        throw e
      }
      expect(e).toBeTruthy()
      return
    }
    throw new Error('Request should fail due to unknown lang')
  })
})
