const fetch = require('node-fetch');

module.exports = (apiKey, text, lang, addParam) => {
  return fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`, {
    headers: {
      'ocp-apim-subscription-key': apiKey,
      'ocp-apim-subscription-region': addParam,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify([{
      Text: text
    }]),
  }).then((resp) => resp.json())
    .then((resp) => resp[0].translations.map((t) => t.text));
};
