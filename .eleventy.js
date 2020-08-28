const eleventyHelmetPlugin = require('eleventy-plugin-helmet');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyHelmetPlugin);
  eleventyConfig.addPassthroughCopy({ '_eleventy/public': '.' });
  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      input: '_eleventy',
      output: 'dist',
    },
  };
};
