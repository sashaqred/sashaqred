import eleventyHelmetPlugin from 'eleventy-plugin-helmet';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import pluginRss from '@11ty/eleventy-plugin-rss';
import PostCSSPlugin from 'eleventy-plugin-postcss';
import eleventyPluginToc from 'eleventy-plugin-toc';
import eleventyPluginTimeToRead from 'eleventy-plugin-time-to-read';
import i18n from 'eleventy-plugin-i18n';
import faviconPlugin from 'eleventy-favicon';
import date from './src/_filters/date.js';
import linkToSectionInstall from './src/_filters/link-to-section.js';
import langLink from './src/_filters/lang-link.js';
import filterBy from './src/_filters/filter-by.js';
import linkToGithub from './src/_filters/link-to-github.js';
import { toPathFilter } from './src/_filters/to-path.js';
import imageShortcode from './src/_shortcodes/image.js';
import md from './src/_markdown-it/index.js';
import translations from './src/i18n.json' with { type: 'json' };

export default function (eleventyConfig) {
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.setServerPassthroughCopyBehavior('copy');
  eleventyConfig.addPlugin(PostCSSPlugin);
  eleventyConfig.addPlugin(eleventyHelmetPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(eleventyPluginToc);
  eleventyConfig.addPlugin(eleventyPluginTimeToRead, {
    speed: '275 words a minute',
  });
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en',
    },
  });
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(faviconPlugin, { destination: './dist' });
  eleventyConfig.addPassthroughCopy({
    './src/public': './',
    './CNAME': './CNAME',
    ...getFontGlobs(),
  });

  eleventyConfig.addFilter('date', date);
  eleventyConfig.addFilter('linkToSection', linkToSectionInstall(eleventyConfig));
  eleventyConfig.addFilter('langLink', langLink);
  eleventyConfig.addFilter('filterBy', filterBy);
  eleventyConfig.addFilter('linkToGithub', linkToGithub);
  eleventyConfig.addFilter('toPath', toPathFilter);

  /**
   * If file inside of folder with creation date in name,
   * creation date won't be removed.
   * https://github.com/11ty/eleventy/issues/1742
   */
  eleventyConfig.addFilter('removeDateFromPath', (value) => {
    return value.replace(/^\d{4}-\d{2}-\d{2}-/, '');
  });
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}

function getFontGlobs() {
  const fontFolderPath = './node_modules/@fontsource-variable/raleway/files/';

  const childFiles = [
    'raleway-cyrillic-wght-normal.woff2',
    'raleway-cyrillic-ext-wght-normal.woff2',
    'raleway-latin-wght-normal.woff2',
    'raleway-latin-ext-wght-normal.woff2',
    'raleway-cyrillic-wght-italic.woff2',
    'raleway-cyrillic-ext-wght-italic.woff2',
    'raleway-latin-wght-italic.woff2',
    'raleway-latin-ext-wght-italic.woff2',
  ];

  const fontFolderDist = './styles/files/';

  return {
    [fontFolderPath + '{' + childFiles.join(',') + '}']: fontFolderDist,
  };
}
