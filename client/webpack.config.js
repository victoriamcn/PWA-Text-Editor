const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: { // Entry point for files
      main: './src/js/index.js',
      install: './src/js/install.js',
      // editor: './src/editor.js'
    },
    output: { // Output for our bundles
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ // Webpack plugin that generates our html file and injects our bundles. 
        template: './index.html',
        title: 'J.A.T.E'
      }),
      new InjectManifest({ // Injects our custom service worker
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      }),
      new WebpackPwaManifest({ // Creates a manifest.json file.
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Create notes and code snippets with or without an internet connection.',
        background_color: '#f5f5f5',
        theme_color: '#31a9e1',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: 96,
            destination: path.join('assets', 'icons'),
          }
        ],
      }),
    ],

    module: {
      rules: [ // CSS loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude:/node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/present-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
