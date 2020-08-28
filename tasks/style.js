const { resolve } = require('path');
const { src, dest, watch, series } = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

const cssSourcePath = resolve(__dirname, '../src/styles/**/*.css');
const cssDistPath = resolve(__dirname, '../_eleventy/public/styles');

function processCss() {
  const plugins = [postcssPresetEnv, autoprefixer];
  return src(cssSourcePath).pipe(postcss(plugins)).pipe(dest(cssDistPath));
}

function watchCss() {
  return watch([cssSourcePath], series(processCss));
}

exports.processCss = processCss;

exports.watchCss = watchCss;
