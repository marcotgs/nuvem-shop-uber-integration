import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient, NuvemAuthResponse } from '@nuvemshop-uber/nuvem-api';
import { account, shipping, shippingOptions, DBAccount, DBShipping } from '@nuvemshop-uber/db';
import { generateAuthToken } from '@core/auth';

const client = apiClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');

	try {
		const { code } = req.query as { code: string };

		const authResponse = (await client.auth.authorize(code)) as NuvemAuthResponse;
		const accountData: DBAccount = {
			storeId: authResponse.user_id,
			storeToken: authResponse.access_token,
			tokenType: authResponse.token_type,
			scope: authResponse.scope,
		};

		const { addShippingCarrier, addShippingOption } = client.shippingApi({
			storeToken: accountData.storeToken,
			storeId: accountData.storeId,
		});

		const shippingData = await addShippingCarrier({
			name: 'Uber',
			types: 'ship',
			callback_url: `${process.env.BASE_URL}/api/shipping/estimate`,
		});

		const shippingOptionData = await addShippingOption(shippingData.id, {
			allow_free_shipping: false,
			additional_cost: 0,
			additional_days: 0,
			name: 'Motoboy',
			code: 'uber',
			active: true,
		});

		const token = generateAuthToken(accountData);

		await account.update({
			...accountData,
			token,
		});
		await shipping.add(accountData.storeId, shippingData as DBShipping);
		await shippingOptions.add(accountData.storeId, shippingOptionData);

		res.send(`App instalado com sucesso! Você pode fechar essa página. ${token}`);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
