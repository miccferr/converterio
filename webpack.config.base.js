/* eslint strict: 0 */
'use strict';

// need to define nodeModules or GDAL will break everything
// http://jlongster.com/Backend-Apps-with-Webpack--Part-I
const path = require('path');
const fs = require('fs');
let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  module: {
    loaders: [		{ test: /\.coffee$/, loader: "coffee-loader" },
			{ test: /\.(coffee\.md|litcoffee)$/, loader: "coffee-loader?literate" },
      {
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  node: {
  fs: "empty"
},target : 'electron',
  externals: nodeModules
  // externals: [
  //   // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
  // ]
};
