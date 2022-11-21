export interface NuvemCartItems {
	name?: string;
	sku: string;
	quantity: number;
	free_shipping?: boolean;
	grams?: number;
	price: number;
	dimensions: {
		width?: number;
		height?: number;
		depth?: number;
	};
}
