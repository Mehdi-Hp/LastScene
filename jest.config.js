module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
    },
    setupFilesAfterEnv: ["jest-extended"],
    moduleFileExtensions: ['js', 'vue'],
    collectCoverageFrom: [
        'packages/**/src/*.js',
        '!*.config.js'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__test__/',
        '/__mocks__/',
        '/dist/'
    ]
};
