import fetch, { RequestInit } from 'node-fetch';
import { NuvemApiClient, NuvemResponse } from './types';

export const api = (() => {
	const client =
		({ storeId, authToken }: NuvemApiClient = {}) =>
		async <T extends any>(path: string, options: RequestInit = {}) => {
			console.log(options, authToken, storeId);
			const response = await fetch(`https://api.nuvemshop.com.br/v1/${storeId}${path}`, {
				...options,
				headers: {
					...options.headers,
					'Content-Type': 'application/json',
					'User-Agent': process.env.APP_NAME as string,
					Authentication: `bearer ${authToken}`,
				},
			});

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return response.json() as Promise<NuvemResponse<T>>;
		};

	const auth = (path: string, options: RequestInit = {}) =>
		fetch(`https://www.nuvemshop.com.br/apps${path}`, {
			...options,
			headers: {
				...options.headers,
				'Content-Type': 'application/json',
			},
		});
	return {
		client,
		auth,
	};
})();
