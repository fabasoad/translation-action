import GoogleProvider from '../../providers/GoogleProvider';
import { translate } from 'google-translate-api-x';
import fetch from 'cross-fetch';

jest.mock('google-translate-api-x', () => ({
  translate: jest.fn(),
  googleTranslateApi: {},
}));
jest.mock('cross-fetch', () => jest.fn());

describe('GoogleProvider', () => {
  let provider: GoogleProvider;

  beforeEach(() => {
    provider = new GoogleProvider();
  })

  it('translates text using from and to language split by pipe', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    jest.mocked(translate).mockResolvedValue({ text: 'Bonjour' } as any);

    const result: string[] = await provider.translate('Hello', 'en|fr');

    expect(result).toEqual(['Bonjour']);
    expect(translate).toHaveBeenCalledWith('Hello', {
      from: 'en',
      to: 'fr',
      requestFunction: fetch,
    });
  })
})
