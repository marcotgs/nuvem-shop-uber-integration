import { NextApiRequest } from 'next';

export const getAuthData = (req: NextApiRequest) => {
	const accountId = req.cookies.accountId;

	if (!accountId) {
		throw new Error('Missing authentication data');
	}

	return { accountId };
};
