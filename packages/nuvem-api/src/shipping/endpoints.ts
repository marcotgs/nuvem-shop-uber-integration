import { NuvemApiClient } from '../lib/types';
import { api } from '../lib/client';
import { NuvemShippingCarrier } from './types';

export const shipping = (options: NuvemApiClient) => {
	const apiClient = api.client(options);

	const addShippingCarrier = async (data: NuvemShippingCarrier) =>
		apiClient<NuvemShippingCarrier>('/shipping_carriers', {
			method: 'POST',
			body: JSON.stringify(data),
		});

	return {
		addShippingCarrier,
	};
};
