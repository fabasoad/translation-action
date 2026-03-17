import MicrosoftProvider from '../../providers/MicrosoftProvider';
import { RestClient } from 'typed-rest-client/RestClient';

jest.mock('typed-rest-client/RestClient', () => ({
  RestClient: jest.fn(),
}));

describe('MicrosoftProvider', () => {
  let mockCreate: jest.Mock;
  let provider: MicrosoftProvider;

  beforeEach(() => {
    mockCreate = jest.fn();
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    jest.mocked(RestClient).mockImplementation(() => ({ get: jest.fn(), create: mockCreate }) as any);
    provider = new MicrosoftProvider('ms-api-key', 'westeurope');
  })

  it('translates text and returns all translation results', async () => {
    mockCreate.mockResolvedValue({
      statusCode: 200,
      result: [{ translations: [{ text: 'Bonjour' }, { text: 'Salut' }] }],
    });

    const result: string[] = await provider.translate('Hello', 'fr');

    expect(result).toEqual(['Bonjour', 'Salut']);
  })

  it('sends correct headers and url', async () => {
    mockCreate.mockResolvedValue({
      statusCode: 200,
      result: [{ translations: [{ text: 'Hola' }] }],
    });

    await provider.translate('Hello', 'es');

    expect(mockCreate).toHaveBeenCalledWith(
      '/translate?api-version=3.0&to=es',
      { Text: 'Hello' },
      {
        additionalHeaders: {
          'ocp-apim-subscription-key': 'ms-api-key',
          'ocp-apim-subscription-region': 'westeurope',
          'Content-Type': 'application/json',
        },
      },
    );
  })
})
