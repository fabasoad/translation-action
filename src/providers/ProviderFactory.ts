import ProviderBase from './ProviderBase'
import FunTranslationsProvider from './FunTranslationsProvider'
import LinguaToolsProvider from './LinguaToolsProvider'
import MicrosoftProvider from './MicrosoftProvider'
import MyMemoryProvider from './MyMemoryProvider'
import YandexProvider from './YandexProvider'
import DeeplProvider from './DeeplProvider';

export type ProviderType =
  'deepl' |
  'funtranslations' |
  'linguatools' |
  'microsoft' |
  'mymemory' |
  'yandex'

export default class ProviderFactory {
  getProvider(
    type: ProviderType, apiKey: string, apiAdditionalParam: string
  ): ProviderBase {
    switch (type) {
    case 'deepl':
      return new DeeplProvider(apiKey)
    case 'funtranslations':
      return new FunTranslationsProvider()
    case 'linguatools':
      return new LinguaToolsProvider()
    case 'microsoft':
      return new MicrosoftProvider(apiKey, apiAdditionalParam)
    case 'mymemory':
      return new MyMemoryProvider(apiKey)
    case 'yandex':
      return new YandexProvider(apiKey)
    default:
      throw new Error(`${type} is not supported`)
    }
  }
}
