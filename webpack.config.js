const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
require('dotenv').config();

const SRC_PATH = path.resolve(__dirname, 'client');
const BUILD_PATH = path.resolve(__dirname, 'build');

const config = {
  stats: 'minimal',
  target: 'web',
  entry: path.join(SRC_PATH, 'index.js'),
  output: {
    path: BUILD_PATH,
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      // Pass values from .env file to browser
      'process.env.API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT),
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC_PATH, 'index.ejs'),
      favicon: path.join(SRC_PATH, 'assets', 'favicon.ico'),
      environment: {
        APP_ENV: process.env.APP_ENV,
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg|jpg|gif|webp|svg|mp4|webm|woff|woff2|ico)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: BUILD_PATH,
    writeToDisk: true,
    port: process.env.CLIENT_DEV_PORT,
    host: '0.0.0.0',
    proxy: {
      '/': `http://0.0.0.0:${process.env.NGINX_PORT}`,
    },
  },
  devtool: 'source-map',
};

module.exports = (env, argv) => {
  if (argv.hot) {
    // contenthash isn't available when hot reloading.
    config.output.filename = '[name].[hash].js';
  }

  if (argv.mode === 'production') {
    config.devtool = false;

    config.plugins = [
      ...config.plugins,
    ];
  }

  return config;
};
