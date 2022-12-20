interface Env {
	[key: string]: string;
}

export const getEnv = (): Env => {
	const env = process.env.APP_ENV || 'development';
	return require(`./env.${env}.js`).default;
};
