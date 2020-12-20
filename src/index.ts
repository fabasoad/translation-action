import * as core from '@actions/core';
import extract from './extract';
import FunTranslationsProvider from './providers/FunTranslationsProvider';
import LinguaToolsProvider from './providers/LinguaToolsProvider';
import MicrosoftProvider from './providers/MicrosoftProvider';
import MyMemoryProvider from './providers/MyMemoryProvider';
import ProviderBase, { ProviderError } from './providers/ProviderBase';
import YandexProvider from './providers/YandexProvider';

type ProviderType =
  'funtranslations' | 'linguatools' | 'microsoft' | 'mymemory' | 'yandex';

const getProvider = (): ProviderBase => {
  const provider: ProviderType = core.getInput('provider') as ProviderType;
  switch (provider) {
  case 'funtranslations':
    return new FunTranslationsProvider();
  case 'linguatools':
    return new LinguaToolsProvider();
  case 'microsoft':
    return new MicrosoftProvider(
      core.getInput('api_key'), core.getInput('api_additional_parameter'));
  case 'mymemory':
    return new MyMemoryProvider(core.getInput('api_key'));
  case 'yandex':
    return new YandexProvider(core.getInput('api_key'));
  default:
    throw new Error(`${provider} is not supported`);
  }
}

async function run() {
  try {
    const source: string = extract(core.getInput('source'));
    const provider: ProviderBase = getProvider();
    let text: string;
    try {
      text = (await provider.translate(source, core.getInput('lang')))[0];
    } catch (e) {
      if (e instanceof ProviderError) {
        text = source;
      } else {
        throw e;
      }
    }
    core.setOutput('text', text);
  } catch (e) {
    core.setFailed((<Error>e).message);
  }
}

run();
