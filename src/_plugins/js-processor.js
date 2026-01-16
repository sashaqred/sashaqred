import { minify } from 'terser';

export async function EleventyPluginJSProcessor(config) {
  config.addTemplateFormats('js');

  config.addExtension('js', {
    outputFileExtension: 'js',
    compile: async (inputContent, inputPath) => {
      if (inputPath.startsWith('./src/scripts')) {
        return async () => {
          return minify(inputContent).then((result) => result.code);
        };
      }
      return undefined;
    },
  });
}
