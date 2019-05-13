import { WebpackBaseConfig } from './webpack.config.base';
import { Configuration } from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import appConfig from './appConfig';
const enableBundleHashName = appConfig.get('enableBundleHashName');
const version = appConfig.get('art:version');

function bundleFileNamePattern(endFix: string = '.js'): string {
  if (enableBundleHashName) {
    return `bundle[chunkhash]${endFix}`;
  }
  return `bundle${endFix}?${version}`;
}

export default class WebpackProdConfig extends WebpackBaseConfig implements Configuration {
  constructor(entry, output) {
    super(entry, output);
  }

  public plugins = this.plugins.concat(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      // set to true if you want JS source maps
      sourceMap: false,
      uglifyOptions: {
        compress: {
          warnings: true,
          dead_code: true,
          drop_debugger: true,
          drop_console: true
        }
      }
    }),

    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { 'postcss-discard-unused': false }
    }),

    new MiniCssExtractPlugin({
      filename: `[name]/${bundleFileNamePattern('.css')}`
    })
  );

}