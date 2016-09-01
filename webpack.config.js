var path = require('path')

var js = path.resolve('./app/js')

module.exports = {
  context: __dirname,
  devtool: 'eval',
  entry: {
    app: [ 'babel-regenerator-runtime', 'babel-polyfill', path.join(js, './app') ]
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/i/',
    path: path.join(__dirname, './i')
  },
  module: {
    loaders: [
      { test: /\.js$/, include: js, loader: 'babel' },
      { test: /\.jsx$/, include: js, loaders: [ 'react-hot', 'babel' ] }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    root: js
  }
}
