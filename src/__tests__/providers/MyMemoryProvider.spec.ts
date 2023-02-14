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
        text: 'Evening', lang: 'en|pt', expected: 'NOITE'
      })
  )

  itParam<ProviderTesterWrapper>(
    '[${value.type}] should fail because of invalid lang',
    fixture,
    async ({ providerTester }: ProviderTesterWrapper) =>
      providerTester.negative()
  )

  // itParam<string | undefined>('should get correct translation',
  //   [undefined, process.env.MYMEMORY_API_KEY], async (apiKey) => {
  //     const provider: ProviderBase = new MyMemoryProvider(apiKey)
  //     const translations = await provider.translate('Evening', 'en|pt')
  //     expect(translations.length).toBeGreaterThan(0)
  //     expect(translations[0]).toEqual('NOITE')
  //   })
  //
  // test('should fail because of invalid lang', async () => {
  //   const provider: ProviderBase = new MyMemoryProvider()
  //   try {
  //     await provider.translate('Evening', 'abc123')
  //   } catch (e) {
  //     expect(e).toBeTruthy()
  //     return
  //   }
  //   fail()
  // })
})
