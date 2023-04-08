import itParam from 'mocha-param'
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

  itParam<ProviderTesterWrapper>(
    '[${value.type}] should get correct translation',
    fixture,
    async ({ providerTester }: ProviderTesterWrapper) =>
      providerTester.positive({
        text: 'Night', lang: 'en|be', expected: 'Ноч'
      })
  )

  itParam<ProviderTesterWrapper>(
    '[${value.type}] should fail because of invalid lang',
    fixture,
    async ({ providerTester }: ProviderTesterWrapper) =>
      providerTester.negative()
  )
})
