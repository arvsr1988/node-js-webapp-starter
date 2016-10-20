module.exports = {
  entry: {
    bundle: './js/main.js',
    second: './js/second.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/public'
  },
  module: {
      loaders: [
          // ...
          { test: /\.hbs/, loader: "handlebars-template-loader" },
      ]
  },
}
