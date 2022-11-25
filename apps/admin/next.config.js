/** @type {import('next').NextConfig} */
const packageJSON = require('./package.json');
// const { loadEnvConfig } = require('@next/env');
const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
	it.includes('@nuvemshop-uber/'),
);

const withTM = require('next-transpile-modules')(transpiledPackages);
// const [{contents}] = loadEnvConfig(process.cwd()).loadedEnvFiles;

const nextConfig = withTM({
	reactStrictMode: true,
	swcMinify: true,
	output: 'standalone',
	// env: contents.split('\n').reduce((acc, line) => ({...acc, [line.split('=')[0]]: line.split('=')[1]}), {}),
	env: {
		BASE_URL: 'https://nuvem-shop-uber-integration-5ffh6ua6pq-tl.a.run.app',
		NEXT_PUBLIC_API_URL: 'https://nuvem-shop-uber-integration-5ffh6ua6pq-tl.a.run.app',
		APP_NAME: 'NuvemShop + Uber (5728)',
		JWT_SECRET: 'rn6mtUUignBqQ&Q4@MhpC776%Nd6E%*',
	},
});

module.exports = nextConfig;
