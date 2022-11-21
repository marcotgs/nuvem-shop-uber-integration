import { DBAccount } from '@nuvemshop-uber/db';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getAuthData = (token: string) => {
	const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

	return { storeId: decoded.storeId };
};

export const generateAuthToken = ({ storeId }: DBAccount) => {
	return jwt.sign({ storeId }, process.env.JWT_SECRET as string, {
		expiresIn: '7d',
	});
};
