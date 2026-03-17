import ProviderBase, { ProviderError, type ApiProps } from '../../providers/ProviderBase';
import { RestClient } from 'typed-rest-client/RestClient';

jest.mock('typed-rest-client/RestClient', () => ({
  RestClient: jest.fn(),
}));

class TestProvider extends ProviderBase {
  // biome-ignore lint/complexity/noUselessConstructor: Need to make ctor public
  constructor(baseUrl?: string) {
    super(baseUrl);
  }

  async translate(text: string, _lang: string): Promise<string[]> {
    return [text];
  }

  async testApi<T>(props: ApiProps): Promise<T> {
    return this.api<T>(props);
  }
}

describe('ProviderError', () => {
  it('stores status and message', () => {
    const error = new ProviderError(404, 'not found');

    expect(error.status).toBe(404);
    expect(error.message).toBe('not found');
    expect(error).toBeInstanceOf(Error);
  })
})

describe('ProviderBase.api()', () => {
  let mockGet: jest.Mock;
  let mockCreate: jest.Mock;
  let provider: TestProvider;

  beforeEach(() => {
    mockGet = jest.fn();
    mockCreate = jest.fn();
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    jest.mocked(RestClient).mockImplementation(() => ({ get: mockGet, create: mockCreate }) as any);
    provider = new TestProvider('https://example.com');
  })

  it('calls client.get for GET method', async () => {
    type TestResponse = { data: string }
    const expectedResponse: TestResponse = { data: 'test' };
    mockGet.mockResolvedValue({ statusCode: 200, result: expectedResponse });

    const result: TestResponse = await provider.testApi<TestResponse>({ url: '/test', method: 'GET' });

    expect(result).toEqual(expectedResponse);
    expect(mockGet).toHaveBeenCalledWith('/test', { additionalHeaders: undefined });
  })

  it('calls client.get and passes headers', async () => {
    mockGet.mockResolvedValue({ statusCode: 200, result: {} });

    await provider.testApi({ url: '/test', method: 'GET', headers: { Authorization: 'Bearer token' } });

    expect(mockGet).toHaveBeenCalledWith('/test', { additionalHeaders: { Authorization: 'Bearer token' } });
  })

  it('calls client.create for POST method', async () => {
    type TestResponse = { created: boolean }
    const expectedResponse: TestResponse = { created: true };
    mockCreate.mockResolvedValue({ statusCode: 201, result: expectedResponse });

    const result: TestResponse = await provider.testApi<TestResponse>({
      url: '/test',
      method: 'POST',
      data: { q: 'hello' },
    });

    expect(result).toEqual(expectedResponse);
    expect(mockCreate).toHaveBeenCalledWith('/test', { q: 'hello' }, { additionalHeaders: undefined });
  })

  it('throws ProviderError when statusCode < 200', async () => {
    mockGet.mockResolvedValue({ statusCode: 199, result: null });

    await expect(provider.testApi({ url: '/test', method: 'GET' })).rejects.toBeInstanceOf(ProviderError);
  })

  it('throws ProviderError when statusCode >= 400', async () => {
    mockGet.mockResolvedValue({ statusCode: 404, result: null });

    await expect(provider.testApi({ url: '/test', method: 'GET' })).rejects.toBeInstanceOf(ProviderError);
  })

  it('includes status code in ProviderError', async () => {
    mockGet.mockResolvedValue({ statusCode: 500, result: null });

    await expect(provider.testApi({ url: '/test', method: 'GET' })).rejects.toMatchObject({
      status: 500,
    });
  })

  it('returns result for 2xx status codes', async () => {
    mockGet.mockResolvedValue({ statusCode: 204, result: null });

    const result = await provider.testApi({ url: '/test', method: 'GET' });

    expect(result).toBeNull();
  })

  it('works without baseUrl', async () => {
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    jest.mocked(RestClient).mockImplementation(() => ({ get: mockGet, create: mockCreate }) as any);
    const noBaseProvider = new TestProvider();
    mockGet.mockResolvedValue({ statusCode: 200, result: 'ok' });

    const result = await noBaseProvider.testApi({ url: '/test', method: 'GET' });

    expect(result).toBe('ok');
  })
})
