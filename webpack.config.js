var webpack = require('webpack');

var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './reduxifyChrome/src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ["babel-loader"]
    }, {
      test: /\.(css|scss)$/,
      loaders: ['style', 'css', 'sass']
    }],
  },
  output: {
    path: __dirname + '/reduxifyChrome/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './reduxifyChrome/dist',
     hot: true
  },
  "babel": {
    "presets": [
      "es2015",
      "react"
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
