const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BitBarWebpackProgressPlugin = require('bitbar-webpack-progress-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const postcssPlugins = require('./postcss.dev.config');

const smp = new SpeedMeasurePlugin();

require('pretty-error').start();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const developmentPath = path.resolve(__dirname, 'public', 'development');
const productionPath = path.resolve(__dirname, 'public', 'production');
const mainJSPath = path.resolve(__dirname, 'public', 'development', 'main.js');

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
							map: true,
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
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'views/index-dev.html',
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin(),
		new BitBarWebpackProgressPlugin(),
		new VueLoaderPlugin()
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			"@images": path.resolve(__dirname, 'public/development/assets/images'),
			"@icons": path.resolve(__dirname, 'public/development/components/icons'),
			"@notcss": path.resolve(__dirname, 'public/development/assets/notcss'),
			"@components": path.resolve(__dirname, 'public/development/components'),
			"@store": path.resolve(__dirname, 'public/development/store'),
			"@services": path.resolve(__dirname, 'public/development/services'),
			"@root": path.resolve(__dirname, 'public/development/')
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
