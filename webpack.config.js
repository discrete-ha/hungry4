var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

console.log('building for ' + process.env.NODE_ENV);

const config = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist/' ,
        filename: 'bundle.js'
    },

    devtool: 'inline-source-map',

    devServer: {
        inline: true,
        port: 8080,
        contentBase: __dirname + '/dist/' 
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets:[ 'es2015', 'react', 'stage-2' ]
                }
            }
        ]
    },

    plugins: []
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
