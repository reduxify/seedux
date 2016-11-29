var webpack = require('webpack');

var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './reduxifyChrome/src/index.jsx',
    './reduxifyChrome/d3/basicTree.js'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  output: {
    path: path.join(__dirname + '/reduxifyChrome/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
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