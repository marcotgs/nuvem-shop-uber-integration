import { DBDoc } from '../collections/types';
import {
	DBShippingOption,
	findShippingOption,
	getShippingOptionsCollection,
} from '../collections/shipping-options';

const get = async (storeId: string, shippingOptionId: string) => {
	return await findShippingOption(storeId, shippingOptionId);
};

const add = async (storeId: string, newOption: DBShippingOption) => {
	const shippingOptions = await getShippingOptionsCollection(storeId);
	return shippingOptions.add(newOption);
};

const update = async (storeId: string, shippingOption: DBDoc<DBShippingOption>) => {
	const { meta, ...shippingOptionData } = shippingOption;
	let shippingOptionDoc = await get(storeId, meta?.docId as string);

	if (!shippingOptionDoc?.id) {
		console.warn(`[WARN]: Shipping Option with Id ${meta?.docId} was not found, adding...`);
		shippingOptionDoc = await add(storeId, shippingOptionData);
	} else {
		shippingOptionDoc.update({ ...shippingOptionData });
	}
};

export const shippingOptions = { get, add, update };
