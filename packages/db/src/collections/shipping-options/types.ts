export interface DBShippingOption {
	id: number;
	name: string;
	code: string;
	additionalDays?: number;
	additionalCost?: number;
	allowFreeShipping?: boolean;
	active?: boolean;
}
