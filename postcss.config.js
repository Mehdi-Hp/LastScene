/* eslint-disable global-require */

module.exports = [
	// require('postcss-uncss')(),
	require('postcss-bem')({
		defaultNamespace: undefined,
		style: 'bem',
		separators: {
			namespace: '-',
			descendent: '__',
			modifier: '--'
		}
	}),
	require('postcss-color-palette')(),
	require('postcss-media-minmax')(),
	require('postcss-g-index')(),
	require('rucksack-css')(),
	require('postcss-all-link-colors')(),
	require('postcss-hocus')(),
	require('postcss-placehold')(),
	require('postcss-circle')(),
	require('postcss-input-style')(),
	require('postcss-brand-colors')(),
	require('postcss-short')(),
	require('postcss-aspect-ratio')(),
	require('autoprefixer')({
		browsers: ['last 2 versions']
	})
];

if (process.env.NODE_ENV === 'production') {
	module.exports.push(
		require('cssnano')({
			preset: 'default'
		})
	);
}
