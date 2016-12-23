
var webpack = require('webpack');

module.exports = {
  entry: [
    './seeduxChrome/src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }, {
        test: /\.(css|scss)$/,
        loaders: ['style', 'css', 'sass']
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/seeduxChrome/dist',
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  "babel": {
    "presets": ["es2015", "react"]
  },
};
