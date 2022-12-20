import type { NextApiRequest, NextApiResponse } from 'next';
import { uber, UberAddress } from '@nuvemshop-uber/uber-api';
import { NuvemEstimateBody } from '@nuvemshop-uber/nuvem-api';
import { allowedCities, getShippingRates } from '@core/lib/estimate-rules';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { destination, origin, items } = req.body as NuvemEstimateBody;

		const [pickupPlaceId, destinationPlaceId] = await Promise.all([
			uber.getSuggestedAddress(`${origin?.address}, ${origin?.number}`, UberAddress.pickup),
			uber.getSuggestedAddress(
				destination?.postal_code?.replace(/^(\d{5})(\d{3})$/, '$1-$2') as string,
				UberAddress.destination,
			),
		]);

		const estimates = await uber.getRidesEstimates(pickupPlaceId, destinationPlaceId);

		const total = items?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

		if (allowedCities.includes(destination?.city as string)) {
			return res
				.status(200)
				.json({ rates: await getShippingRates(total, Number(estimates?.flashMoto)) });
		}

		return res.status(200).json({ rates: [] });
	} catch (error: any) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
