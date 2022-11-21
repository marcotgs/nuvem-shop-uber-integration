import { NuvemCartItems } from '../order/types';

export interface NuvemShippingCarrier {
	name: string;
	callback_url: string;
	types: string;
	active?: boolean;
}

export interface NuvemShippingOption {
	name: string;
	code: string;
	additional_days: number;
	additional_cost: number;
	allow_free_shipping: boolean;
	active?: boolean;
}

export interface NuvemShippingAddress {
	address?: string;
	number?: string;
	floor?: string;
	locality?: string;
	city?: string;
	province?: string;
	country?: string;
	postal_code?: string;
	phone?: string;
}

export interface NuvemEstimateBody {
	destination?: NuvemShippingAddress;
	origin?: NuvemShippingAddress;
	items?: NuvemCartItems[];
}
