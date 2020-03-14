const provider = require('yandex-translate');
module.exports = (apiKey, text, lang) => {
    const translate = provider(apiKey);
    return new Promise(resolve => {        
        try {
            translate.translate(text, { to: lang }, (err, res) => {
                resolve({ err, res });
            });
        } catch (err) {
            resolve({ err })
        }
    });
};
