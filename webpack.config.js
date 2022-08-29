'use strict';

const path = require('path');
const glob = require('glob');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const CopyPlugin = require('copy-webpack-plugin');
const tsConfigPath = 'tsconfig.json';

const toEntry = (filesPaths) => {
	const entries = {};
	filesPaths.forEach((filePath) => {
		const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
		entries[fileName.replace(/\.ts$/, '')] = filePath;
	});
	return entries;
};

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
		entry: './src/functions/index.ts',
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].js',
			libraryTarget: 'commonjs2',
		},
		target: 'node',
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
