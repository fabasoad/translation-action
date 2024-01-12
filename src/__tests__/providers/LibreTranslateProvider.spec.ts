import LibreTranslateProvider from '../../providers/LibreTranslateProvider'
import { config } from 'dotenv'
import ProviderTester from './ProviderTester'

config()

describe('LibreTranslateProvider', () => {
  let providerTester: ProviderTester

  beforeAll(() => {
    providerTester = new ProviderTester(
      new LibreTranslateProvider(process.env.LIBRETRANSLATE_API_KEY || '')
    )
  })

  test(
    'should get correct translation',
    async () => providerTester.positive()
  )

  test(
    'should fail because of invalid lang',
    async () => providerTester.negative()
  )
})
