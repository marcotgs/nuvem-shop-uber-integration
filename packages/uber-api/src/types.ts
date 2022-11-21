export interface UberSuggestions {
	candidates: Array<{ id: string }>;
}

export interface UberEstimates {
	prices: Array<{ total: string; vehicleViewDisplayName: string }>;
}

export enum UberAddress {
	pickup = 'pickup',
	destination = 'destination',
}

export interface UberResponse<T> {
	data?: T;
}

export interface UberPrices {
	flashMoto: string;
	moto: string;
	uberX: string;
	comfort: string;
	black: string;
}
