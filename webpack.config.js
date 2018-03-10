const webpack = require('webpack');
// const Dotenv = require('dotenv-webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssPlugins = require('./postcss.config');
const DashboardPlugin = require('webpack-dashboard/plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

require('pretty-error').start();

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const productionPath = path.resolve(__dirname, 'public', 'production');
const mainJSPath = path.resolve(__dirname, 'development', 'main.js');

const {ifProduction, ifNotProduction} = getIfUtils(process.env.NODE_ENV)

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
						'./development/assets/notcss/_vendor/_all-vendors.scss',
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
					'./development/assets/notcss/_vendor/_all-vendors.scss',
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
				use: {
					loader: 'babel-loader',
					options: {
						plugins: ['@babel/plugin-syntax-object-rest-spread', 'lodash'],
						presets: [
							['@babel/preset-env', {
								targets: {
									browsers: ['last 2 versions']
								},
								spec: true
							}]
						]
						// env: {
						// 	production: {
						// 		presets: ['minify', {
						// 			removeUndefined: false
						// 		}]
						// 	}
						// }
					}
				},
				exclude: [nodeModulesPath]
			})
		]
	},
	plugins: removeEmpty([
		new HtmlWebpackPlugin({
			template: 'views/index.html',
			inject: true,
			filename: 'index.html'
		}),
		ifProduction(new HtmlWebpackIncludeAssetsPlugin({
			assets: [
				'main.bundle.css',
				'bundle.js'
			],
			append: true,
			publicPath: '/production/'
		})),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		ifNotProduction(new DashboardPlugin({
			minified: false,
			gzip: false
		})),
		ifProduction(new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})),
		ifProduction(new LodashModuleReplacementPlugin({
			shorthands: true,
			cloning: true,
			collections: true,
			paths: true,
			flattening: true
		})),
		ifProduction(new webpack.optimize.UglifyJsPlugin()),
		// ifProduction(new BundleAnalyzerPlugin()),
		ifProduction(new ExtractTextPlugin('[name].bundle.css')),
		ifProduction(new webpack.LoaderOptionsPlugin({
			minimize: true,
			quiet: true
		}))
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
			'/api': 'http://localhost:3000',
			'/files': 'http://localhost:3000'
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
