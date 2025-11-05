import { join } from 'node:path';

export function toPath(relativeTargetPath, sourceFilePath) {
  if (relativeTargetPath.startsWith('./')) {
    const [sourceFileName, ...segmentsToSourceFile] = sourceFilePath.split('/').reverse();
    relativeTargetPath = join(segmentsToSourceFile.reverse().join('/'), relativeTargetPath);
  }

  if (relativeTargetPath.startsWith('/')) {
    relativeTargetPath = './src' + relativeTargetPath;
  }

  return relativeTargetPath;
}

export function toPathFilter(relativeTargetPath) {
  return toPath(relativeTargetPath, this.ctx.page.filePathStem);
}
