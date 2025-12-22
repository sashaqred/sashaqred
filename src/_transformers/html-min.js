import htmlmin from 'html-minifier-terser';

export function htmlMin(content) {
  // String conversion to handle `permalink: false`
  if ((this.page.outputPath || '').endsWith('.html')) {
    let minified = htmlmin.minify(content, {
      collapseWhitespace: true,
      minifyJS: true,
      removeComments: true,
    });

    return minified;
  }

  // If not an HTML output, return content as-is
  return content;
}
