require('dotenv').config();

const { assert } = require('chai');
const itParam = require('mocha-param');

const fixture = [{
  title: 'Linguatools',
  name: 'linguatools',
  apiKey: null,
  lang: 'en-de'
}, {
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
  title: 'FunTranslations',
  name: 'funtranslations',
  apiKey: null,
  lang: 'vulcan'
}];

describe('Provider tests', () => {
  itParam('${value.title} should get correct translation',
    fixture, async (arg) => {
      const translate = require(`../src/providers/${arg.name}`);
      const translations =
        await translate(arg.apiKey, 'Evening', arg.lang, arg.addParam);
      assert.isTrue(translations.length > 0);
    });

  itParam('${value.title} should fail because of invalid lang',
    fixture, async (arg) => {
      const translate = require(`../src/providers/${arg.name}`);
      try {
        await translate(arg.apiKey, 'Evening', 'abc123', arg.addParam);
      } catch (e) {
        assert.isNotNull(e);
        return;
      }
      // eslint-disable-next-line new-cap
      assert.Throw();
    });
});
