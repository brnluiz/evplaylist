const webpack = require('webpack');
const path = require('path');

const env = process.env.NODE_ENV;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const WebpackDefinePluginConfig = new webpack.DefinePlugin({
  ENV: JSON.stringify(require(path.join(__dirname, './', env+'.config.js'))),
  "process.env": {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
});

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const FaviconsWebpackPluginConfig = new FaviconsWebpackPlugin(
  './favicon.svg'
);

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

module.exports = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: __dirname + '/dist',
    filename: "index_bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./src')
    ]
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, include: __dirname + '/src', loader: "babel-loader"},
      {test: /\.css$/, loader: "style-loader!css-loader"}
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
    WebpackDefinePluginConfig,
    FaviconsWebpackPluginConfig,
    UglifyJsPluginConfig
  ]
};
