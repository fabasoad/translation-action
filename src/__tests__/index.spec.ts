import { vi, describe, it, expect, beforeEach } from 'vitest';

const flushPromises = (): Promise<void> => new Promise((resolve) => setImmediate(resolve));

describe('run', () => {
  beforeEach(() => {
    vi.resetModules();
  })

  it('translates text and sets output', async () => {
    const mockSetOutput = vi.fn();
    const mockSetFailed = vi.fn();
    const mockTranslate = vi.fn().mockResolvedValue(['translated text']);

    vi.doMock('@actions/core', () => ({
      getInput: vi.fn().mockReturnValue('test'),
      setOutput: mockSetOutput,
      setFailed: mockSetFailed,
    }));
    vi.doMock('../extract', () => ({
      default: vi.fn().mockReturnValue('source text'),
    }));
    vi.doMock('../providers/ProviderFactory', () => ({
      default: vi.fn().mockImplementation(() => ({ getProvider: vi.fn().mockReturnValue({ translate: mockTranslate }) })),
    }));
    vi.doMock('../providers/ProviderBase', async () => vi.importActual('../providers/ProviderBase'));

    await import('../index');
    await flushPromises();

    expect(mockSetOutput).toHaveBeenCalledWith('text', 'translated text');
  })

  it('sets output to source text when ProviderError is thrown', async () => {
    vi.doMock('../providers/ProviderBase', async () => vi.importActual('../providers/ProviderBase'));
    const { ProviderError } = await vi.importActual('../providers/ProviderBase') as typeof import('../providers/ProviderBase');

    const mockSetOutput = vi.fn();
    const mockSetFailed = vi.fn();
    const mockTranslate = vi.fn().mockRejectedValue(new ProviderError(429, 'Rate limited'));

    vi.doMock('@actions/core', () => ({
      getInput: vi.fn().mockReturnValue('test'),
      setOutput: mockSetOutput,
      setFailed: mockSetFailed,
    }));
    vi.doMock('../extract', () => ({
      default: vi.fn().mockReturnValue('source text'),
    }));
    vi.doMock('../providers/ProviderFactory', () => ({
      default: vi.fn().mockImplementation(() => ({ getProvider: vi.fn().mockReturnValue({ translate: mockTranslate }) })),
    }));

    await import('../index');
    await flushPromises();

    expect(mockSetOutput).toHaveBeenCalledWith('text', 'source text');
  })

  it('calls setFailed when a non-ProviderError is thrown from translate', async () => {
    const mockSetFailed = vi.fn();
    const mockTranslate = vi.fn().mockRejectedValue(new Error('Network error'));

    vi.doMock('@actions/core', () => ({
      getInput: vi.fn().mockReturnValue('test'),
      setOutput: vi.fn(),
      setFailed: mockSetFailed,
    }));
    vi.doMock('../extract', () => ({
      default: vi.fn().mockReturnValue('source text'),
    }));
    vi.doMock('../providers/ProviderFactory', () => ({
      default: vi.fn().mockImplementation(() => ({ getProvider: vi.fn().mockReturnValue({ translate: mockTranslate }) })),
    }));
    vi.doMock('../providers/ProviderBase', async () => vi.importActual('../providers/ProviderBase'));

    await import('../index');
    await flushPromises();

    expect(mockSetFailed).toHaveBeenCalledWith('Network error');
  })

  it('calls setFailed when getProvider throws', async () => {
    const mockSetFailed = vi.fn();

    vi.doMock('@actions/core', () => ({
      getInput: vi.fn().mockReturnValue('test'),
      setOutput: vi.fn(),
      setFailed: mockSetFailed,
    }));
    vi.doMock('../extract', () => ({
      default: vi.fn().mockReturnValue('source text'),
    }));
    vi.doMock('../providers/ProviderFactory', () => ({
      default: vi.fn().mockImplementation(() => ({
          getProvider: vi.fn().mockImplementation(() => {
            throw new Error('Unsupported provider');
          }),
        })),
    }))
    vi.doMock('../providers/ProviderBase', async () => vi.importActual('../providers/ProviderBase'));

    await import('../index');
    await flushPromises();

    expect(mockSetFailed).toHaveBeenCalledWith('Unsupported provider');
  })
})
