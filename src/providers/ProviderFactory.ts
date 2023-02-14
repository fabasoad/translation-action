import ProviderBase from './ProviderBase'
import FunTranslationsProvider from './FunTranslationsProvider'
import LinguaToolsProvider from './LinguaToolsProvider'
import MicrosoftProvider from './MicrosoftProvider'
import MyMemoryProvider from './MyMemoryProvider'
import DeeplProvider from './DeeplProvider'
import GoogleProvider from './GoogleProvider';

export type ProviderType =
  'deepl' |
  'google' |
  'funtranslations' |
  'linguatools' |
  'microsoft' |
  'mymemory'

export default class ProviderFactory {
  getProvider(
    type: ProviderType, apiKey: string, apiAdditionalParam: string
  ): ProviderBase {
    switch (type) {
    case 'deepl':
      return new DeeplProvider(apiKey)
    case 'google':
      return new GoogleProvider()
    case 'funtranslations':
      return new FunTranslationsProvider()
    case 'linguatools':
      return new LinguaToolsProvider()
    case 'microsoft':
      return new MicrosoftProvider(apiKey, apiAdditionalParam)
    case 'mymemory':
      return new MyMemoryProvider(apiKey)
    default:
      throw new Error(`${type} is not supported`)
    }
  }
}
