import FunTranslationsProvider from '../../providers/FunTranslationsProvider'
import ProviderTester from './ProviderTester'

describe('FunTranslationsProvider', () => {
  let providerTester: ProviderTester

  beforeAll(() => {
    providerTester = new ProviderTester(
      new FunTranslationsProvider()
    )
  })

  test(
    'should get correct translation',
    async () => providerTester.positive({
      text: 'Evening', lang: 'vulcan', expected: 'Khru'
    })
  )

  test(
    'should fail because of invalid lang',
    async () => providerTester.negative()
  )
})
