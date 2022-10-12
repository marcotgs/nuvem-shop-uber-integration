import { getEnv } from '../environments';
import { api } from '../lib/client';
import { NuvemAuthResponse } from './types';

const env = getEnv();

export const authorize = async (code: string): Promise<NuvemAuthResponse | Error> => {
	const response = await api.auth('/authorize/token', {
		method: 'POST',
		body: JSON.stringify({
			code,
			grant_type: 'authorization_code',
			client_id: env.APP_CLIENT_ID,
			client_secret: env.APP_CLIENT_SECRET,
		}),
	});

	const json = await response.json();

	if (json.error) {
		throw new Error(JSON.stringify(json));
	}
	return json;
};
