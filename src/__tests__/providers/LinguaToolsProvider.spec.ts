import LinguaToolsProvider from '../../providers/LinguaToolsProvider'
import ProviderTester from './ProviderTester'

describe('LinguaToolsProvider', () => {
  let providerTester: ProviderTester

  beforeAll(() => {
    providerTester = new ProviderTester(
      new LinguaToolsProvider()
    )
  })

  test.skip(
    'should get correct translation',
    async () => providerTester.positive()
  )

  test.skip(
    'should fail because of invalid lang',
    async () => providerTester.negative()
  )
})
