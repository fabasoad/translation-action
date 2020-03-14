const provider = require('yandex-translate');
module.exports = (apiKey, text, lang, callback) => {
    const translate = provider(apiKey);
    try {
        translate.translate(text, { to: lang }, callback);
    } catch (e) {
        callback(e);
    }
};
