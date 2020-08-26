const { spawn } = require('child_process');

exports.eleventyBuild = function build() {
  return spawn('eleventy', [], {
    shell: true,
    stdio: 'inherit',
  });
};

exports.eleventyServe = function watch() {
  return spawn('eleventy', ['--serve'], {
    shell: true,
    stdio: 'inherit',
  });
};
