import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient, NuvemAuthResponse } from '@nuvemshop-uber/nuvem-api';
import { addAccount } from '@nuvemshop-uber/db';
import { GET, POST } from '@core/api/types';
import { getAuthData } from '@core/auth';

const { auth, shipping } = apiClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const {
			query: { shippingOptionId },
			method,
		} = req;

		const authData = getAuthData(req);

		switch (method) {
			case GET:
				res.status(200).json({ shippingOptionId, name: `User ${shippingOptionId}` });
				break;
			case POST:
				res.status(200).json({ shippingOptionId, name: `User ${shippingOptionId}` });
				break;
			default:
				res.setHeader('Allow', [GET, POST]);
				res.status(405).end(`Method ${method} Not Allowed`);
		}
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
