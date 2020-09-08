const path = require("path")

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { VueLoaderPlugin } = require("vue-loader")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const webpack = require("webpack")
const isDev = process.env.NODE_ENV === "development"

module.exports = {
  entry: {
    main: path.join(__dirname, "src/main.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "js[name].bundle.js",
    chunkFilename: "js[id].chunk.js",
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: { "@": path.join(__dirname, "src") },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        include: [path.join(__dirname, "src")],
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [path.join(__dirname, "src")],
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: isDev } },
          { loader: "sass-loader", options: { sourceMap: isDev } },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          "vue-style-loader",
          { loader: "css-loader", options: { sourceMap: isDev } },
          { loader: "sass-loader", options: { sourceMap: isDev } },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: 8000,
    stats: {
      normal: true,
    },
  },
}
