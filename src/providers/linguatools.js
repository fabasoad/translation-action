const got = require('got');

module.exports = (apiKey, text, lang) => {
  const url = `https://lt-translate-test.herokuapp.com/?langpair=${lang}&query=${text}`;
  return got(url).then(({ body }) => {
    const translations = JSON.parse(body);
    translations.sort((a, b) => a.freq > b.freq ? 1 : -1);
    return translations.map(({ l1_text }) => l1_text);
  });
};