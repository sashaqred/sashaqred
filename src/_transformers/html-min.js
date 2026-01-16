import { minify } from 'html-minifier-terser';

export function htmlMinTransformer(content) {
  // String conversion to handle `permalink: false`
  if ((this.page.outputPath || '').endsWith('.html')) {
    return minify(content, {
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyJS: true,
      removeComments: true,
    });
  }

  // If not an HTML output, return content as-is
  return content;
}
