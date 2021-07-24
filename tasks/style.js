const { resolve } = require('path');
const { src, dest, watch, series } = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

const cssLibsPath = [resolve(__dirname, '../node_modules/prism-themes/themes/prism-nord.css')];
const cssSourcePath = resolve(__dirname, '../src/styles/**/*.css');
const cssDistPath = resolve(__dirname, '../_eleventy/public/styles');

const fontsFiles = [
  'variable.css',
  'variable-italic.css',
  'files/raleway-cyrillic-variable-wghtOnly-normal.woff2',
  'files/raleway-cyrillic-ext-variable-wghtOnly-normal.woff2',
  'files/raleway-latin-variable-wghtOnly-normal.woff2',
  'files/raleway-latin-ext-variable-wghtOnly-normal.woff2',
  'files/raleway-cyrillic-variable-wghtOnly-italic.woff2',
  'files/raleway-cyrillic-ext-variable-wghtOnly-italic.woff2',
  'files/raleway-latin-variable-wghtOnly-italic.woff2',
  'files/raleway-latin-ext-variable-wghtOnly-italic.woff2',
].join(',');
const fontsPath = resolve(__dirname, `../node_modules/@fontsource/raleway/{${fontsFiles}}`);
const fontsDistPath = resolve(cssDistPath + '/raleway');

function processCss() {
  const plugins = [postcssPresetEnv, autoprefixer];
  return src([...cssLibsPath, cssSourcePath])
    .pipe(postcss(plugins))
    .pipe(dest(cssDistPath));
}

function processFonts() {
  return src(fontsPath).pipe(dest(fontsDistPath));
}

const processStyles = series(processCss, processFonts);

function watchStyles() {
  return watch([cssSourcePath], series(processStyles));
}

exports.processCss = processCss;
exports.processFonts = processFonts;
exports.processStyles = processStyles;

exports.watchStyles = watchStyles;
