const webpack = require('webpack');
const path = require('path');

const ENTRY = path.resolve(__dirname, './src/index.js');
const OUTPUT = path.resolve(__dirname, './lib');

module.exports = {
  entry: ENTRY,
  output: {
    path: OUTPUT,
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx"]
  },
  externals: {
    'react': 'commonjs react'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  }
}
