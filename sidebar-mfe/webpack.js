const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack")
const deps = require("./package.json").dependencies;
require('dotenv').config({ path: './.env' }); 

const { withZephyr } = require("zephyr-webpack-plugin");

module.exports = withZephyr()({
  cache: false,
  mode: "production",          

  output: {
    chunkFormat: false,
    publicPath: process.env.SIDEBAR_MFE_PUBLIC_PATH + '/',
    crossOriginLoading: 'anonymous',
    publicPath: "/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
    allowedHosts: "all",
    historyApiFallback: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
      },
    },
    runtimeChunk: false, // Also disable runtime chunk if desired
  },

  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
    }),
    new ModuleFederationPlugin({
      name: "sidebar",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './SidebarContainer': './src/shared/SidebarContainer',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});