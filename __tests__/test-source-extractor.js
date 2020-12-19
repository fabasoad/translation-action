const { assert } = require('chai');
const path = require('path');

const sourceExtract = require('../src/source-extractor');

describe('Source extractor test', () => {
  it('should extract text', () => {
    const text = 'some text';
    assert.equal(sourceExtract(text), text);
  });

  it('should extract file content', () => {
    assert.equal(
      sourceExtract(path.join(__dirname, 'text.txt')),
      'Simple text for translation.'
    );
  });
});
