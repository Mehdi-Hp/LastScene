module.exports = [
	require('postcss-console')(),
	require('postcss-discard-duplicates')(),
	require('css-declaration-sorter')(),
	// require('postcss-uncss')(),
	require('postcss-atrule-bem'),
	// require('postcss-color-palette')(),
	require('postcss-media-minmax')(),
	require('postcss-g-index')(),
	require('rucksack-css')(),
	require('postcss-hocus')(),
	require('postcss-normalize')(),
	require('postcss-placehold')(),
	require('postcss-shape')(),
	require('postcss-input-style')(),
	require('postcss-short')(),
	require('postcss-aspect-ratio')(),
	require('postcss-magic-animations')(),
	require('postcss-light-text')(),
	require('postcss-selector-not')(),
	require('postcss-gradient-transparency-fix')(),
	require('postcss-easing-gradients')(),
	require('postcss-ant')(),
	require('autoprefixer')({
		browsers: ['last 2 versions']
	}),
	require('cssnano')({
		preset: 'default'
	})
];
