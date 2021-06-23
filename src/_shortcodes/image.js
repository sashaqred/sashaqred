const Image = require('@11ty/eleventy-img');

module.exports = async function imageShortcode(src, alt, sizes) {
  if (src.startsWith('./')) {
    src = this.page.url + src;
  }

  if (src.startsWith('/')) {
    src = './_eleventy' + src;
  }

  const metadata = await Image(src, {
    urlPath: '/generated_images',
    outputDir: './dist/generated_images',
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
};
