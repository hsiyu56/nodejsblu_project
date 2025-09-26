/* webpack.config.js ： Webpack 的設定檔 */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const clientConfig = {
  target: 'node',
  entry: './bin/www',
  node: {
    __dirname: false,
    __filename: true,
  },
  // 設定要不要先轉譯這個位置
  output: {
    path: path.join(__dirname, 'dist'),
    // 獲取絕對路徑的方法
    filename: '[name].bundle.js'
  },
  externals: [nodeExternals()],
  // 這個是擴展
  plugins: [
    new NodemonPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, 'public/'), to: path.join(__dirname, 'dist/public') },
        { from: path.join(__dirname, 'views/'), to: path.join(__dirname, 'dist/views') },
        { from: path.join(__dirname, 'routes/'), to: path.join(__dirname, 'dist/routes') },
        //{ from: path.join(__dirname, 'model/'), to: path.join(__dirname, 'dist/model') },
        { from: path.join(__dirname, 'ssl/'), to: path.join(__dirname, 'dist/ssl') },
        
      ]
      // 指定來源與目的地
    })
  ]
};
module.exports = [clientConfig];