import { getShippingCollection } from '../shipping';

const collectionName = 'options';

export const getShippingOptionsCollection = async (storeId: string) => {
	const shippingCollection = await getShippingCollection(storeId);
	return shippingCollection.doc().collection(collectionName);
};

export const findShippingOption = async (storeId: string, shippingOptionId: string) => {
	const shippingOptionCollection = await getShippingOptionsCollection(storeId);
	const shippingOption = await shippingOptionCollection.doc(shippingOptionId).get();

	return shippingOption.data();
};
