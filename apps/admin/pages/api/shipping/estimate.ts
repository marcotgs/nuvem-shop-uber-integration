import { Request, Response } from 'express';
import { uber, UberAddress } from '@core/uber';

interface PriceEstimation {
	destination: string;
}

export default async (req: Request, res: Response) => {
	console.log('aqui')
	const { destination } = req.body as PriceEstimation;

	const [pickupPlaceId, destinationPlaceId] = await Promise.all([
		uber.getSuggestedAddress('Rua Ester de Lima, 104', UberAddress.pickup),
		uber.getSuggestedAddress(destination, UberAddress.destination),
	]);
	await uber.getRidesEstimates(pickupPlaceId, destinationPlaceId);

	res.send(await uber.getRidesEstimates(pickupPlaceId, destinationPlaceId));
};
