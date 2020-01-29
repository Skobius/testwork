const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
require("babel-polyfill");
const vueLoaderPlugin = require('vue-loader/lib/plugin');

const isProd = process.env.NODE_ENV === 'production';

let plugins = [new ExtractTextPlugin('css/[name].css'), new vueLoaderPlugin(),new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    children: true,
})];

if (isProd) {
    plugins.push(new UglifyJsPlugin({
        uglifyOptions: {
            output: {
                comments: false,
                beautify: false
            },
        }
    }));
}

// Добавляем точки входа, общие для всех сайтов
let entryPoints = {
    vendor: ["babel-polyfill", './src/scripts/vendor.js'],
    index: ["./src/scripts/index.js"]
};

module.exports = {
    entry: entryPoints,

    devtool: isProd ? false : 'source-map',

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js"
    },

    watch: !isProd,

    watchOptions: {
        aggregateTimeout: 300
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', 'vue'],
                        plugins: [require('@babel/plugin-proposal-object-rest-spread'), 'transform-regenerator']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        // {
                        // 	loader: 'vue-style-loader'
                        // },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProd,
                                minimize: isProd
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: !isProd}
                        },
                        {
                            loader: 'sass-loader',
                            options: {sourceMap: !isProd}
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '../images/style/',
                            outputPath: 'images/style/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: 'src/',
                            name: '[path][name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.modernizrrc.js$/,
                use: [ 'modernizr-loader' ]
            },
            {
                test: /\.modernizrrc(\.json)?$/,
                use: [ 'modernizr-loader', 'json-loader' ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                js: 'babel-loader'
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: plugins,

    resolve: {
        alias: {
            modernizr$: path.resolve(__dirname, ".modernizrrc"),
            vue: 'vue/dist/vue.js'
        }
    }
}
