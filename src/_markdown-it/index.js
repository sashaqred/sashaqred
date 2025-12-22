import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import slugify from '@sindresorhus/slugify';

const md = markdownIt({
  html: true,
}).use(markdownItAnchor, { slugify: (s) => slugify(s) });

md.renderer.rules.code_inline = (tokens, idx, { langPrefix = '' }) => {
  const token = tokens[idx];
  return `<code class="${langPrefix}">${md.utils.escapeHtml(token.content)}</code>`;
};

export { md };
