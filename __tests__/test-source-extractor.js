const assert = require('chai').assert;
const fs = require('fs');

const sourceExtract = require('../src/source-extractor');

describe('Source extractor test', () => {
    it('should extract text', () => {
        const text = 'some text';
        assert.equal(sourceExtract(text), text);
    });

    it('should extract file content', () => {
        const text = 'some text';
        fs.writeFileSync('abc123.txt', text);
        try {
            assert.equal(sourceExtract('abc123.txt'), text);
        } finally {
            fs.unlinkSync('abc123.txt');
        }
    });
});