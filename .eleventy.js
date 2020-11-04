const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const eleventyPluginToc = require('eleventy-plugin-toc');
const eleventyPluginReadingTime = require('eleventy-plugin-reading-time');

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownIt({ html: true }).use(markdownItAnchor));
  eleventyConfig.addPlugin(eleventyHelmetPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyPluginToc);
  eleventyConfig.addPlugin(eleventyPluginReadingTime);
  eleventyConfig.addPassthroughCopy({ '_eleventy/public': '.' });
  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      input: '_eleventy',
      output: 'dist',
    },
  };
};
