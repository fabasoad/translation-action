const core = require('@actions/core');
const sourceExtract = require('./source-extractor');

async function run() {
  const provider = core.getInput('provider');
  let translate;
  switch (provider) {
    case 'microsoft':
      translate = require('./providers/microsoft');
      break;
    case 'yandex':
      translate = require('./providers/yandex');
      break;
    default:
      core.setFailed(`${provider} is not supported`);
      return;
  }
  try {
    const source = sourceExtract(core.getInput('source'));
    const translations = await translate(core.getInput('api_key'), source, core.getInput('lang'));
    core.setOutput('text', translations[0]);
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();