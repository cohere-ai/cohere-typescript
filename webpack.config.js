const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

module.exports = (env = {}) => {
  const config = {
    mode: env.production ? "production" : "development",
    entry: './cohere.ts',
    devtool: 'source-map',
    target: 'node',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    output: {
      filename: 'cohere.js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        name: 'cohere',
        type: 'umd'
      }
    },
    optimization: {
      minimize: false
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ESLintPlugin({
        extensions: ['.tsx', '.ts', '.js']
      }),
      new CopyPlugin({
        patterns: [
          {
            from: 'models/index.ts',
            to: 'models'
          }
        ],
      }),
    ]
  };
  if (env.nodemon) {
    config.watch = true;
    config.plugins.push(new NodemonPlugin());
  }

  return config;
}

