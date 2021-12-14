import ESlintWebpackPlugin from 'eslint-webpack-plugin';

export default () => new ESlintWebpackPlugin({
  threads: true,
});
