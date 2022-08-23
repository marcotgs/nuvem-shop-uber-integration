'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const CopyPlugin = require('copy-webpack-plugin');
const tsConfigPath = 'tsconfig.json';

const customStats = {
	stats: {
		colors: true,
		hash: false,
		version: false,
		timings: false,
		assets: false,
		chunks: false,
		modules: false,
		reasons: false,
		children: false,
		source: false,
		errorDetails: false,
		warnings: false,
		publicPath: false,
	},
};

module.exports = (_env, argv) => {
	const isDevelopment = argv.mode === 'development';
	return {
		entry: './src/main.ts',
		devtool: 'nosources-source-map',
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].js',
			sourceMapFilename: '[file].map',
			libraryTarget: 'commonjs',
		},
		optimization: {
			minimize: !isDevelopment,
		},
		performance: {
			hints: false,
		},
		module: {
			rules: [
				{
					test: /\.ts?$/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								configFile: tsConfigPath,
							},
						},
					],
				},
			],
		},
		resolve: {
			extensions: ['.ts'],
			plugins: [new TsconfigPathsPlugin({ configFile: tsConfigPath })],
		},
		plugins: [
			new CopyPlugin({
				patterns: [{ from: './package.json', to: '.' }],
			}),
			new WebpackShellPluginNext({
				onDoneWatch: {
					scripts: ['yarn start'],
					blocking: false,
					parallel: true,
				},
			}),
		],
		externalsPresets: { node: true },
		externals: [
			nodeExternals({
				additionalModuleDirs: [path.resolve(__dirname, '../../node_modules')],
			}),
		],
		...(isDevelopment && customStats),
	};
};
