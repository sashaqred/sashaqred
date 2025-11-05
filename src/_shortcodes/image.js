import Image from '@11ty/eleventy-img';
import { toPath } from '../_filters/to-path.js';

export default async function imageShortcode(src, alt) {
  src = toPath(src, this.page.filePathStem);

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
}
