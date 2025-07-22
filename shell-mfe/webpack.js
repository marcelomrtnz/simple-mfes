const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const path = require('path');
require('dotenv').config({ path: './.env' }); 

const { withZephyr } = require("zephyr-webpack-plugin");

module.exports = withZephyr({
    mode: "development",           // make sure you’re in dev mode
  cache: false,

  entry: path.resolve(__dirname, 'src', 'index.js'),
  
  output: {
    publicPath: process.env.SHELL_MFE_PUBLIC_PATH + '/',
    filename: "bundle.js",      // your bundle gets this name
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    crossOriginLoading: "anonymous",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
    allowedHosts: "all",
    historyApiFallback: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    // ← Serve your public/ directory so index.html (and any assets) are found:
    static: {
        directory: path.resolve(__dirname, 'public'),
    },
    client: {
        overlay: true,             // show build errors directly in the browser
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

  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        sidebar: `sidebar@${process.env.SIDEBAR_MFE_PUBLIC_PATH}/remoteEntry.js`,
        content: `content@${process.env.CONTENT_MFE_PUBLIC_PATH}/remoteEntry.js`,
      },
      exposes: {},
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
      template: "./public/index.html",
      scriptLoading: "defer",
      // force crossorigin on all injected scripts:
      attributes: {
        crossorigin: "anonymous",
      },
    }),
  ],
});
