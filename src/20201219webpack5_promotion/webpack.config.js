const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const icon = path.join(__dirname, 'icon.jpg');
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const smw = new SpeedMeasureWebpack5Plugin();
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
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            bootstrap
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
    plugins: [
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
        })
    ]
});
