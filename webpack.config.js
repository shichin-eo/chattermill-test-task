const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

const isProductionMode = process.env.NODE_ENV === "production";

/**
 * Windows specific error handling
 */
process.on("uncaughtException", function(err) {
  console.error(err.stack);
});

module.exports = {
  entry: {
    app: ["./src/app.tsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      filename: "index.html",
    }),
  ],
  mode: isProductionMode ? "production" : "development",
  // The default "eval" value causes warnings about node_modules' source maps in
  // Chrome Dev Tools console.
  devtool: !isProductionMode
    ? "eval-cheap-source-map"
    : "hidden-source-map",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          context: __dirname,
          configFile: "tsconfig.json",
        },
      },
    ],
  },
  output: {
    publicPath: "/",
    path: path.join(__dirname, "dist"),
    filename: "react-static/js/[name].[chunkhash].js",
    chunkFilename: "react-static/js/[name].[chunkhash].js",
  },
  resolve: {
    symlinks: false,
    extensions: [".js", ".json", ".ts", ".tsx"],
  },
  devServer: {
    host: "127.0.0.1",
    port: "3000",
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
  }
};
