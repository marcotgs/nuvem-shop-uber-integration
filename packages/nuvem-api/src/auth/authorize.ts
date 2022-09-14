import { api } from '../lib/client';

export const authorize = async (code: string) => {
	const response = await api.auth('authorize', {
		method: 'POST',
		body: JSON.stringify({
			code,
			grant_type: 'authorization_code',
			client_id: '0000',
			client_secret: 'xxxxxxxx',
		}),
	});
	return response.json();
};
