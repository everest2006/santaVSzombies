var path = require('path');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            path.resolve(__dirname, "./js/index.js")
        ]
    },
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] }
        ]
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
        }
    }
};