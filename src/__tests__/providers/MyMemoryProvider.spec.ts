import { vi, describe, it, expect, beforeEach } from 'vitest';
import MyMemoryProvider from '../../providers/MyMemoryProvider';
import { RestClient } from 'typed-rest-client/RestClient';

vi.mock('typed-rest-client/RestClient', () => ({
  RestClient: vi.fn(),
}))

describe('MyMemoryProvider', () => {
  let mockGet: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGet = vi.fn();
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    vi.mocked(RestClient).mockImplementation((() => ({ get: mockGet, create: vi.fn() })) as any);
  })

  it('translates and returns results sorted by match descending', async () => {
    mockGet.mockResolvedValue({
      statusCode: 200,
      result: {
        matches: [
          { match: 0.5, translation: 'medium' },
          { match: 1.0, translation: 'best' },
          { match: 0.1, translation: 'worst' },
        ],
      },
    });
    const provider = new MyMemoryProvider('my-key');

    const result: string[] = await provider.translate('hello', 'en|fr');

    expect(result).toEqual(['best', 'medium', 'worst']);
  })

  it('includes api key in url when provided', async () => {
    mockGet.mockResolvedValue({ statusCode: 200, result: { matches: [] } });
    const provider = new MyMemoryProvider('my-key');

    await provider.translate('hello', 'en|fr');

    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining('&key=my-key'),
      expect.anything(),
    );
  })

  it('omits api key from url when not provided', async () => {
    mockGet.mockResolvedValue({ statusCode: 200, result: { matches: [] } });
    const provider = new MyMemoryProvider();

    await provider.translate('hello', 'en|fr');

    const calledUrl: string = mockGet.mock.calls[0][0];
    expect(calledUrl).not.toContain('&key=');
  })
})
