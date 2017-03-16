var NyanProgressPlugin = require('nyan-progress-webpack-plugin');
var webpack = require('webpack')

module.exports = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    './source/App.js'
  ],
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: [/node_modules/],
      loader: 'babel-loader',
      query: {
        presets: [
          'es2015', 
          'react',
          'stage-0',
	      ],
      }
    }]

  },
  plugins: [
    new NyanProgressPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
  devServer: {
    historyApiFallback: true,
  }
};

