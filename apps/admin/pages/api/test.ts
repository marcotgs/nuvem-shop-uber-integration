import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	res.setHeader('Content-Type', 'application/json; charset=utf-8');

	try {
		console.log(process.env.BASE_URL);
		res.send(200);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
