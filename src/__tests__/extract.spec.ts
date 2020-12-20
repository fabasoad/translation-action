import path from 'path';
import extract from '../extract';

describe('extract', () => {
  it('should extract text', () => {
    const text = 'some text';
    expect(extract(text)).toEqual(text);
  });

  it('should extract file content', () => {
    expect(extract(path.join(__dirname, 'text.txt')))
      .toEqual('Simple text for translation.');
  });
});
