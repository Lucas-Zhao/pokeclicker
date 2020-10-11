const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/modules/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfigWithModules.json',
                }
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'modules.min.js',
        path: path.resolve(__dirname, 'build'),
    },
};
