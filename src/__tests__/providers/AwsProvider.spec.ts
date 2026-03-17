import AwsProvider from '../../providers/AwsProvider'
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate'

jest.mock('@aws-sdk/client-translate', () => ({
  TranslateClient: jest.fn(),
  TranslateTextCommand: jest.fn().mockImplementation((params) => params),
}))

describe('AwsProvider', () => {
  let mockSend: jest.Mock
  let provider: AwsProvider

  beforeEach(() => {
    mockSend = jest.fn()
    // biome-ignore lint/suspicious/noExplicitAny: Required for mocking
    jest.mocked(TranslateClient).mockImplementation(() => ({ send: mockSend }) as any)
    provider = new AwsProvider('accessKeyId|secretAccessKey', 'us-east-1')
  })

  it('translates text and returns result', async () => {
    mockSend.mockResolvedValue({ TranslatedText: 'Bonjour' })

    const result = await provider.translate('Hello', 'en-fr')

    expect(result).toEqual(['Bonjour'])
  })

  it('constructs TranslateClient with credentials parsed from apiKey and region', () => {
    expect(TranslateClient).toHaveBeenCalledWith({
      region: 'us-east-1',
      credentials: { accessKeyId: 'accessKeyId', secretAccessKey: 'secretAccessKey' }, // pragma: allowlist secret
    })
  })

  it('sends correct TranslateTextCommand with source and target language', async () => {
    mockSend.mockResolvedValue({ TranslatedText: 'Hola' })

    await provider.translate('Hello', 'en-es')

    expect(TranslateTextCommand).toHaveBeenCalledWith({
      Text: 'Hello',
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'es',
    })
  })
})
