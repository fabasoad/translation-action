import { vi, describe, it, expect, beforeEach } from 'vitest';
import LibreTranslateProvider from '../../providers/LibreTranslateProvider';
import { RestClient } from 'typed-rest-client/RestClient';

vi.mock('typed-rest-client/RestClient', () => ({
  RestClient: vi.fn(),
}))

describe('LibreTranslateProvider', () => {
  let mockCreate: ReturnType<typeof vi.fn>;
  let provider: LibreTranslateProvider;

  beforeEach(() => {
    mockCreate = vi.fn();
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    vi.mocked(RestClient).mockImplementation(class { get = vi.fn(); create = mockCreate; } as any);
    provider = new LibreTranslateProvider('libre-api-key');
  })

  it('translates text and returns result', async () => {
    mockCreate.mockResolvedValue({ statusCode: 200, result: { translatedText: 'Bonjour' } });

    const result: string[] = await provider.translate('Hello', 'en-fr');

    expect(result).toEqual(['Bonjour']);
  })

  it('sends correct data payload with source, target, format and api_key', async () => {
    mockCreate.mockResolvedValue({ statusCode: 200, result: { translatedText: 'Hola' } });

    await provider.translate('Hello', 'en-es');

    expect(mockCreate).toHaveBeenCalledWith(
      '/',
      { q: 'Hello', source: 'en', target: 'es', format: 'text', api_key: 'libre-api-key' }, // pragma: allowlist secret
      expect.anything(),
    );
  })
})
