import type { NextApiRequest, NextApiResponse } from 'next';
import { uber, UberAddress } from '@nuvemshop-uber/uber-api';
import { NuvemEstimateBody } from '@nuvemshop-uber/nuvem-api';

const allowCitiesDescount = ['Belo Horizonte', 'Santa Luzia', 'Contagem'];
const allowCitiesDescount2 = [
	'Ribeirão das Neves',
	'Nova Lima',
	'Betim',
	'Sabará',
	'Vespasiano',
	'Ibirité',
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { destination, origin, items } = req.body as NuvemEstimateBody;

		console.log('Estimate request', destination);

		const [pickupPlaceId, destinationPlaceId] = await Promise.all([
			uber.getSuggestedAddress(`${origin?.address}, ${origin?.number}`, UberAddress.pickup),
			uber.getSuggestedAddress(
				destination?.postal_code?.replace(/^(\d{5})(\d{3})$/, '$1-$2') as string,
				UberAddress.destination,
			),
		]);

		const estimates = await uber.getRidesEstimates(pickupPlaceId, destinationPlaceId);

		const total = items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

		let price = Number(estimates?.flashMoto);
		let priceMerchant = null;
		let name = 'Motoboy Rapidão';

		if (price < 10) {
			price = 0;
			priceMerchant = Number(estimates?.flashMoto);
			name = 'Motoboy Rapidão';
		}

		if (
			(total > 100 && allowCitiesDescount.includes(destination?.city as string)) ||
			(total > 150 && allowCitiesDescount2.includes(destination?.city as string))
		) {
			price = price / 2;
			name = 'Motoboy Rapidão - 50% de desconto';
		}

		console.log('Estimates', total, items, price, name);

		const rates = [];

		if ([...allowCitiesDescount, ...allowCitiesDescount2].includes(destination?.city as string)) {
			rates.push({
				name,
				price,
				...(priceMerchant && { priceMerchant }),
				code: 'uber',
				currency: 'BRL',
				type: 'ship',
				reference: 'ref123',
			});
		}

		res.status(200).json({ rates });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
