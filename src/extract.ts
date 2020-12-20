import fs from 'fs';

const extract = (source: string): string =>
  fs.existsSync(source) ? fs.readFileSync(source, 'utf-8') : source;

export default extract;
