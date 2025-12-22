import autoprefixer from 'autoprefixer';
import atImport from 'postcss-import';

export default {
  plugins: [atImport({ filter: (path) => path?.includes('/node_modules/') }), autoprefixer()],
};
