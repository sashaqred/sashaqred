const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const eleventyPluginToc = require('eleventy-plugin-toc');
const eleventyPluginReadingTime = require('eleventy-plugin-reading-time');
const date = require('./src/_filters/date');
const linkToSectionInstall = require('./src/_filters/link-to-section');
const md = require('./src/_markdown-it');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addPlugin(eleventyHelmetPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyPluginToc);
  eleventyConfig.addPlugin(eleventyPluginReadingTime);
  eleventyConfig.addPassthroughCopy({ '_eleventy/public': '.' });
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addFilter('date', date);
  eleventyConfig.addFilter('linkToSection', linkToSectionInstall(eleventyConfig));

  return {
    dir: {
      input: '_eleventy',
      output: 'dist',
    },
  };
};
