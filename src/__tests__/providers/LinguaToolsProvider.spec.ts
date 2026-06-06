import { vi, describe, it, expect, beforeEach } from 'vitest';
import LinguaToolsProvider from '../../providers/LinguaToolsProvider';
import { RestClient } from 'typed-rest-client/RestClient';

vi.mock('typed-rest-client/RestClient', () => ({
  RestClient: vi.fn(),
}))

describe('LinguaToolsProvider', () => {
  let mockGet: ReturnType<typeof vi.fn>;
  let provider: LinguaToolsProvider;

  beforeEach(() => {
    mockGet = vi.fn();
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    vi.mocked(RestClient).mockImplementation((() => ({ get: mockGet, create: vi.fn() })) as any);
    provider = new LinguaToolsProvider();
  })

  it('translates and returns results sorted by frequency ascending', async () => {
    mockGet.mockResolvedValue({
      statusCode: 200,
      result: [
        { freq: 10, l1_text: 'high' },
        { freq: 1, l1_text: 'low' },
        { freq: 5, l1_text: 'mid' },
      ],
    });

    const result: string[] = await provider.translate('hello', 'en|de');

    expect(result).toEqual(['low', 'mid', 'high']);
    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining('en|de'),
      expect.anything(),
    );
  })

  it('builds correct query url', async () => {
    mockGet.mockResolvedValue({ statusCode: 200, result: [{ freq: 1, l1_text: 'hola' }] });

    await provider.translate('hello', 'en|es');

    expect(mockGet).toHaveBeenCalledWith('/?langpair=en|es&query=hello', expect.anything());
  })
})
