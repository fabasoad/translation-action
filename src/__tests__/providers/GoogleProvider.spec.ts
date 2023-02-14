import GoogleProvider from '../../providers/GoogleProvider'
import ProviderTester from './ProviderTester'

describe('GoogleProvider', () => {
  let providerTester: ProviderTester

  beforeAll(() => {
    providerTester = new ProviderTester(
      new GoogleProvider()
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
