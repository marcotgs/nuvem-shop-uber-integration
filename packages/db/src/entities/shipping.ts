import { DBShipping, findShippingInfo, getShippingCollection } from '../collections/shipping';

export const get = async (userId: string) => {
	return await findShippingInfo(userId);
};

export const add = async (userId: string, shipping: DBShipping) => {
	return (await getShippingCollection(userId)).add(shipping);
};

export const shipping = { get, add };
