/** @type {import('next').NextConfig} */
const packageJSON = require('./package.json');
const transpiledPackages = Object.keys(packageJSON.dependencies).filter((it) =>
	it.includes('@nuvemshop-uber/'),
);

const withTM = require('next-transpile-modules')(transpiledPackages);

const nextConfig = withTM({
	reactStrictMode: true,
	swcMinify: true,
});

module.exports = nextConfig;
