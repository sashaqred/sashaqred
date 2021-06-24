const Image = require('@11ty/eleventy-img');

module.exports = async function imageShortcode(src, alt) {
  if (src.startsWith('./')) {
    src = this.page.url + src;
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
