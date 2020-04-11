require('dotenv').config();

const { assert } = require('chai');
const itParam = require('mocha-param');

const fixture = [{
    title: 'Microsoft',
    name: 'microsoft',
    apiKey: process.env.MICROSOFT_API_KEY,
    lang: 'bs'
}, {
    title: 'Yandex',
    name: 'yandex',
    apiKey: process.env.YANDEX_API_KEY,
    lang: 'en-ru'
}, {
    title: 'MyMemory (Registered)',
    name: 'mymemory',
    apiKey: process.env.MYMEMORY_API_KEY,
    lang: 'en|it'
}, {
    title: 'MyMemory (Free)',
    name: 'mymemory',
    apiKey: null,
    lang: 'en|de'
}];

describe('Provider tests', () => {
    itParam('${value.title} should get correct translation', fixture, async (arg) => {
        const translate = require(`../src/providers/${arg.name}`);
        const translations = await translate(arg.apiKey, 'Hello', arg.lang);
        assert(translations.length > 0);
    });

    itParam('${value.title} should fail because of invalid lang', fixture, async (arg) => {
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