const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'build/js'),
    watchContentBase: true,
  }
};
