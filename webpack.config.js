
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './seeduxChrome/src/index.jsx'
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
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/seeduxChrome/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './seeduxChrome/dist',
     hot: true
  },
  "babel": {
    "presets": ["es2015", "react"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
