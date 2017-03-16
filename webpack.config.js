var NyanProgressPlugin = require('nyan-progress-webpack-plugin');

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
  ],
  devServer: {
    historyApiFallback: true,
  }
};

