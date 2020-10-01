require('dotenv').config();

const { assert } = require('chai');
const itParam = require('mocha-param');

const fixture = [{
    title: 'Linguatools',
    name: 'linguatools',
    apiKey: null,
    lang: 'en-de'
}, /* {
    title: 'Microsoft',
    name: 'microsoft',
    apiKey: process.env.MICROSOFT_API_KEY,
    addParam: 'canadacentral',
    lang: 'nl'
}, */ {
    title: 'MyMemory (Free)',
    name: 'mymemory',
    apiKey: null,
    lang: 'en|pt'
}, {
    title: 'MyMemory (Registered)',
    name: 'mymemory',
    apiKey: process.env.MYMEMORY_API_KEY,
    lang: 'en|it'
}, {
    title: 'Yandex',
    name: 'yandex',
    apiKey: process.env.YANDEX_API_KEY,
    lang: 'en-tr'
}];

describe('Provider tests', () => {
    itParam('${value.title} should get correct translation', fixture, async (arg) => {
        const translate = require(`../src/providers/${arg.name}`);
        try {
            const translations = await translate(arg.apiKey, 'Evening', arg.lang, arg.addParam);
            assert(translations.length > 0);
        } catch ({ message }) {
            if (message === 'Maximum daily translated text volume exceeded') {
                console.warn(`[${arg.title}] ${message}`);
            } else {
                assert.fail(message);
            }
        }
    });

    itParam('${value.title} should fail because of invalid lang', fixture, async (arg) => {
        const translate = require(`../src/providers/${arg.name}`);
        try {
            await translate(arg.apiKey, 'Evening', 'abc123', arg.addParam);
        } catch (e) {
            assert.isNotNull(e);
            return;
        }
        assert.Throw();
    });
});