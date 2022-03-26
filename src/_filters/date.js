const { format } = require('date-fns');
const locales = require('date-fns/locale');

module.exports = function (value, lang, dateFormat = 'd MMMM u') {
  const locale = lang !== 'en' ? locales[lang] : undefined;
  const formatted = format(value, dateFormat, { locale });
  return formatted;
};
