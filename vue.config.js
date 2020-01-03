module.exports = {
    lintOnSave: false,

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                './src/assets/styles/helpers/*.scss'
            ]
        }
    },

    assetsDir: 'assets',
    productionSourceMap: false,

    css: {
        sourceMap: true
    },

    chainWebpack: (config) => {
        config.plugins.delete('progress');
    }
};
