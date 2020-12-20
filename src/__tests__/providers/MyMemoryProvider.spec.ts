import itParam from 'mocha-param';
import MyMemoryProvider from '../../providers/MyMemoryProvider';
import ProviderBase from '../../providers/ProviderBase';

require('dotenv').config();

describe('MyMemoryProvider', () => {
  itParam<string | undefined>('should get correct translation',
    [undefined, process.env.MYMEMORY_API_KEY], async (apiKey) => {
      const provider: ProviderBase = new MyMemoryProvider(apiKey);
      const translations = await provider.translate('Evening', 'en|pt');
      expect(translations.length).toBeGreaterThan(0);
      expect(translations[0]).toEqual('Boa noite!');
    });

  it('should fail because of invalid lang', async () => {
    const provider: ProviderBase = new MyMemoryProvider();
    try {
      await provider.translate('Evening', 'abc123');
    } catch (e) {
      expect(e).toBeTruthy();
      return;
    }
    fail();
  });
});
