import { NuvemApiClient } from '../lib/types';
import { api } from '../lib/client';
import { NuvemShippingCarrier, NuvemShippingOption } from './types';

export const shippingApi = (options: NuvemApiClient) => {
	const apiClient = api.client(options);

	const addShippingCarrier = async (data: NuvemShippingCarrier) =>
		apiClient<NuvemShippingCarrier>('/shipping_carriers', {
			method: 'POST',
			body: JSON.stringify(data),
		});

	const addShippingOption = async (shippingId: number, data: NuvemShippingOption) =>
		apiClient<NuvemShippingOption>(`/shipping_carriers/${shippingId}/options`, {
			method: 'POST',
			body: JSON.stringify(data),
		});

	return {
		addShippingCarrier,
		addShippingOption,
	};
};
