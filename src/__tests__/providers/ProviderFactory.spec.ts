import ProviderFactory from '../../providers/ProviderFactory';
import AwsProvider from '../../providers/AwsProvider';
import DeeplProvider from '../../providers/DeeplProvider';
import GoogleProvider from '../../providers/GoogleProvider';
import FunTranslationsProvider from '../../providers/FunTranslationsProvider';
import LibreTranslateProvider from '../../providers/LibreTranslateProvider';
import LinguaToolsProvider from '../../providers/LinguaToolsProvider';
import MicrosoftProvider from '../../providers/MicrosoftProvider';
import MyMemoryProvider from '../../providers/MyMemoryProvider';

jest.mock('../../providers/AwsProvider');
jest.mock('../../providers/DeeplProvider');
jest.mock('../../providers/GoogleProvider');
jest.mock('../../providers/FunTranslationsProvider');
jest.mock('../../providers/LibreTranslateProvider');
jest.mock('../../providers/LinguaToolsProvider');
jest.mock('../../providers/MicrosoftProvider');
jest.mock('../../providers/MyMemoryProvider');

describe('ProviderFactory', () => {
  let factory: ProviderFactory;

  beforeEach(() => {
    factory = new ProviderFactory();
  })

  it('creates AwsProvider with apiKey and addParam', () => {
    factory.getProvider('aws', 'id|secret', 'us-east-1');
    expect(AwsProvider).toHaveBeenCalledWith('id|secret', 'us-east-1');
  })

  it('creates DeeplProvider with apiKey', () => {
    factory.getProvider('deepl', 'deepl-key', '');
    expect(DeeplProvider).toHaveBeenCalledWith('deepl-key');
  })

  it('creates GoogleProvider with no args', () => {
    factory.getProvider('google', '', '');
    expect(GoogleProvider).toHaveBeenCalled();
  })

  it('creates FunTranslationsProvider with apiKey', () => {
    factory.getProvider('funtranslations', 'fun-key', '');
    expect(FunTranslationsProvider).toHaveBeenCalledWith('fun-key');
  })

  it('creates LibreTranslateProvider with apiKey', () => {
    factory.getProvider('libretranslate', 'libre-key', '');
    expect(LibreTranslateProvider).toHaveBeenCalledWith('libre-key');
  })

  it('creates LinguaToolsProvider with no args', () => {
    factory.getProvider('linguatools', '', '');
    expect(LinguaToolsProvider).toHaveBeenCalled();
  })

  it('creates MicrosoftProvider with apiKey and addParam', () => {
    factory.getProvider('microsoft', 'ms-key', 'westus');
    expect(MicrosoftProvider).toHaveBeenCalledWith('ms-key', 'westus');
  })

  it('creates MyMemoryProvider with apiKey', () => {
    factory.getProvider('mymemory', 'mm-key', '');
    expect(MyMemoryProvider).toHaveBeenCalledWith('mm-key');
  })

  it('throws for unsupported provider type', () => {
    // biome-ignore lint/suspicious/noExplicitAny: Need to test unsupported value
    expect(() => factory.getProvider('unknown' as any, '', '')).toThrow('unknown is not supported');
  })
})
