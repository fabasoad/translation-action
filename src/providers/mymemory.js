const got = require('got');

module.exports = (apiKey, text, lang) => {
  const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${lang}`;
  return got(url + (apiKey ? `&key=${apiKey}` : '')).then(({ body }) => {
    const { matches } = JSON.parse(body);
    matches.sort((a, b) => a.match > b.match ? 1 : -1);
    return matches.map(({ translation }) => translation);
  });
};
