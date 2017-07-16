const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssPlugins = require('./postcss.config');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const productionPath = path.resolve(__dirname, 'public', 'production');
const mainJSPath = path.resolve(__dirname, 'public', 'development', 'main.js');

const { ifProduction } = getIfUtils(process.env.NODE_ENV);
// const { ifDevelopment } = getIfUtils(process.env.NODE_ENV);

module.exports = {
	entry: [
		'webpack-hot-middleware/client?reload=true',
		mainJSPath
	],
	output: {
		path: productionPath,
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			removeEmpty({
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: ifProduction(true),
					postcss: {
						plugins: postcssPlugins
					}
				},
				exclude: [nodeModulesPath]
			}),
			removeEmpty({
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [nodeModulesPath]
			}),
			removeEmpty({
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]',
					limit: 10000
				},
				exclude: [nodeModulesPath]
			})
		]
	},
	plugins: removeEmpty([
		new HtmlWebpackPlugin({
			template: 'views/index.ejs',
			inject: 'body',
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		ifProduction(new ExtractTextPlugin('[name].bundle.css')),
		new webpack.NamedModulesPlugin(),
		new DashboardPlugin(),
		ifProduction(new webpack.LoaderOptionsPlugin({
			minimize: true,
			quiet: true
		})),
		ifProduction(new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})),
		ifProduction(new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			},
			sourceMap: false
		}))
	]),
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	devServer: {
		publicPath: '/',
		noInfo: true,
		compress: true,
		historyApiFallback: true,
		hot: true,
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
