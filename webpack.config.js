var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        A: "./index",
        B: "./b",
        C: "./c",
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract({
            //         notExtractLoader: 'style-loader',
            //         loaders: ['style-loader','css-loader']
            //     })
            // },
            { test: /\.scss$/, loader: "style!css!sass" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.png$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js",
            chunks: ["A", "B"]
        }),
        new ExtractTextPlugin("[name].css", { allchunks: true }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // template: 'index.html',
            inject: true
        }),
    ]
};