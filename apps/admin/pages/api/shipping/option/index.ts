import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient, NuvemAuthResponse } from '@nuvemshop-uber/nuvem-api';
import { DBShippingOption, shipping } from '@nuvemshop-uber/db';
import { GET, POST } from '@core/api/types';
import { getAuthData } from '@core/auth';

const { auth, shippingApi } = apiClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const {
			body,
			method,
			headers: { authorization },
		} = req;

		const { storeId } = getAuthData(authorization?.split('Beacon')[1]!);
		const accountData = await shipping.data(storeId);

		const shippingOptions = shippingApi({
			storeToken: accountData.storeToken,
			storeId: accountData.storeId,
		});

		switch (method) {
			case GET:
				// TODO: LIST SHIPPING OPTIONS
				break;
			case POST: {
				const { code } = body as DBShippingOption;
				shippingOptions.addShippingOption(code);
				// res.status(200).json({ shippingOptionId, name: `User ${shippingOptionId}` });
				break;
			}
			default:
				res.setHeader('Allow', [GET, POST]);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
