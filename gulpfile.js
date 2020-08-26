const { task } = require('gulp');
const { eleventyBuild, eleventyServe } = require('./tasks/eleventy');

task('build', eleventyBuild);
task('serve', eleventyServe);
