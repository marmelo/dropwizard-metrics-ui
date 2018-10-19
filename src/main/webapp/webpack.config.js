const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../resources/org/marmelo/dropwizard/metrics'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    devServer: {
        proxy: {
          '/metrics': 'http://127.0.0.1:8081',
          '/ping': 'http://127.0.0.1:8081',
          '/threads': 'http://127.0.0.1:8081',
          '/healthcheck': 'http://127.0.0.1:8081',
          '/tasks': 'http://127.0.0.1:8081'
        }
    }
};

module.exports = config;
