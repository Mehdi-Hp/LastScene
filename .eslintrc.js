module.exports = {
	plugins: ['xss', 'security', 'promise', 'no-loops'],
	extends: [
		'airbnb',
		'prettier',
		'prettier/standard',
		'plugin:vue/recommended',
		'plugin:security/recommended',
		'plugin:promise/recommended',
		'plugin:array-func/recommended'
	],
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'no-param-reassign': ['error', { props: false }],
		'no-unused-vars': [
			'error',
			{ vars: 'all', args: 'none', ignoreRestSiblings: false }
		],
		'arrow-body-style': ['error', 'always'],
		'space-before-function-paren': ['error', 'never'],
		'comma-dangle': ['error', 'never'],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
				optionalDependencies: false,
				peerDependencies: false
			}
		],
		'consistent-return': 'off',
		'no-shadow': 'off',
		'no-plusplus': 'off',
		'no-prototype-builtins': 'off',
		'no-underscore-dangle': 'off',
		'global-require': 'off',
		'prefer-promise-reject-errors': 'off',
		'function-paren-newline': 'off',
		'no-console': 'off',
		'prefer-arrow-callback': 'off',
		'func-names': 'off',
		'max-len': 'off',
		'vue/html-indent': ['error', 'tab'],
		'vue/max-attributes-per-line': [{ singleline: 1 }],
		'vue/html-self-closing': 'off',
		'vue/attributes-order': 'off',
		'vue/require-prop-types': 'off',
		'no-loops/no-loops': 2
	}
};
