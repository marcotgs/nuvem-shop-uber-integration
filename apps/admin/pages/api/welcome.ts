import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient, NuvemAuthResponse } from '@nuvemshop-uber/nuvem-api';
import { addAccount } from '@nuvemshop-uber/db';

const { auth, shipping } = apiClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');

	try {
		const { code } = req.query as { code: string };

		console.log(shipping);

		const authResponse = (await auth.authorize(code)) as NuvemAuthResponse;

		const a = shipping({
			authToken: authResponse.access_token,
			storeId: authResponse.user_id,
		});

		console.log(a);
		// await a.addShippingCarrier({
		// 	name: 'Motoboy',
		// 	types: 'ship',
		// 	callback_url: 'https://localhost:4000/api/shipping/estimate',
		// });

		await addAccount({
			accessToken: authResponse.access_token,
			tokenType: authResponse.token_type,
			scope: authResponse.scope,
			userId: authResponse.user_id,
		});

		res.send('App instalado com sucesso! Você pode fechar essa página.');
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
