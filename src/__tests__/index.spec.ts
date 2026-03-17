const flushPromises = (): Promise<void> => new Promise((resolve) => setImmediate(resolve));

describe('run', () => {
  beforeEach(() => {
    jest.resetModules();
  })

  it('translates text and sets output', async () => {
    const mockSetOutput = jest.fn();
    const mockSetFailed = jest.fn();
    const mockTranslate = jest.fn().mockResolvedValue(['translated text']);

    jest.doMock('@actions/core', () => ({
      getInput: jest.fn().mockReturnValue('test'),
      setOutput: mockSetOutput,
      setFailed: mockSetFailed,
    }));
    jest.doMock('../extract', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue('source text'),
    }));
    jest.doMock('../providers/ProviderFactory', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => ({
        getProvider: jest.fn().mockReturnValue({ translate: mockTranslate }),
      })),
    }));
    jest.doMock('../providers/ProviderBase', () => jest.requireActual('../providers/ProviderBase'));

    require('../index');
    await flushPromises();

    expect(mockSetOutput).toHaveBeenCalledWith('text', 'translated text');
  })

  it('sets output to source text when ProviderError is thrown', async () => {
    jest.doMock('../providers/ProviderBase', () => jest.requireActual('../providers/ProviderBase'));
    const { ProviderError } = require('../providers/ProviderBase');

    const mockSetOutput = jest.fn();
    const mockSetFailed = jest.fn();
    const mockTranslate = jest.fn().mockRejectedValue(new ProviderError(429, 'Rate limited'));

    jest.doMock('@actions/core', () => ({
      getInput: jest.fn().mockReturnValue('test'),
      setOutput: mockSetOutput,
      setFailed: mockSetFailed,
    }));
    jest.doMock('../extract', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue('source text'),
    }));
    jest.doMock('../providers/ProviderFactory', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => ({
        getProvider: jest.fn().mockReturnValue({ translate: mockTranslate }),
      })),
    }));

    require('../index');
    await flushPromises();

    expect(mockSetOutput).toHaveBeenCalledWith('text', 'source text');
  })

  it('calls setFailed when a non-ProviderError is thrown from translate', async () => {
    const mockSetFailed = jest.fn();
    const mockTranslate = jest.fn().mockRejectedValue(new Error('Network error'));

    jest.doMock('@actions/core', () => ({
      getInput: jest.fn().mockReturnValue('test'),
      setOutput: jest.fn(),
      setFailed: mockSetFailed,
    }));
    jest.doMock('../extract', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue('source text'),
    }));
    jest.doMock('../providers/ProviderFactory', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => ({
        getProvider: jest.fn().mockReturnValue({ translate: mockTranslate }),
      })),
    }));
    jest.doMock('../providers/ProviderBase', () => jest.requireActual('../providers/ProviderBase'));

    require('../index');
    await flushPromises();

    expect(mockSetFailed).toHaveBeenCalledWith('Network error');
  })

  it('calls setFailed when getProvider throws', async () => {
    const mockSetFailed = jest.fn();

    jest.doMock('@actions/core', () => ({
      getInput: jest.fn().mockReturnValue('test'),
      setOutput: jest.fn(),
      setFailed: mockSetFailed,
    }));
    jest.doMock('../extract', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue('source text'),
    }));
    jest.doMock('../providers/ProviderFactory', () => ({
      __esModule: true,
      default: jest.fn().mockImplementation(() => ({
        getProvider: jest.fn().mockImplementation(() => {
          throw new Error('Unsupported provider');
        }),
      })),
    }))
    jest.doMock('../providers/ProviderBase', () => jest.requireActual('../providers/ProviderBase'));

    require('../index');
    await flushPromises();

    expect(mockSetFailed).toHaveBeenCalledWith('Unsupported provider');
  })
})
