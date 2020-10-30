const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyHelmetPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy({ '_eleventy/public': '.' });
  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      input: '_eleventy',
      output: 'dist',
    },
  };
};
