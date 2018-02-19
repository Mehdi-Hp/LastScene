const webpack = require('webpack');
// const Dotenv = require('dotenv-webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssPlugins = require('./postcss.config');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
// const Jarvis = require('webpack-jarvis');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('pretty-error').start();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const productionPath = path.resolve(__dirname, 'public', 'production');
// const developmentPath = path.resolve(__dirname, 'public', 'development');
const mainJSPath = path.resolve(__dirname, 'development', 'main.js');

const { ifProduction } = getIfUtils(process.env.NODE_ENV);

let myCSSLoader = {};
if (ifProduction()) {
	myCSSLoader = ExtractTextPlugin.extract({
		use: [
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
					plugins: [

					]
				}
			},
			{
				loader: 'sass-resources-loader',
				options: {
					resources: [
						'./development/assets/notcss/_utils/_all-vendors.scss',
						'./development/assets/notcss/_utils/_all-utils.scss'
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
				plugins: [

				]
			}
		},
		{
			loader: 'sass-resources-loader',
			options: {
				resources: [
					'./development/assets/notcss/_utils/_all-vendors.scss',
					'./development/assets/notcss/_utils/_all-utils.scss'
				]
			}
		}
	];
}

module.exports = {
	entry: [
		mainJSPath
	],
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
			removeEmpty({
				test: /\.(ttf|otf|eot|woff|woff2)$/,
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
							name: 'images/[name].[ext]'
						}
					}
				],
				exclude: [nodeModulesPath]
			}),
			removeEmpty({
				test: /\.svg$/,
				loader: 'svg-sprite-loader'
			}),
			removeEmpty({
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: [nodeModulesPath]
			}),
			removeEmpty({
				test: /(\.scss|\.pcss)$/,
				use: myCSSLoader
			}),
			removeEmpty({
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					plugins: ['lodash'],
					presets: [['env', { modules: false, targets: { node: 4 } }]]
				},
				exclude: [nodeModulesPath]
			})
		]
	},
	plugins: removeEmpty([
		new HtmlWebpackPlugin({
			template: 'views/index.ejs',
			inject: true,
			filename: 'index.html'
		}),
		new HtmlWebpackIncludeAssetsPlugin({
			assets: [

			],
			append: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new DashboardPlugin(),
		// new Jarvis({
		// 	port: 1337
		// }),
		ifProduction(new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})),
		ifProduction(new LodashModuleReplacementPlugin({
			collections: true,
			paths: true
		})),
		ifProduction(new webpack.optimize.UglifyJsPlugin()),
		// ifProduction(new BundleAnalyzerPlugin()),
		ifProduction(new ExtractTextPlugin('[name].bundle.css')),
		ifProduction(new webpack.LoaderOptionsPlugin({
			minimize: true,
			quiet: true
		}))
		// ifProduction(new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		screw_ie8: true,
		// 		warnings: false
		// 	},
		// 	sourceMap: false
		// }))
	]),
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js'
		}
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		publicPath: '/',
		noInfo: true,
		compress: true,
		historyApiFallback: true,
		disableHostCheck: true,
		hot: true,
		watchOptions: {
			ignored: '/node_modules/'
		},
		progress: true,
		proxy: {
			'/api': 'http://localhost:3000'
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
