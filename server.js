var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var stripe = require("stripe")(
  "sk_test_5bgbM0dtcebQyJ19Lx6bcp1v"
);

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 3000,
      ignored: /node_modules/
    }
  })
  .listen(3000, '127.0.0.1', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
