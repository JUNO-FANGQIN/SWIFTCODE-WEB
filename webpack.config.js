const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-regenerator',
            '@babel/plugin-transform-runtime',
            ['import', {
              libraryName: 'antd',
              libraryDirectory: 'lib',
              style: 'css'
            }]
          ]
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    // Browserslist: ['last 2 version', '>1%', 'ios7']
                  })
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 204800, // 200KB限制
          name: '[name].[ext]',
          outputPath: 'images/',
          publicPath: '/images/'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        options: {
          limit: 204800, // 200KB限制
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '/fonts/'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/bundle.css',
      chunkFilename: 'styles/[name]_chunk.css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    mainFiles: ['index.js', 'index.jsx', 'index.ts', 'index.tsx']
  }
}