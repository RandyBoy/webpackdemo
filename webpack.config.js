var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app: "./index",
        B: "./b/b"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[hash].bundle.js",
        chunkFilename: "[name].[chunkhash].chunk.js"
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
            filename: "commons.[hash].js",
            chunks: ["A", "B"]
        }),
        new ExtractTextPlugin("[name].[contenthash].css", { allchunks: true }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // template: 'index.html',
            inject: true
        }),
    ]
};