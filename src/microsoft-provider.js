const MsTextTranslator = require('microsoft-text-translator').MsTextTranslator;
module.exports = (apiKey, text, lang) => {
    const translator = new MsTextTranslator({ credentials: { subscriptionKey: apiKey } });
    return translator.translate([{ text }], { to: lang }).then(resp => resp[0].translations.map(t => t.text));
};