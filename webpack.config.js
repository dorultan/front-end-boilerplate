const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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
    new webpack.DefinePlugin({
      // Pass values from .env file to browser
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
    }),
    new HtmlWebpackPlugin({
      // Ensure all generated html files (e.g: 404.html, notFound.html, etc ..) has the proper title tag
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
    new CleanWebpackPlugin(),
  ],
  optimization: {
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
    before: function(app, server, compiler) {

      app.get('/api/config', function(req, res) {

        res.status(200).json({env: process.env.APP_ENV});
      })
    },
    historyApiFallback: true,
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

    config.optimization.minimize = true;
    config.optimization.minimizer = [
      new TerserPlugin({
        extractComments: 'all',
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        sourceMap: true,
      }),
    ];

    config.plugins = [
      ...config.plugins,
    ];
  }

  return config;
};
