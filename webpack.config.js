const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Require  html-webpack-plugin plugin

module.exports = {
  context: __dirname,
  entry: "./index.js", // webpack entry point. Module to start building dependency graph
  output: {
    path: path.resolve(__dirname, "dist"), // Folder to store generated bundle
    filename: "bundle.js", // Name of generated bundle after build
  },
  module: {
    // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // inject CSS to page
            loader: "style-loader",
          },
          {
            // translates CSS into CommonJS modules
            loader: "css-loader",
          },
          {
            // Run postcss actions
            loader: "postcss-loader",
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [require("autoprefixer")];
                },
              },
            },
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      inject: "body",
    }),
  ],
  devServer: {
    // configuration for webpack-dev-server
    contentBase: path.join(__dirname, "dist"), //source of static assets
    // compress: true,
    port: 3000, // port to run dev-server
  },
};
