'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          babelrc: path.join(__dirname, '.babelrc')
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin()
  ],

  eslint: {
    configFile: path.join(__dirname, '.eslintrc'),
    ignorePath: path.join(__dirname, '.eslintignore')
  },

  resolve: {
    extensions: ['', '.json', '.js'],
    fallback: path.join(__dirname, 'node_modules')
  },

  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules')
  }
};
