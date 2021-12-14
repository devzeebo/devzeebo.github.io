import CopyWebpackPlugin from 'copy-webpack-plugin';

export default () => new CopyWebpackPlugin({
  patterns: [
    { from: 'app/404.html' },
    { from: 'posts/**/*' },
    { from: 'app/robots.txt' },
  ],
});