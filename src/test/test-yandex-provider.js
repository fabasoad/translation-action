require('dotenv').config();
const assert = require('chai').assert;
const translate = require('../yandex-provider');

describe('Yandex Provider test', () => {
    it('should get correct translation', async () => {
        const resp = await translate(process.env.YANDEX_API_KEY, 'Hello', 'en-ru');
        assert(!resp.err);
        assert(resp.res.text.length === 1);
        assert(resp.res.text[0].length > 0);
    });

    it('should fail because of invalid lang', async () => {
        const resp = await translate(process.env.YANDEX_API_KEY, 'Hello', 'abc123');
        assert(!!resp.err);
        assert(resp.err.message.length > 0);
    });
});