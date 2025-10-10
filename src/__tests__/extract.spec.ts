import path from 'node:path';
import extract from '../extract';

describe('extract', () => {
  test('should extract text', () => {
    const text = 'some text';
    expect(extract(text)).toEqual(text);
  });

  test('should extract file content', () => {
    expect(extract(path.join(__dirname, 'text.txt')))
      .toEqual('Simple text for translation.');
  });
});
