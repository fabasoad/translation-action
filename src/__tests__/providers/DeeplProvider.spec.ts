import { vi, describe, it, expect, beforeEach } from 'vitest';
import DeeplProvider from '../../providers/DeeplProvider';
import { Translator } from 'deepl-node';

vi.mock('deepl-node', () => ({
  Translator: vi.fn(),
}))

describe('DeeplProvider', () => {
  let mockTranslateText: ReturnType<typeof vi.fn>;
  let provider: DeeplProvider;

  beforeEach(() => {
    mockTranslateText = vi.fn();
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    vi.mocked(Translator).mockImplementation((() => ({ translateText: mockTranslateText })) as any);
    provider = new DeeplProvider('test-api-key');
  })

  it('translates text using source and target language split by dash', async () => {
    mockTranslateText.mockResolvedValue({ text: 'Hallo' });

    const result: string[] = await provider.translate('Hello', 'en-DE');

    expect(result).toEqual(['Hallo']);
    expect(mockTranslateText).toHaveBeenCalledWith('Hello', 'en', 'DE');
  })

  it('constructs Translator with the provided api key', () => {
    expect(Translator).toHaveBeenCalledWith('test-api-key');
  })
})
