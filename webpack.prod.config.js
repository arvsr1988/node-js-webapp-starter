let webpack = require('webpack');
let initialConfig = require('./webpack.config');
initialConfig.plugins = initialConfig.plugins || [];
initialConfig.plugins = initialConfig.plugins.concat([
  new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$")),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
  })
]);
module.exports = initialConfig;
