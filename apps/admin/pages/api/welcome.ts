import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient, NuvemAuthResponse } from '@nuvemshop-uber/nuvem-api';
import { account, shipping, DBAccount, DBShipping } from '@nuvemshop-uber/db';

const client = apiClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');

	try {
		const { code } = req.query as { code: string };

		const authResponse = (await client.auth.authorize(code)) as NuvemAuthResponse;
		const accountData: DBAccount = {
			userId: authResponse.user_id,
			accessToken: authResponse.access_token,
			tokenType: authResponse.token_type,
			scope: authResponse.scope,
		};

		const { addShippingCarrier } = client.shipping({
			authToken: accountData.accessToken,
			storeId: accountData.userId,
		});

		const shippingData = await addShippingCarrier({
			name: 'Motoboy',
			types: 'ship',
			callback_url: `${process.env.BASE_URL}/api/shipping/estimate`,
		});

		console.log(shippingData, shippingData as DBShipping);

		await account.update(accountData);
		await shipping.add(accountData.userId, shippingData as DBShipping);

		res.send('App instalado com sucesso! Você pode fechar essa página.');
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
