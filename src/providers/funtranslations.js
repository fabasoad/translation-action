const got = require('got');

module.exports = (apiKey, text, lang, addParam) => {
  const url = `https://api.funtranslations.com/translate/${lang}.json?text=${text}`;
  return got(url).then(({ body }) => {
    const result = JSON.parse(body);
    if (result.success && result.success.total > 0) {
      return [result.contents.translated];
    }
    console.warn("Result is either not success or doesn't have any translations");
    return [text];
  }).catch(({ message }) => {
    if (message === 'Response code 429 (Too Many Requests)') {
      console.warn(message);
      return [text];
    }
    throw e;
  });
};