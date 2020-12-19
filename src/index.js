const core = require('@actions/core');
const sourceExtract = require('./source-extractor');

const SUPPORTED_PROVIDERS =
  ['linguatools', 'microsoft', 'mymemory', 'yandex', 'funtranslations'];

async function run() {
  const provider = core.getInput('provider');
  if (SUPPORTED_PROVIDERS.includes(provider)) {
    const translate = require(`./providers/${provider}`);
    try {
      const source = sourceExtract(core.getInput('source'));
      const translations = await translate(
        core.getInput('api_key'),
        source,
        core.getInput('lang'),
        core.getInput('api_additional_parameter')
      );
      core.setOutput('text', translations[0]);
    } catch (e) {
      core.setFailed(e.message);
    }
  } else {
    core.setFailed(`${provider} is not supported`);
  }
}

run();
