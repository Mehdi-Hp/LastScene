const vueConfig = require("@vue/cli-service/webpack.config.js");

module.exports = async ({ config, mode }) => {
    config.module.rules.push({
        test: /stories\.js?$/,
        loaders: [require.resolve('@storybook/source-loader')],
        enforce: 'pre',
    });
    return {
        ...config,
        module: {
            ...vueConfig.module,
            ...config.module,
            rules: [
                ...config.module.rules,
                ...vueConfig.module.rules.filter((vueRule) => {
                    return !vueRule.test.toString().includes('vue')
                })
            ]
        }
    };
};
