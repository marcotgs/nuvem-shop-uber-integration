import fetch, { RequestInit } from 'node-fetch';
import { ApiClient } from './types';

export const api = (() => {
	const client =
		({ storeId, authToken }: ApiClient = {}) =>
		(path: string, options: RequestInit = {}) =>
			fetch(`https://api.nuvemshop.com.br/v1/${storeId}/${path}`, {
				...options,
				headers: {
					...options.headers,
					'Content-Type': 'application/json',
					'User-Agent': 'NuvemShop + Uber (marcotuliog.dev@gmail.com)',
					Authentication: `bearer ${authToken}`,
				},
			});

	const auth = (path: string, options: RequestInit = {}) =>
		fetch(`https://nuvemshop.com.br/apps/${path}`, {
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
