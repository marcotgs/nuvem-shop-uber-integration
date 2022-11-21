import { findAccountByStoreId } from '../accounts';

const collectionName = 'shipping';

export const getShippingCollection = async (storeId: string) => {
	const accountsData = await findAccountByStoreId(storeId);
	return accountsData.collection(collectionName);
};

export const findShippingInfo = async (storeId: string) => {
	const shippingCollection = await getShippingCollection(storeId);
	const {
		docs: [shippingDoc],
	} = await shippingCollection.get();

	return shippingDoc.ref;
};
