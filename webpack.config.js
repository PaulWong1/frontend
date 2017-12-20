const path = require('path'); //内置的node模块
const htmlWP = require('html-webpack-plugin')
module.exports = {
    // 入口
    entry: path.resolve(__dirname, './src/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWP({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        //非js模块的处理规则
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            // less模块
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            //静态资源引入模块
            {
                test: /\.(gif|jpg|jpeg|svg|png|mp3|mp4|woff|ttf)$/,
                use: [{
                    // 小于10k才打包
                    loader: 'url-loader',
                    options: { limit: 10240 }
                }]
            },
            //js模块
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            //vue模块
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
        ]
    },
    //webpack-dev-server的配置
    devServer: {
        open: true, //服务启动后自动打开浏览器
        port: 8080, //服务端口
        contentBase: 'dist'
    }
}