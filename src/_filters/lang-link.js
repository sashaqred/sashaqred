module.exports = function (lang, link, translatedTo) {
  if (translatedTo.includes(lang)) {
    const [empty, omittedLang, ...restSegments] = link.split('/');
    return [empty, lang, ...restSegments].join('/');
  } else {
    return `/${lang}/`;
  }
};
