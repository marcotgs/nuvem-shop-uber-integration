import { DBShipping, findShippingInfo, getShippingCollection } from '../collections/shipping';

export const get = async (storeId: string) => {
	return await findShippingInfo(storeId);
};

export const data = async (storeId: string) => {
	const shippingRef = await findShippingInfo(storeId);
	const shippingDoc = await shippingRef.get();
	return shippingDoc.data() as DBShipping;
};

export const add = async (storeId: string, shipping: DBShipping) => {
	return (await getShippingCollection(storeId)).add(shipping);
};

export const shipping = { get, data, add };
