import fetch from 'node-fetch';
import { UberResponse, UberAddress, UberSuggestions, UberEstimates } from './types';

export const getUberInstance = () => {
	const locale = 'pt-BR';
	const fetchUberApi = async <T>(path: string, body: object): Promise<UberResponse<T>> => {
		const res = await fetch(`https://www.uber.com/api/${path}?localeCode=${locale}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-csrf-token': 'x',
			},
			body: JSON.stringify({
				...body,
				locale,
			}),
		});

		return res.json() as UberResponse<T>;
	};

	return {
		getSuggestedAddress: async (address: string, type: UberAddress) => {
			const response = await fetchUberApi<UberSuggestions>('loadFESuggestions', {
				type,
				q: address,
			});
			return response.data?.candidates[0]?.id as string;
		},
		getRidesEstimates: async (pickupPlaceId: string, destinationPlaceId: string) => {
			const response = await fetchUberApi<UberEstimates>('loadFEEstimates', {
				origin: {
					id: pickupPlaceId,
					provider: 'google_places',
					locale,
				},
				destination: {
					id: destinationPlaceId,
					provider: 'google_places',
					locale,
				},
			});
			return response.data?.prices.reduce((estimates, ride) => {
				return {
					...estimates,
					[ride.vehicleViewDisplayName]: ride.total,
				};
			}, {});
		},
	};
};

export const uber = getUberInstance();
