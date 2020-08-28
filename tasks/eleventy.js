const { spawn } = require('child_process');
const { resolve } = require('path');
const { src, dest, watch, series, parallel } = require('gulp');
const { processCss, watchCss } = require('./style');

const eleventySourcePath = resolve(__dirname, '../src/**/*');
const eleventySourceIgnorePath = resolve(__dirname, '../src/styles/**');
const eleventyDistPath = resolve(__dirname, '../_eleventy');

function copyEleventy() {
  return src(eleventySourcePath, { ignore: eleventySourceIgnorePath }).pipe(dest(eleventyDistPath));
}

function watchEleventy() {
  return watch([eleventySourcePath], series(copyEleventy));
}

const buildEleventy = series(processCss, copyEleventy, () =>
  spawn('eleventy', [], {
    shell: true,
    stdio: 'inherit',
  }),
);

exports.eleventyBuild = buildEleventy;

exports.eleventyServe = series(
  buildEleventy,
  parallel(watchCss, watchEleventy, () =>
    spawn('eleventy', ['--serve'], {
      shell: true,
      stdio: 'inherit',
    }),
  ),
);
