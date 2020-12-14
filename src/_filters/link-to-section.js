module.exports = function linkToSectionInstall(eleventyConfig) {
  return function linkToSection(sectionName) {
    const sectionLink = eleventyConfig.getFilter('slug')(sectionName);
    return `<a href="#${sectionLink}">${sectionName}</a>`;
  };
};
