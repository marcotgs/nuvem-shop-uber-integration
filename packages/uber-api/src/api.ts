import { fetchUberApi, locale } from './client';
import { UberAddress, UberSuggestions, UberEstimates } from './types';

export const getSuggestedAddress = async (address: string, type: UberAddress) => {
	const response = await fetchUberApi<UberSuggestions>('loadFESuggestions', {
		type,
		q: address,
	});
	return response.data?.candidates[0]?.id as string;
};

export const getRidesEstimates = async (pickupPlaceId: string, destinationPlaceId: string) => {
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
};
