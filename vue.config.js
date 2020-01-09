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

    chainWebpack: (config) => {
        config.plugins.delete('progress');
    }
};
