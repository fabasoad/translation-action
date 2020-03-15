require('dotenv').config();
const assert = require('chai').assert;
const itParam = require('mocha-param');

const fixture = [{
    name: 'microsoft',
    apiKey: process.env.MICROSOFT_API_KEY,
    lang: 'bs',
    translate: require('../microsoft-provider')
}, {
    name: 'yandex',
    apiKey: process.env.YANDEX_API_KEY,
    lang: 'en-ru',
    translate: require('../yandex-provider')
}];

describe('Provider tests', () => {
    itParam('${value.name} should get correct translation', fixture, async (arg) => {
        const translations = await arg.translate(arg.apiKey, 'Hello', arg.lang);
        console.log(translations);
        assert(translations.length > 0);
    });

    itParam('${value.name} should fail because of invalid lang', fixture, async (arg) => {
        try {
            await arg.translate(arg.apiKey, 'Hello', 'abc123');
        } catch (e) {
            assert.isNotNull(e);
            return;
        }
        assert.Throw();
    });
});