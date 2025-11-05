export default function langLink(lang, link, allCollections = []) {
  const urls = allCollections
    .filter((item) => item.url !== '/' && item.data.lang === lang)
    .map((item) => item.url);
  const [empty, omittedLang, ...restSegments] = link.split('/');
  while (restSegments.length) {
    let predictedUrl = [empty, lang, ...restSegments].join('/');
    if (!predictedUrl.endsWith('/')) {
      predictedUrl += '/';
    }
    if (urls.includes(predictedUrl)) {
      return predictedUrl;
    }
    restSegments.pop();
  }

  return `/${lang}/`;
}
