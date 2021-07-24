const Image = require('@11ty/eleventy-img');
const { join } = require('path');

module.exports = async function imageShortcode(src, alt) {
  if (src.startsWith('./')) {
    const [file, ...path] = this.page.filePathStem.split('/').reverse();
    src = join(path.reverse().join('/'), src);
  }

  if (src.startsWith('/')) {
    src = './_eleventy' + src;
  }

  const metadata = await Image(src, {
    urlPath: '/generated_images',
    outputDir: './dist/generated_images',
    // Layout is designed that images can't be more then 600px.
    widths: [600],
  });

  const imageAttributes = {
    alt,
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
};
