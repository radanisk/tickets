/* eslint comma-dangle: ["error",
  {"functions": "never", "arrays": "only-multiline", "objects":
"only-multiline"} ] */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

const config = {
  entry: {
    vendor: [
      'babel-polyfill',
      'bootstrap-loader/extractStyles',
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'jquery',
      'jquery-ujs',

      // Below libraries are listed as entry points to be sure they get included in the
      // vendor-bundle.js. Note, if we added some library here, but don't use it in the
      // app-bundle.js, then we just wasted a bunch of space.
      'axios',
      'immutable',
      'lodash',
      'react-bootstrap',
      'react-dom',
      'react-redux',
      'react-on-rails',
      'react-router-redux',
      'redux-thunk',
    ],
    app: [
      './app/bundles/Tickets/startup/registration',
    ]
  },

  output: {
    filename: '[name]-bundle.js',
    path: '../app/assets/webpack',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      libs: path.join(process.cwd(), 'app', 'libs'),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new ExtractTextPlugin('[name]-bundle.css', { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({
      // This name 'vendor' ties into the entry definition
      name: 'vendor',

      // We don't want the default vendor.js name
      filename: 'vendor-bundle.js',

      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity,
    }),
  ],
  module: {
    loaders: [
      { test: require.resolve('react'), loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham' },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },

      { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
      { test: /\.(ttf|eot)$/, loader: 'file' },
      { test: /\.(jpe?g|png|gif|svg|ico)$/, loader: 'url?limit=10000' },

      { test: require.resolve('jquery'), loader: 'expose?jQuery' },
      { test: require.resolve('jquery'), loader: 'expose?$' },
      { test: require.resolve('jquery-ujs'), loader: 'imports?jQuery=jquery' },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?minimize&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]' +
          '!postcss'
        ),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?minimize&modules&importLoaders=3&localIdentName=[name]__[local]__[hash:base64:5]' +
          '!postcss' +
          '!sass' +
          '!sass-resources'
        ),
      },
    ],
  },
};

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
