import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient } from '@nuvemshop-uber/nuvem-api';

const { auth } = apiClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { code } = req.query as { code: string };

		const authorization = await auth.authorize(code);

		console.log(authorization);

		res.send('Welcome!');
	} catch (error: any) {
		res.status(500).json(JSON.parse(error.message));
	}
};
