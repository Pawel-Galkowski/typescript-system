// Generated using webpack-cli https://github.com/webpack/webpack-cli

import { resolve as _resolve } from 'path';
import path from 'path';
import { GenerateSW } from 'workbox-webpack-plugin';
import { fileURLToPath } from 'url';

const isProduction = process.env.NODE_ENV == 'production';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    entry: './src/index.ts',
    target: 'node',
    output: {
        path: _resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
          } 
    },
};

export default () => {
    if (isProduction) {
        config.mode = 'production';
        
        
        config.plugins.push(new GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
