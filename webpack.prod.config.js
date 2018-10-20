const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPlugins = require('./postcss.prod.config');

require('pretty-error').start();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const developmentPath = path.resolve(__dirname, 'public', 'development');
const productionPath = path.resolve(__dirname, 'public', 'production');
const mainJSPath = path.resolve(__dirname, 'public', 'development', 'main.js');

module.exports = {
	entry: [mainJSPath],
	output: {
		path: productionPath,
		publicPath: './',
		filename: 'bundle.js'
	},
	stats: {
		children: false
	},
	module: {
		rules: [
			{
				test: /\.(ttf|otf|eot|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				},
				exclude: [nodeModulesPath]
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]'
						}
					}
				],
				exclude: [nodeModulesPath]
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: [nodeModulesPath]
			},
			{
				test: /(\.scss|\.pcss|\.css)$/,
				use: [
					{
						loader: 'vue-style-loader'
					},
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							syntax: 'postcss-scss',
							map: false,
							plugins: postcssPlugins
						}
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [`${developmentPath}/assets/notcss/_utils/_all-utils.scss`]
						}
					}
				],
				exclude: [nodeModulesPath]
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: [nodeModulesPath]
			}
		]
	},
	mode: 'production',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'views/index-prod.html',
			inject: false,
			filename: 'index.html'
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			quiet: true
		}),
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': path.join(__dirname, 'public', 'development'),
			'@@': path.join(__dirname, 'public', 'development', 'components')
		}
	}
};
