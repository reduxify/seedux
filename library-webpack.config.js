
var webpack = require('webpack');

module.exports = {
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
    library: 'seedux',
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  "babel": {
    "presets": ["es2015"]
  },
};
