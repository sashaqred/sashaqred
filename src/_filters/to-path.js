const { join } = require('path');

function toPath(relativeTargetPath, sourceFilePath) {
  if (relativeTargetPath.startsWith('./')) {
    const [sourceFileName, ...segmentsToSourceFile] = sourceFilePath.split('/').reverse();
    relativeTargetPath = join(segmentsToSourceFile.reverse().join('/'), relativeTargetPath);
  }

  if (relativeTargetPath.startsWith('/')) {
    relativeTargetPath = './src' + relativeTargetPath;
  }

  return relativeTargetPath;
}

function toPathFilter(relativeTargetPath) {
  return toPath(relativeTargetPath, this.ctx.page.filePathStem);
}

module.exports = {
  toPath,
  toPathFilter,
};
