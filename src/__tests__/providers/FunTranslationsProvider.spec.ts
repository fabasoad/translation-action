import FunTranslationsProvider from '../../providers/FunTranslationsProvider'
import { RestClient } from 'typed-rest-client/RestClient'

jest.mock('typed-rest-client/RestClient', () => ({
  RestClient: jest.fn(),
}))

describe('FunTranslationsProvider', () => {
  let mockCreate: jest.Mock;
  let provider: FunTranslationsProvider;

  beforeEach(() => {
    mockCreate = jest.fn();
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    jest.mocked(RestClient).mockImplementation(() => ({ get: jest.fn(), create: mockCreate }) as any);
    provider = new FunTranslationsProvider('fun-api-key');
  })

  it('returns translated text when success.total > 0', async () => {
    mockCreate.mockResolvedValue({
      statusCode: 200,
      result: { success: { total: 1 }, contents: { translated: 'Yo ho ho' } },
    });

    const result: string[] = await provider.translate('Hello', 'pirate');

    expect(result).toEqual(['Yo ho ho']);
  })

  it('returns original text when success is undefined', async () => {
    const warnSpy = jest.spyOn(console, 'warn')
      .mockImplementation(() => { /* intentional empty block */ });
    mockCreate.mockResolvedValue({
      statusCode: 200,
      result: { success: undefined, contents: { translated: '' } },
    });

    const result: string[] = await provider.translate('Hello', 'pirate');

    expect(result).toEqual(['Hello']);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  })

  it('returns original text when success.total is 0', async () => {
    const warnSpy = jest.spyOn(console, 'warn')
      .mockImplementation(() => { /* intentional empty block */ });
    mockCreate.mockResolvedValue({
      statusCode: 200,
      result: { success: { total: 0 }, contents: { translated: '' } },
    });

    const result: string[] = await provider.translate('Hello', 'pirate');

    expect(result).toEqual(['Hello']);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  })

  it('sends correct url, headers and body', async () => {
    mockCreate.mockResolvedValue({
      statusCode: 200,
      result: { success: { total: 1 }, contents: { translated: 'result' } },
    });

    await provider.translate('Hello', 'minion');

    expect(mockCreate).toHaveBeenCalledWith(
      '/translate/minion',
      { text: 'Hello' },
      {
        additionalHeaders: {
          Authorization: 'Bearer fun-api-key',
          'Content-Type': 'application/json',
        },
      }
    );
  })
})
