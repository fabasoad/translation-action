import DeeplProvider from '../../providers/DeeplProvider';
import { Translator } from 'deepl-node';

jest.mock('deepl-node', () => ({
  Translator: jest.fn(),
}))

describe('DeeplProvider', () => {
  let mockTranslateText: jest.Mock;
  let provider: DeeplProvider;

  beforeEach(() => {
    mockTranslateText = jest.fn();
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    jest.mocked(Translator).mockImplementation(() => ({ translateText: mockTranslateText }) as any);
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
