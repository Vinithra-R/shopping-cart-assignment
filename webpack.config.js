const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "development",
  entry: [
    "@babel/polyfill",
    "./client/scss/index-css.js",
    "./client/scripts/index.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // {
      //   test: /\.s[ac]ss$/i,
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     {
      //       loader: "sass-loader",
      //       options: {
      //         sourceMap: true,
      //         sassOptions: {
      //           outputStyle: "compressed",
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      linkType: "text/css",
      filename: "style.css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
