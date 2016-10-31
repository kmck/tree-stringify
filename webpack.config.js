var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output:  {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
    }, {
      test: /\.json5?$/,
      loader: 'json5',
    }],
  },
  plugins: [new ExtractTextPlugin('styles.css')],
};
