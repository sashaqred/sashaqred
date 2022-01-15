const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const eleventyPluginToc = require('eleventy-plugin-toc');
const eleventyPluginReadingTime = require('eleventy-plugin-reading-time');
const i18n = require('eleventy-plugin-i18n');
const send404 = require('./src/_browsersync/middlewares/send-404');
const date = require('./src/_filters/date');
const linkToSectionInstall = require('./src/_filters/link-to-section');
const langLink = require('./src/_filters/lang-link');
const filterBy = require('./src/_filters/filter-by');
const linkToGithub = require('./src/_filters/link-to-github');
const imageShortcode = require('./src/_shortcodes/image');
const md = require('./src/_markdown-it');
const translations = require('./src/i18n');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addPlugin(eleventyHelmetPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyPluginToc);
  eleventyConfig.addPlugin(eleventyPluginReadingTime);
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en',
    },
  });
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPassthroughCopy({ '_eleventy/public': '.' });
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addFilter('date', date);
  eleventyConfig.addFilter('linkToSection', linkToSectionInstall(eleventyConfig));
  eleventyConfig.addFilter('langLink', langLink);
  eleventyConfig.addFilter('filterBy', filterBy);
  eleventyConfig.addFilter('linkToGithub', linkToGithub);

  /**
   * If file inside of folder with creation date in name,
   * creation date won't be removed.
   * https://github.com/11ty/eleventy/issues/1742
   */
  eleventyConfig.addFilter('removeDateFromPath', (value) => {
    console.log('removeDateFromPath');
    console.log(value);
    return value.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  });
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', send404);
      },
    },
  });

  return {
    dir: {
      input: '_eleventy',
      output: 'dist',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
};
