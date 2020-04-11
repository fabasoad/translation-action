require('dotenv').config();
const assert = require('chai').assert;
const itParam = require('mocha-param');

const fixture = [{
    name: 'microsoft',
    apiKey: process.env.MICROSOFT_API_KEY,
    lang: 'bs'
}, {
    name: 'yandex',
    apiKey: process.env.YANDEX_API_KEY,
    lang: 'en-ru'
}, {
    name: 'mymemory',
    apiKey: process.env.MYMEMORY_API_KEY,
    lang: 'en|it'
}];

describe('Provider tests', () => {
    itParam('${value.name} should get correct translation', fixture, async (arg) => {
        const translate = require(`../src/providers/${arg.name}`);
        const translations = await translate(arg.apiKey, 'Hello', arg.lang);
        assert(translations.length > 0);
    });

    itParam('${value.name} should fail because of invalid lang', fixture, async (arg) => {
        const translate = require(`../src/providers/${arg.name}`);
        try {
            await translate(arg.apiKey, 'Hello', 'abc123');
        } catch (e) {
            assert.isNotNull(e);
            return;
        }
        assert.Throw();
    });
});