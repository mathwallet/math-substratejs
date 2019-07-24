const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    mode: 'production',
    //production
    entry: {
        index: __dirname + '/index.js'
    },
    output: {
        path: __dirname + '/dist',//产出路径，一般放在dist目录下
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader'
            }
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin({
            // sourceMap: true,
            // terserOptions: {
            //     safari10: true
            // }
        })],
    }
}