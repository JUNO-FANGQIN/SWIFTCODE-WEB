const path = require('path')
const Merge = require('webpack-merge')
const config = require('./webpack.config.js')
const serverConfig = {
  target: 'node',
  entry: './src/server/index.js',
  output: {
    path: path.resolve(__dirname, 'server'),
    filename: 'app.js'
  }
}
module.exports = Merge.merge(config, serverConfig)
