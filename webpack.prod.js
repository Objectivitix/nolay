const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [
      "...",
      new CSSMinimizerPlugin(),
    ],
  },
});
