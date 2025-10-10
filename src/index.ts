import * as core from '@actions/core'
import extract from './extract'
import type ProviderBase from './providers/ProviderBase'
import { ProviderError } from './providers/ProviderBase'
import ProviderFactory, { type ProviderType } from './providers/ProviderFactory'

async function run() {
  try {
    const source: string = extract(core.getInput('source'))
    const providerFactory: ProviderFactory = new ProviderFactory()
    const provider: ProviderBase = providerFactory.getProvider(
      core.getInput('provider', { required: true, trimWhitespace: true }) as ProviderType,
      core.getInput('api_key', { required: false, trimWhitespace: true }),
      core.getInput('api_additional_parameter', { required: false, trimWhitespace: true })
    )
    let text: string
    try {
      text = (await provider.translate(source, core.getInput('lang')))[0]
    } catch (e) {
      if (e instanceof ProviderError) {
        text = source
      } else {
        throw e
      }
    }
    core.setOutput('text', text)
  } catch (e) {
    core.setFailed((<Error>e).message)
  }
}

run()
