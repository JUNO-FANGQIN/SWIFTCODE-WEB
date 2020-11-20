const path = require('path')
const webpack = require('webpack')
const Merge = require('webpack-merge')
const config = require('./webpack.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

const isProd = process.env.NODE_ENV === 'production'

const envPlugins = isProd ? [
  new webpack.NormalModuleReplacementPlugin(/routes\/sync/, 'routes/async')
] : [
  new HtmlWebpackPlugin({
    filename:'index.html',
    template:'index.html'
  })
]

const clientConfig = {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    publicPath: '/', // 资源访问的前缀
    path: isProd ? path.resolve(__dirname, 'server') : path.resolve(__dirname, 'browser'),
    filename: 'scripts/[name].bundle.js',
    chunkFilename: 'scripts/[name]_chunk.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'browser'),
    port: 3333,
    historyApiFallback: true
  },
  plugins: [
    ...envPlugins,
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@17/umd/react.development.js',
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
          global: 'ReactDOM'
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /(react|react-dom)/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
}

module.exports = Merge.merge(config, clientConfig)