import { join, dirname } from 'node:path';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class Index {
  data() {
    return {
      layout: 'page',
      alternativeFilePath: '/README.md',
      templateEngineOverride: '11ty.js,md',
    };
  }

  render() {
    return readFileSync(join(__dirname, '../../README.md'));
  }
}
