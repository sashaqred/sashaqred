import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';
import postcssMinify from '@csstools/postcss-minify';

export default {
  plugins: [
    atImport({ filter: (path) => path?.includes('/node_modules/') }),
    autoprefixer(),
    postcssMinify,
  ],
};
