// node-fetch.ts
// Helps importing node-fetch based on https://github.com/node-fetch/node-fetch/issues/1279

import type fetch from 'node-fetch';
export { RequestInit } from 'node-fetch';

// eslint-disable-next-line no-eval
const fetchPromise: Promise<typeof fetch> = eval('import("node-fetch")')
  .then((mod: { default: typeof fetch }) => mod.default);
const exportedFetch: typeof fetch =
  (...args) => fetchPromise.then(fetch => fetch(...args));
export default exportedFetch;
