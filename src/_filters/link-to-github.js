module.exports = function linkToGithub(fileInput, alternativeFileInput) {
  let fileLink = alternativeFileInput ?? fileInput;
  fileLink = fileLink.replace('./_eleventy', '/src');
  if (!fileLink.startsWith('/')) {
    fileLink = `/${fileLink}`;
  }
  fileLink = 'https://github.com/sashaqred/sashaqred/blob/master' + fileLink;
  return fileLink;
};
