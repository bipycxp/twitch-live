const path = require(`path`)
const webpack = require(`webpack`)
const autoprefixer = require(`autoprefixer`)
const HtmlWebpackPlugin = require(`html-webpack-plugin`)
const CleanWebpackPlugin = require(`clean-webpack-plugin`)
const CopyWebpackPlugin = require(`copy-webpack-plugin`)
const GenerateJsonPlugin = require(`generate-json-webpack-plugin`)
const packageJson = require(`./package.json`)

const PATHS = {
  ASSETS: path.resolve(`./app/assets`),
  JS: path.resolve(`./app/js`),
  DIST: path.join(__dirname, `./dist`),
  CONFIG: path.join(__dirname, `./config`),
}

const { NODE_ENV = `development` } = process.env
const IS_PRODUCTION = NODE_ENV === `production`

module.exports = {
  devtool: IS_PRODUCTION ? false : `eval`,
  entry: {
    popup: [
      `babel-regenerator-runtime`,
      `babel-polyfill`,
      `whatwg-fetch`,
      path.join(PATHS.JS, `./popup.jsx`),
    ],
    background: [
      path.join(PATHS.JS, `./background.js`),
    ],
  },
  output: {
    filename: `js/[name].js`,
    publicPath: `/`,
    path: PATHS.DIST,
  },
  resolve: {
    extensions: [ `.js`, `.jsx` ],
    alias: {
      'client-config': path.join(PATHS.CONFIG, `client-config`, NODE_ENV),
    },
    modules: [
      PATHS.JS,
      `node_modules`,
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          PATHS.JS,
          PATHS.CONFIG,
        ],
        loader: `babel-loader`,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: `style-loader`,
          },
          {
            loader: `css-loader`,
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: `[name]__[local]___[hash:base64:5]`,
            },
          },
          {
            loader: `postcss-loader`,
            options: {
              plugins: () => ([
                autoprefixer({ browsers: [ `last 10 Chrome versions` ] }),
              ]),
            },
          },
          {
            loader: `sass-loader`,
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Not build with errors.
    new webpack.NoEmitOnErrorsPlugin(),
    // Create chunks.
    new webpack.optimize.CommonsChunkPlugin({
      name: `commons`,
      minChunks: 2,
    }),
    // Compress .js files.
    new webpack.optimize.UglifyJsPlugin({
      compress: IS_PRODUCTION,
      sourceMap: false,
    }),
    // Create .html files.
    new HtmlWebpackPlugin({
      title: packageJson.fullName,
      filename: `popup.html`,
      chunks: [ `popup`, `commons` ],
    }),
    new HtmlWebpackPlugin({
      title: packageJson.fullName,
      filename: `background.html`,
      chunks: [ `background`, `commons` ],
    }),
    // Clear `dist` before building.
    new CleanWebpackPlugin([ PATHS.DIST ], {
      verbose: true,
    }),
    // Generate manifest file.
    new GenerateJsonPlugin(
      `manifest.json`,
      require(path.join(PATHS.JS, `manifest`))
    ),
    // Copy assets files to `dist`.
    new CopyWebpackPlugin([
      {
        from: PATHS.ASSETS,
        to: `assets`,
      },
    ]),
  ],
}
