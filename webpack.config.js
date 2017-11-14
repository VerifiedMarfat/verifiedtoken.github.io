'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "style.css", //future:[name].[contenthash].css
  disable: process.env.NODE_ENV === "development"
});


module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'static')
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: "css-loader", options: { minimize: true } },
            { loader: "sass-loader" }
          ],
          fallback: "style-loader" // use style-loader in development
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          { loader: "file-loader" }
        ]
      }
    ]
  },
  plugins: [ 
    extractSass,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': "jquery"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ]
};