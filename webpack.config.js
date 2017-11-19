const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssPlugins = require('./postcss.config');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const productionPath = path.resolve(__dirname, 'public', 'production');
const developmentPath = path.resolve(__dirname, 'public', 'development');
const mainJSPath = path.resolve(__dirname, 'development', 'main.js');

const { ifProduction } = getIfUtils(process.env.NODE_ENV);

let myCSSLoader = {};
if (ifProduction()) {
	myCSSLoader = ExtractTextPlugin.extract({
		use: [
			{
				loader: 'css-loader',
				options: {
					importLoaders: 1
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
					plugins: [

					]
				}
			}
		]
	});
} else {
	myCSSLoader = [
		{
			loader: 'style-loader'
		},
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1
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
				plugins: [

				]
			}
		}
	];
}

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
				test: /\.(ttf|otf|eot|svg|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[ext]'
				},
				exclude: [nodeModulesPath]
			}),
			removeEmpty({
				test: /\.(jpe?g|png|gif)$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
							useRelativePath: true
						}
					}
				],
				exclude: [nodeModulesPath]
			}),
			removeEmpty({
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: [nodeModulesPath]
			}),
			removeEmpty({
				test: /(main\.scss|\.css)$/,
				use: myCSSLoader
			}),
			removeEmpty({
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					plugins: ['lodash'],
					presets: [['env', { modules: false, targets: { node: 4 } }]]
				}
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
		new webpack.NamedModulesPlugin(),
		new DashboardPlugin(),
		new LodashModuleReplacementPlugin(),
		ifProduction(new BundleAnalyzerPlugin()),
		ifProduction(new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})),
		ifProduction(new ExtractTextPlugin('[name].bundle.css')),
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
		contentBase: process.cwd(),
		publicPath: '/',
		noInfo: true,
		compress: true,
		historyApiFallback: true,
		hot: true,
		proxy: {
			'^/api/*': {
				target: 'http://localhost:3000/api/v1/',
				secure: false
			}
		},
		overlay: {
			warnings: true,
			errors: true
		},
		open: false
	},
	performance: {
		hints: false
	}
};
