import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient } from '@nuvemshop-uber/nuvem-api';
import { addAccount } from '@nuvemshop-uber/db';

const { auth } = apiClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { code } = req.query as { code: string };

		await addAccount(await auth.authorize(code));

		res.send('Welcome!');
	} catch (error: any) {
		console.error(error);
		res.status(500).json({ error: error.message });
	}
};
