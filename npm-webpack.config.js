
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './lib/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"]
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'index.js'
  },
  "babel": {
    "presets": ["es2015"]
  },
};
