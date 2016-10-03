var path = require('path')
var autoprefixer = require('autoprefixer')

var js = path.resolve('./app/js')

// `localIdentName` used for better global naming - adds readable names before hash
var cssLoader = 'css?modules&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]'
var sassLoader = 'sass?sourceMap'

module.exports = {
  devtool: 'eval',
  entry: {
    app: [ 'babel-regenerator-runtime', 'babel-polyfill', 'whatwg-fetch', path.join(js, './app.jsx') ]
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/i/',
    path: path.join(__dirname, './i')
  },
  module: {
    loaders: [
      { test: /\.js$/, include: js, loader: 'babel' },
      { test: /\.jsx$/, include: js, loaders: [ 'react-hot', 'babel' ] },
      { test: /\.scss$/, loaders: [ 'style', cssLoader, 'postcss', sassLoader ] }
    ]
  },
  postcss: [ autoprefixer({ browsers: [ '> 5%' ] }) ],
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    root: js
  }
}
