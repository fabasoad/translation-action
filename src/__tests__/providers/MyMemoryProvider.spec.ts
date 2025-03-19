import MyMemoryProvider from '../../providers/MyMemoryProvider'
import { config } from 'dotenv'
import ProviderTester from './ProviderTester'

config()

type ProviderTesterWrapper = {
  providerTester: ProviderTester,
  type: string
}

describe('MyMemoryProvider', () => {
  const fixture: ProviderTesterWrapper[] = [{
    providerTester: new ProviderTester(new MyMemoryProvider()),
    type: 'Free'
  }, {
    providerTester: new ProviderTester(
      new MyMemoryProvider(process.env.MYMEMORY_API_KEY)
    ),
    type: 'Registered'
  }]

  test.each(fixture)(
    '[$type] should get correct translation',
    ({ providerTester }: ProviderTesterWrapper) => providerTester.positive({
      text: 'Night', lang: 'en|be', expected: 'Ноч'
    })
  )

  test.each(fixture)(
    '[$type] should fail because of invalid lang',
    async ({ providerTester }: ProviderTesterWrapper) =>
      providerTester.negative()
  )
})
