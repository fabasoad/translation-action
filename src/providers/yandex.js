const provider = require('yandex-translate');
module.exports = (apiKey, text, lang, addParam) => {
    const translate = provider(apiKey);
    return new Promise((resolve, reject) => {        
        try {
            translate.translate(text, { to: lang }, (err, res) => {
                if (err) {
                    reject(err);
                } else if (res.code === 200) {
                    resolve(res.text);
                } else {
                    reject({ message: res.message });
                }
            });
        } catch (err) {
            reject(err);
        }
    });
};
