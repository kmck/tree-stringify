var autoprefixer = require('autoprefixer');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output:  {
        path: __dirname + '/dist',
        filename: '[name].js',
    },
    module: {
        loaders: [{
            test: /\.scss$/, loader: 'style!css!postcss!sass',
        }, {
            test: /\.json$/, loader: 'json',
        }],
    },
    postcss: [
        autoprefixer({
            browsers: [
                'last 3 versions',
            ],
        }),
    ],
};
