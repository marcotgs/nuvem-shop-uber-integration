import { findAccountByUserId } from '../accounts';
import { DBShipping } from './types';

const collectionName = 'shipping';

export const getShippingCollection = async (userId: string) => {
	const accountsData = await findAccountByUserId(userId);
	return accountsData.collection(collectionName);
};

export const findShippingInfo = async (userId: string) => {
	const shippingCollection = await getShippingCollection(userId);
	const {
		docs: [shippingDoc],
	} = await shippingCollection.get();

	return shippingDoc.ref;
};
