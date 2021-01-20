let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
    mode: "development",
    devtool:false,
    entry: "./src/index.js",
    output: {
        publicPath: "http://localhost:8081/",
    },
    devServer: {
        port: 8081
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"]
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        new ModuleFederationPlugin({
            name:'hostVar',
            filename:'remoteEntry.js',
            remotes:{
                remote:'remoteVar@http://localhost:8080/remoteEntry.js'
            },
            exposes:{
                './Slides':'./src/Slides'
            },
            shared:['react','react-dom']    
        })
    ]
}