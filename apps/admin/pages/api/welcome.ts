import type { NextApiRequest, NextApiResponse } from 'next';
// import { apiClient } from '@nuvemshop-uber/nuvem-api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { code } = req.body as { code: string };
	// const { auth } = apiClient();

	// await auth.authorize(code);

	res.send('Obrigado por instalar a aplicação!');
};
