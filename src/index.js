const core = require('@actions/core');
const sourceExtract = require('./source-extractor');

const handler = (err, res) => {
  if (err) {
    core.setFailed(err.message);
  } else {
    core.setOutput("text", res.text);
  }
}; 

const provider = core.getInput('provider');
switch (provider) {
  case 'yandex':
    const translate = require('./yandex-provider');
    let source;
    try {
      source = sourceExtract(core.getInput('source'));
    } catch (e) {
      handler(e);
    }
    translate(core.getInput('api_key'), source, core.getInput('lang'), handler);
    break;
  default:
    handler({ message: `${provider} is not supported` });
    break;
}
