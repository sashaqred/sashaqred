const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const eleventyVitePlugin = require('@11ty/eleventy-plugin-vite');
const eleventyPluginToc = require('eleventy-plugin-toc');
const eleventyPluginTimeToRead = require('eleventy-plugin-time-to-read');
const i18n = require('eleventy-plugin-i18n');
const faviconPlugin = require('eleventy-favicon');
const autoprefixer = require('autoprefixer');
const date = require('./src/_filters/date');
const linkToSectionInstall = require('./src/_filters/link-to-section');
const langLink = require('./src/_filters/lang-link');
const filterBy = require('./src/_filters/filter-by');
const linkToGithub = require('./src/_filters/link-to-github');
const { toPathFilter } = require('./src/_filters/to-path');
const imageShortcode = require('./src/_shortcodes/image');
const md = require('./src/_markdown-it');
const translations = require('./src/i18n');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addPlugin(eleventyVitePlugin, {
    viteOptions: {
      css: {
        postcss: {
          plugins: [autoprefixer],
        },
      },
    },
  });
  eleventyConfig.addPlugin(eleventyHelmetPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyPluginToc);
  eleventyConfig.addPlugin(eleventyPluginTimeToRead, {
    speed: '275 words a minute',
  });
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en',
    },
  });
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(faviconPlugin, { destination: './dist/public' });
  eleventyConfig.addPassthroughCopy({
    './src/public': './public',
    './CNAME': './public/CNAME',

    './node_modules/prism-themes/themes/prism-nord.css': './public/styles/prism-nord.css',
    ...getFontGlobs(),
  });

  eleventyConfig.addFilter('date', date);
  eleventyConfig.addFilter('linkToSection', linkToSectionInstall(eleventyConfig));
  eleventyConfig.addFilter('langLink', langLink);
  eleventyConfig.addFilter('filterBy', filterBy);
  eleventyConfig.addFilter('linkToGithub', linkToGithub);
  eleventyConfig.addFilter('toPath', toPathFilter);

  /**
   * If file inside of folder with creation date in name,
   * creation date won't be removed.
   * https://github.com/11ty/eleventy/issues/1742
   */
  eleventyConfig.addFilter('removeDateFromPath', (value) => {
    return value.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  });
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};

function getFontGlobs() {
  const fontFolderPath = './node_modules/@fontsource/raleway/';
  const rootFiles = ['variable.css', 'variable-italic.css'];

  const childFolder = 'files';
  const childFiles = [
    'raleway-cyrillic-variable-wghtOnly-normal.woff2',
    'raleway-cyrillic-ext-variable-wghtOnly-normal.woff2',
    'raleway-latin-variable-wghtOnly-normal.woff2',
    'raleway-latin-ext-variable-wghtOnly-normal.woff2',
    'raleway-cyrillic-variable-wghtOnly-italic.woff2',
    'raleway-cyrillic-ext-variable-wghtOnly-italic.woff2',
    'raleway-latin-variable-wghtOnly-italic.woff2',
    'raleway-latin-ext-variable-wghtOnly-italic.woff2',
  ];

  const fontFolderDist = './public/styles/raleway';

  return {
    [fontFolderPath + '{' + rootFiles + '}']: fontFolderDist,
    [fontFolderPath + childFolder + '/' + '{' + childFiles + '}']:
      fontFolderDist + '/' + childFolder,
  };
}
