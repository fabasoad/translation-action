import { vi, describe, it, expect, beforeEach } from 'vitest';
import GoogleProvider from '../../providers/GoogleProvider';
import { translate } from 'google-translate-api-x';
import fetch from 'cross-fetch';

vi.mock('google-translate-api-x', () => ({
  translate: vi.fn(),
  googleTranslateApi: {},
}));
vi.mock('cross-fetch', () => ({ default: vi.fn() }));

describe('GoogleProvider', () => {
  let provider: GoogleProvider;

  beforeEach(() => {
    provider = new GoogleProvider();
  })

  it('translates text using from and to language split by pipe', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    vi.mocked(translate).mockResolvedValue({ text: 'Bonjour' } as any);

    const result: string[] = await provider.translate('Hello', 'en|fr');

    expect(result).toEqual(['Bonjour']);
    expect(translate).toHaveBeenCalledWith('Hello', {
      from: 'en',
      to: 'fr',
      requestFunction: fetch,
    });
  })
})
