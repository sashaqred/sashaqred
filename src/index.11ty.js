const { join } = require('path');
const { readFileSync } = require('fs');

class Index {
  data() {
    return {
      layout: 'page',
      templateEngineOverride: '11ty.js,md',
    };
  }

  render() {
    return readFileSync(join(__dirname, '../README.md'));
  }
}

module.exports = Index;
