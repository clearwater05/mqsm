const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const context = {
    source: (path) => {
        return __dirname + (path !== undefined ? path : '');
    },
    output: (path) => {
        return __dirname + '/server/public' + (path !== undefined ? path : '');
    }
};

module.exports = {
    mode: 'development',
    entry: {
        app: context.source('/client/index.js')
    },
    output: {
        path: context.output(),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                include: /\/node_modules\//,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)/,
                use: 'babel-loader'
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};