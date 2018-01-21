'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: "style.css", //future:[name].[contenthash].css
  disable: process.env.NODE_ENV === "development"
})

const port = process.env.PORT || 8000
const outputPath = path.resolve(__dirname, 'static')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'main.js',
    publicPath: '/',
    path: outputPath
  },
  devtool: 'eval-source-map',
  devServer: {
    port,
    contentBase: outputPath,
    inline: true,
    open: 'Google Chrome'
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: "css-loader", options: { minimize: true } },
            { loader: "sass-loader" }
          ],
          fallback: "style-loader"
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
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'html',
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ]
}