module.exports = [
	require('postcss-discard-duplicates')(),
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
	require('postcss-flexbox')(),
	require('autoprefixer')({
		browsers: ['last 2 versions']
	})
];
