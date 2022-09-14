import fetch from 'node-fetch';
import { UberResponse } from './types';

export const locale = 'pt-BR';
export const fetchUberApi = async <T>(path: string, body: object): Promise<UberResponse<T>> => {
	const res = await fetch(`https://www.uber.com/api/${path}?localeCode=${locale}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-csrf-token': 'x',
		},
		body: JSON.stringify({
			...body,
			locale,
		}),
	});

	return res.json() as UberResponse<T>;
};
