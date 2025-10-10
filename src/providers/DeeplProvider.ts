import ProviderBase from './ProviderBase'
import {
  type SourceLanguageCode,
  type TargetLanguageCode,
  type TextResult,
  Translator
} from 'deepl-node'

export default class DeeplProvider extends ProviderBase {
  private translator: Translator

  constructor(apiKey: string) {
    super()
    this.translator = new Translator(apiKey)
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const l: string[] = lang.split('-')
    const result: TextResult = await this.translator.translateText<string>(
      text, l[0] as SourceLanguageCode, l[1] as TargetLanguageCode
    )
    return Promise.resolve([result.text])
  }
}
