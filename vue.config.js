const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');

module.exports = {
    lintOnSave: false,

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                './src/assets/styles/helpers/*.scss',
                './src/assets/styles/variables/index.scss'
            ]
        }
    },

    assetsDir: 'assets',
    productionSourceMap: false,

    css: {
        sourceMap: true
    },

    configureWebpack: {
        plugins: [
            new BitBarWebpackProgressPlugin()
        ]
    },

    chainWebpack: (config) => {
        config.plugins.delete('progress');
    }
};
