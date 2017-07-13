const fs = require('fs')

const webpackSettings="var debug = process.env.NODE_ENV !== 'production';\n\
var webpack = require('webpack');\n\
var path = require('path');\n\
module.exports = {\n\
    context: path.join(__dirname, 'client/src'),\n\
    devtool: debug ? 'inline-sourcemap' : null,\n\
    entry: [\n\
        'webpack/hot/dev-server',\n\
        'webpack-hot-middleware/client',\n\
        './js/main.js',\n\
    ],\n\
    module: {\n\
        loaders: [\n\
            {\n\
                test: /\.js$/,\n\
                exclude: /(node_modules|bower_components)/,\n\
                loader: 'babel-loader',\n\
                query: { presets: ['react','es2015'], plugins: ['transform-decorators-legacy', 'transform-class-properties'] }\n\
            },\n\
            {\n\
                test: /\.css$/,\n\
                loader: 'style!css'\n\
            },{\n\
                test: /\.less$/,\n\
                loader:'style!css!less'\n\
            },\n\
            { test: /\.(jpe?g|png|gif|svg)$/i,loaders: [\n\
                'file?hash=sha512&digest=hex&name=[hash].[ext]',\n\
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'\n\
            ]}\n\
        ]\n\
    },\n\
    devServer:{\n\
        historyApiFallback: true\n\
    },\n\
    resolve:{\n\
        root:[path.resolve(__dirname, 'client/src/lib'),path.resolve(__dirname,'node_modules')],\n\
        extensions:['','.js']\n\
    },\n\
    output: {\n\
        path: path.join(__dirname, 'client/src'),\n\
        filename: 'main.min.js',\n\
        publicPath:'/'\n\
    },\n\
    plugins: debug ? [] : [\n\
        new webpack.optimize.DedupePlugin(),\n\
        new webpack.optimize.OccurenceOrderPlugin(),\n\
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),\n\
    ]\n\
};"

module.exports = () => {
    fs.writeFile('./webpack.config.js', webpackSettings);
}