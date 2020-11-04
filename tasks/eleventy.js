const { spawn } = require('child_process');
const { resolve } = require('path');
const { src, dest, watch, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const { processCss, watchCss } = require('./style');

const eleventySourcePath = resolve(__dirname, '../src/**/*');
const eleventySourceIgnorePath = resolve(__dirname, '../src/styles/**');
const eleventyDistPath = resolve(__dirname, '../_eleventy');
const eleventyOutputPath = resolve(__dirname, '../dist');

function cleanEleventy() {
  return src([eleventyDistPath, eleventyOutputPath], { allowEmpty: true }).pipe(
    clean({ force: true }),
  );
}

function copyEleventy() {
  return src(eleventySourcePath, { ignore: eleventySourceIgnorePath }).pipe(dest(eleventyDistPath));
}

function watchEleventy() {
  return watch([eleventySourcePath], series(copyEleventy));
}

const buildEleventy = series(cleanEleventy, processCss, copyEleventy, () =>
  spawn('eleventy', [], {
    shell: true,
    stdio: 'inherit',
  }),
);

exports.eleventyBuild = buildEleventy;

exports.eleventyServe = series(
  cleanEleventy,
  buildEleventy,
  parallel(watchCss, watchEleventy, () =>
    spawn('eleventy', ['--serve'], {
      shell: true,
      stdio: 'inherit',
    }),
  ),
);
