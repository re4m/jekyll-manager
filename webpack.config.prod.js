import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { ADMIN_PREFIX } from './src/constants';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default {
  node: { fs: 'empty' },
  devtool: 'cheap-module-source-map',
  entry: './src/index',
  target: 'web',
  output: {
    path: `${__dirname}/lib/jekyll-admin/public`,
    publicPath: `${ADMIN_PREFIX}/`,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      noInfo: true,
      options: {
        sassLoader: {
          includePaths: [path.resolve(__dirname, 'src', 'scss')]
        },
        context: '/'
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel-loader']
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]?[hash:6]'
      },
      {
        test: /\.(woff|woff2)(\?.*$|$)/,
        loader: 'file-loader?name=fonts/[name].[ext]?[hash:6]&prefix=font/&limit=30000'
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]?[hash:6]&limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?name=images/[name].[ext]?[hash:6]&limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file-loader?name=images/[name].[ext]?[hash:6]']
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /(\.css|\.scss)$/,
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!sass-loader?sourceMap')
      }
    ]
  }
};
