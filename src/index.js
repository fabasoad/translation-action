const core = require('@actions/core');
const sourceExtract = require('./source-extractor');

const handler = (err, res) => {
  if (err) {
    core.setFailed(err.message);
  } else {
    core.setOutput("text", res.text[0]);
  }
};

async function run() {
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
      const resp = await translate(core.getInput('api_key'), source, core.getInput('lang'));
      handler(resp.err, resp.res);
      break;
    default:
      handler({ message: `${provider} is not supported` });
      break;
  }
}

run();