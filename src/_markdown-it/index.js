const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const md = markdownIt({
  html: true,
}).use(markdownItAnchor);

md.renderer.rules.code_inline = (tokens, idx, { langPrefix = '' }) => {
  const token = tokens[idx];
  return `<code class="${langPrefix}">${token.content}</code>`;
};

module.exports = md;
