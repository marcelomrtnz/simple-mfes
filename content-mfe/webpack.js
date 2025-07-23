const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const webpack = require("webpack")
const deps = require("./package.json").dependencies;

require('dotenv').config({ path: './.env' }); 

const { withZephyr } = require("zephyr-webpack-plugin");

const exportConfiguration = withZephyr({

})({
    
  cache: false,
  mode: "production",
  


  output: {
    chunkFormat: false,
    publicPath: process.env.CONTENT_MFE_PUBLIC_PATH + '/',
    // path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    crossOriginLoading: "anonymous",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8082,
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
    new ModuleFederationPlugin({
      name: "content",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        './ContentContainer': './src/shared/ContentContainer',
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

exportConfiguration.then(res => console.log(JSON.stringify(res)))

module.exports = exportConfiguration