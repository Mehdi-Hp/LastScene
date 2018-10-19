const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPlugins = require('./postcss.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

require('pretty-error').start();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const productionPath = path.resolve(__dirname, 'public', 'production');
const mainJSPath = path.resolve(__dirname, 'development', 'main.js');

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
				test: /(\.scss|\.pcss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 4,
							import: false,
							minimize: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							syntax: 'postcss-scss',
							map: false,
							plugins: postcssPlugins
						}
					},
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							syntax: 'postcss-scss',
							map: false,
							plugins: []
						}
					},
					{
						loader: 'style-resources-loader',
						options: {
							patterns: ['./development/assets/notcss/_utils/_all-utils.scss', './development/assets/notcss/_vendor/_all-vendors.scss']
						}
					}
				]
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['@babel/plugin-syntax-object-rest-spread', 'lodash'],
						presets: [
							[
								'@babel/preset-env',
								{
									targets: {
										browsers: ['last 2 versions']
									},
									spec: true
								}
							]
						]
					}
				},
				exclude: [nodeModulesPath]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'views/index-prod.html',
			inject: false,
			filename: 'index.html'
		}),
		new LodashModuleReplacementPlugin({
			shorthands: true,
			cloning: true,
			collections: true,
			paths: true,
			flattening: true
		}),
		new MiniCssExtractPlugin({
			filename: '[name].bundle.css'
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			quiet: true
		})
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	optimization: {
		namedModules: true
	},
	performance: {
		hints: false
	},
	mode: 'production'
};
