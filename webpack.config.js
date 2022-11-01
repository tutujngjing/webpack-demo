const path = require('path');
const TestPlugin = require('./plugin/TestPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const  AddAssetHtmlPlugin  = require('add-asset-html-webpack-plugin')
const os = require('os')
const thread = os.cpus().length


module.exports = {
    //项目开始于哪个文件
    entry: {
        main: path.resolve(__dirname, 'src/index.js'),//可以有多个
        test: path.resolve(__dirname, 'src/test.js')
    },
    //打包到哪个文件夹
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash].js',// 打包出来是main.[独特的哈希值].js
        environment: {
            arrowFunction: false
        },
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets:["@babel/preset-env"],
                            cacheDirectory: true, // 开启Babel缓存，减少第二次之后打包速度
                            plugins: ['@babel/plugin-transform-runtime']//禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用
                        }
                    }]
                    // {
                    //     loader: './loader/last-loader.js'
                    // },
                    // {
                    //     loader: './loader/sync-loader.js?myTest=true',
                    //     options: {
                    //         name: '2'
                    //     }
                    // },
                    // {
                    //     loader: './loader/async-loader.js'
                    // }]
            },
            { test: /\.(tsx|ts)$/, exclude: /node_modules/, use: ['babel-loader', 'ts-loader'] },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/media/[hash:5][ext][query]"
                }
            }
        ],
    },
    resolve: {
        //解析模块时，应该搜索的目录
        modules: ['src/commons', 'node_modules'],
        // 文件后缀名省略
        extensions: ['.js', '.ts', ],
        // 设置路径别名
        alias: {
            "commons": path.resolve(__dirname, 'src/commons')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new TestPlugin({ options: true }),
        new MiniCssExtractPlugin({
            filename: 'static/css/min.css'
        }),
        new webpack.DllReferencePlugin({
            // context: __dirname, // 与DllPlugin中的那个context保持一致
            /** 
                下面这个地址对应webpack.dll.config.js中生成的那个json文件的路径
                这样webpack打包时，会检测此文件中的映射，不会把存在映射的包打包进bundle.js
            **/
            manifest: path.resolve(__dirname, './dll/manifest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, './dll/lodash.js'),
            publicPath: './'
        })
    ],
    // 开发服务器不会输出资源，是在内存中编译打包的
    devServer: {
        host: '127.0.0.1',
        port: '8081',
        open: true
    },
    //development or production(压缩混淆) 默认为null
    mode: 'development',
}