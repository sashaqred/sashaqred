const { join } = require('path');
const { readFileSync } = require('fs');

class Index {
  data() {
    return {
      layout: 'page',
      alternativeFilePath: '/README_ru.md',
      templateEngineOverride: '11ty.js,md',
    };
  }

  render() {
    return readFileSync(join(__dirname, '../../README_ru.md'));
  }
}

module.exports = Index;
