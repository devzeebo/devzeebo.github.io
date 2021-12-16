import path from 'path';
import TsConfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin';
import type { Configuration } from 'webpack';
import plugins from './plugins';

// https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/32
delete process.env.TS_NODE_PROJECT;

const srcRoot = path.join(__dirname, '..', 'app');
const outputDir = path.join(__dirname, '..', 'dist');

export default (
  env: any,
  { mode }: { mode: 'development' | 'production' }
): Configuration => ({
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    pathinfo: false,
    path: outputDir,
    filename: 'js/[name].js',
    publicPath: '/',
  },
  entry: {
    main: [
      path.join(srcRoot, 'index.tsx'),
    ],
  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    plugins: [
      new TsConfigPathsWebpackPlugin(),
    ],
  },
  plugins: plugins({
    root: __dirname,
    srcRoot,
    outputDir,
    mode,
  }),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: srcRoot,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    // https: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
});
