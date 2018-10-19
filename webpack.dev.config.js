const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const postcssPlugins = require('./postcss.dev.config');

const smp = new SpeedMeasurePlugin();

require('pretty-error').start();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const productionPath = path.resolve(__dirname, 'public', 'production');
const mainJSPath = path.resolve(__dirname, 'development', 'main.js');

module.exports = smp.wrap({
	entry: [mainJSPath],
	context: path.resolve(__dirname),
	output: {
		path: productionPath,
		publicPath: '/',
		filename: 'bundle.js'
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
					{
						loader: 'css-loader',
						options: {
							importLoaders: 4,
							import: false,
							minimize: false
						}
					},
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
							resources: ['./development/assets/notcss/_utils/_all-utils.scss']
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
	mode: 'development',
	optimization: {
		namedModules: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'views/index-dev.html',
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin(),
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, 'development'),
			'@@': path.resolve(__dirname, 'development', 'components')
		}
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		publicPath: '/',
		noInfo: false,
		compress: false,
		historyApiFallback: true,
		disableHostCheck: true,
		hot: true,
		watchOptions: {
			ignored: nodeModulesPath
		},
		progress: true,
		proxy: {
			'/api': 'http://localhost:3000',
			'/files': 'http://localhost:3000',
			'/authenticate': 'http://localhost:3000'
		},
		overlay: {
			warnings: true,
			errors: true
		},
		open: false
	},
	performance: {
		hints: false
	},
	devtool: 'cheap-module-source-map'
});
