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

  // Layout is designed that images can't be more then 600px.
  const widths = [600];
  const sharpJpegOptions = {
    progressive: true,
    chromaSubsampling: '4:4:4',
    mozjpeg: true,
  };
  const sharpWebpOptions = {
    smartSubsample: true,
  };
  const sharpAvifOptions = {
    quality: 70,
  };

  const metadata = await Image(src, {
    formats: ['jpeg', 'webp', 'avif'],
    urlPath: '/generated_images',
    outputDir: './dist/generated_images',
    widths,
    sharpJpegOptions,
    sharpWebpOptions,
    sharpAvifOptions,
  });

  const imageAttributes = {
    alt,
    loading: 'lazy',
    decoding: 'async',
  };

  return Image.generateHTML(metadata, imageAttributes);
};
