import * as core from '@actions/core';
import extract from './extract';
import FunTranslationsProvider from './providers/FunTranslationsProvider';
import LinguaToolsProvider from './providers/LinguaToolsProvider';
import MicrosoftProvider from './providers/MicrosoftProvider';
import MyMemoryProvider from './providers/MyMemoryProvider';
import ProviderBase, { ProviderError } from './providers/ProviderBase';
import YandexProvider from './providers/YandexProvider';

async function run() {
  const provider: string = core.getInput('provider');
  try {
    const source: string = extract(core.getInput('source'));
    let p: ProviderBase;
    switch (provider) {
    case 'funtranslations':
      p = new FunTranslationsProvider();
    case 'linguatools':
      p = new LinguaToolsProvider();
      break;
    case 'microsoft':
      p = new MicrosoftProvider(
        core.getInput('api_key'), core.getInput('api_additional_parameter'));
      break;
    case 'mymemory':
      p = new MyMemoryProvider(core.getInput('api_key'));
      break;
    case 'yandex':
      p = new YandexProvider(core.getInput('api_key'));
    default:
      throw new Error(`${provider} is not supported`);
    }
    let translation: string;
    try {
      translation = (await p.translate(source, core.getInput('lang')))[0];
    } catch (e) {
      if (e instanceof ProviderError) {
        translation = source;
      } else {
        throw e;
      }
    }
    core.setOutput('text', translation);
  } catch (e) {
    core.setFailed((<Error>e).message);
  }
}

run();
