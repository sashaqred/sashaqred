module.exports = function linkToGithub(fileInput, alternativeFileInput) {
  let fileLink = alternativeFileInput ?? fileInput;
  if (!fileLink.startsWith('/')) {
    fileLink = `/${fileLink}`;
  }
  fileLink = 'https://github.com/sashaqred/sashaqred/blob/main' + fileLink;
  return fileLink;
};
