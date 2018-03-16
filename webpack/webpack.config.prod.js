const webpack = require('webpack');
const path = require('path');
const loaders = require('./loaders');

const SOURCE_FOLDER = path.resolve(__dirname, '../src');
const BUILD_FOLDER = path.resolve(__dirname, '../build');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const plugins = [];
plugins.push(new CleanWebpackPlugin([BUILD_FOLDER]));

module.exports = {
  mode: 'production',
  entry: SOURCE_FOLDER + '/popover-selector/popover-selector.jsx',
  output: {
    path: BUILD_FOLDER,
    filename: 'deni-react-popover-selector.js',
    library: 'DeniReactPopoverSelector',
    libraryTarget: 'umd'
  },
  module: {
    rules: loaders
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
