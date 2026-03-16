import ProviderBase from './ProviderBase';
import {
  TranslateClient,
  TranslateTextCommand,
  TranslateTextCommandOutput,
} from '@aws-sdk/client-translate';

export default class AwsProvider extends ProviderBase {
  private readonly translator: TranslateClient;

  constructor(apiKey: string, addParam: string) {
    super();
    const [accessKeyId, secretAccessKey] = apiKey.split('|');
    this.translator = new TranslateClient({
      region: addParam,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  async translate(text: string, lang: string): Promise<string[]> {
    const l: string[] = lang.split('-')
    const command = new TranslateTextCommand({
      Text: text,
      SourceLanguageCode: l[0],
      TargetLanguageCode: l[1],
    });
    const { TranslatedText }: TranslateTextCommandOutput = await this.translator.send(command);
    return [TranslatedText as string];
  }
}
