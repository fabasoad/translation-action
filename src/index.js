const core = require('@actions/core');
const sourceExtract = require('./source-extractor');

let waiting = true;

const handler = (err, res) => {
  if (err) {
    core.setFailed(err.message);
  } else {
    core.setOutput("text", res.text[0]);
  }
  waiting = false;
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
    translate(core.getInput('api_key'), source, core.getInput('lang')).then(handler);
    while (waiting) {      
    }
    break;
  default:
    handler({ message: `${provider} is not supported` });
    break;
}
