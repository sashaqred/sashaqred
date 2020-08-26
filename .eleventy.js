const eleventyHelmetPlugin = require('eleventy-plugin-helmet');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyHelmetPlugin);
  eleventyConfig.addPassthroughCopy({ 'src/public': '.' });

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
