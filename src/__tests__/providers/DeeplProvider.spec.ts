import DeeplProvider from '../../providers/DeeplProvider'
import { config } from 'dotenv'
import ProviderTester from './ProviderTester';

config()

describe('DeeplProvider', () => {
  let providerTester: ProviderTester

  beforeAll(() => {
    providerTester = new ProviderTester(
      new DeeplProvider(process.env.DEEPL_API_KEY || '')
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
