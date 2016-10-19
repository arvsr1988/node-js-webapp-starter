// File: webpack.config.js
module.exports = {
  // ...

  module: {
      loaders: [
          // ...
          { test: /\.hbs/, loader: "handlebars-template-loader" },
      ]
  },
}
