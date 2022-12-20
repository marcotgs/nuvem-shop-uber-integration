// TODO: fetch this info the database and will be configurable by admin application

enum ShippingOptions {
	FAST,
	NORMAL,
}

const shippingOptions = {
	[ShippingOptions.FAST]: 'Motoboy Rapidão - entrega em até 1h:30',
	[ShippingOptions.NORMAL]: 'Motoboy baratão  - entrega em até 1 dia, 12:00 as 18:00',
};

const baseRate = {
	code: 'uber',
	currency: 'BRL',
	type: 'ship',
};

const getFastShippingRate = async (total: number, estimatedPrice: number) => {
	const name = shippingOptions[ShippingOptions.FAST];

	if (
		(total >= 160 && estimatedPrice >= 50) ||
		(total >= 130 && estimatedPrice >= 30) ||
		(total >= 100 && estimatedPrice <= 30)
	) {
		return {
			...baseRate,
			name,
			price: estimatedPrice / 2,
			priceMerchant: estimatedPrice,
		};
	}

	if (total >= 200 && estimatedPrice <= 40) {
		return {
			...baseRate,
			name,
			price: estimatedPrice - estimatedPrice * (70 / 100),
			priceMerchant: estimatedPrice,
		};
	}

	return {
		...baseRate,
		name,
		price: estimatedPrice,
	};
};

const getNormalShippingRate = async (estimatedPrice: number) => {
	return {
		...baseRate,
		name: shippingOptions[ShippingOptions.NORMAL],
		price: estimatedPrice - estimatedPrice * (40 / 100),
	};
};

export const getShippingRates = async (total: number, estimatedPrice: number) => {
	const fastShippingRate = await getFastShippingRate(total, estimatedPrice);
	const normalShippingRate = await getNormalShippingRate(estimatedPrice);

	return [fastShippingRate, normalShippingRate];
};

export const allowedCities = [
	'Belo Horizonte',
	'Santa Luzia',
	'Contagem',
	'Ribeirão das Neves',
	'Nova Lima',
	'Betim',
	'Sabará',
	'Vespasiano',
	'Ibirité',
];
