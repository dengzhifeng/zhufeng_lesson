/*
 * @description:
 * @author: steve.deng
 * @Date: 2020-12-19 06:51:55
 * @LastEditors: steve.deng
 * @LastEditTime: 2020-12-21 08:34:39
 */
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const icon = path.join(__dirname, 'icon.jpg');
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const smw = new SpeedMeasureWebpack5Plugin();
const selfLoadersPath = path.resolve(__dirname, 'loader');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ImageWebpackLoader = require('image-webpack-loader');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
// 因为css和js加载可以并行 所以我们可以通过此插件提取css为单独的文件 然后去掉无用css 进行压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const PATHS = {
    src: path.resolve(__dirname, 'src')
};
const bootstrap = path.resolve(
    __dirname,
    'node_modules/bootstrap/dist/css/bootstrap.css'
);
module.exports = smw.wrap({
    mode: 'development', // 配置的模式
    devtool: 'source-map', // 调试工具
    context: process.cwd(), // node命令运行的进程的当前目录 就是这个项目根目录
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    // js压缩
    optimization: {
        minimize: true, // 开始最小化
        minimizer: [new TerserWebpackPlugin()]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 指定扩展名
        alias: {
            bootstrap // 查找别名
        },
        modules: ['node_modules'], // 指定查找目录
        mainFields: ['browser', 'module', 'main'], // 从package.json中的哪个字段查找入口文件
        mainFiles: ['index'] // 如果找不到mainFields的话 会找索引文件 index.js
    },
    resolveLoader: {
        modules: [selfLoadersPath, 'node_modules'] // selfLoadersPath 自定义loader解析
    },
    externals: {
        jquery: 'jQuery'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/, // 不解析
                use: [
                    // 开启多线程池  弊端开线程和线程通信需要时间的
                    {
                        loader: 'thread-loader',
                        options: { workers: 3 }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true // 自动babel缓存
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|bmp)$/,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'cache-loader',
                    'log-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                // 压缩html
                collapseWhitespace: true, // 压缩空白
                removeComments: true // 去除注释
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        // /**/*   **匹配任意字段 包括路径分隔符  *匹配任意字符 不包含路径分隔符 、、
        // 去除无用css
        new PurgecssWebpackPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
        }),
        new FriendlyErrorsWebpackPlugin({
            onErrors: (severity, errors) => {
                let error = errors[0];
                notifier.notify({
                    title: 'webpack编译失败了',
                    message: severity + ':' + error.name,
                    subtitle: error.file || '',
                    icon
                });
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled', // 不启动展示打包报告的HTTP服务器
            generateStatsFile: true // 要生成stats.json文件
        }),
        // 忽略模块打包 比如语言包
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/, // 资源正则
            contextRegExp: /moment$/ // 上下文， 目录正则
        }),
        new OptimizeCssAssetsWebpackPlugin() // 压缩css
    ]
});
