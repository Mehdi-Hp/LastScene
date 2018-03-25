const webpack = require('webpack');
const path = require('path');
const postcssPlugins = require('./postcss.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

require('pretty-error').start();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const productionPath = path.resolve(__dirname, 'public', 'production');
const mainJSPath = path.resolve(__dirname, 'development', 'main.js');

module.exports = {
	entry: [mainJSPath],
	output: {
		path: productionPath,
		publicPath: '/',
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
					{
						loader: 'style-loader'
					},
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
						loader: 'sass-resources-loader',
						options: {
							resources: [
								'./development/assets/notcss/_utils/_all-utils.scss',
								'./development/assets/notcss/_vendor/_all-vendors.scss'
							]
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
	mode: 'development',
	optimization: {
		namedModules: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'views/index-dev.html',
			inject: true,
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin()
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		publicPath: '/',
		noInfo: true,
		compress: false,
		historyApiFallback: true,
		disableHostCheck: true,
		hot: true,
		watchOptions: {
			ignored: '/node_modules/'
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
	devtool: 'eval'
};
