const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV === 'development';
const prodMode = !devMode;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '',
      },
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const plugins = [
  new HtmlWebpackPlugin({
    template: './index.html',
    minify: {
      collapseWhitespace: prodMode,
    },
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].bundle.css' : '[name].bundle.css',
    chunkFilename: devMode ? '[name].bundle.css' : '[name].bundle.css',
  }),
  new ESLintWebpackPlugin(),
];

if (devMode) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  plugins,
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './js/index.js'],
  },
  output: {
    filename: devMode ? '[name].bundle.js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    hot: devMode,
    port: 9800,
    open: {
      app: ['chrome'],
    },
  },
  devtool: devMode ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              {
                plugins: [
                  '@babel/plugin-proposal-class-properties',
                ],
              },
            ],
          },
        },
      },
    ],
  },
};
