const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPluginConfig = new htmlWebpackPlugin({
  template: "./client/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve("dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [htmlWebpackPluginConfig]
};