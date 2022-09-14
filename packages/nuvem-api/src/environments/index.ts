interface Env {
	[key: string]: string;
}

export const getEnv = (): Env => {
	const env = process.env.NODE_ENV || 'development';
	return require(`./env.${env}.js`).default;
};
