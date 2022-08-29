import { Router, Request, Response } from 'express';
import { uber, UberAddress } from '@core/uber';

const router = Router();

interface PriceEstimation {
	destination: string;
}

const priceEstimate = async (req: Request, res: Response) => {
	const { destination } = req.body as PriceEstimation;

	const [pickupPlaceId, destinationPlaceId] = await Promise.all([
		uber.getSuggestedAddress('Rua Ester de Lima, 104', UberAddress.pickup),
		uber.getSuggestedAddress(destination, UberAddress.destination),
	]);
	await uber.getRidesEstimates(pickupPlaceId, destinationPlaceId);

	res.send(await uber.getRidesEstimates(pickupPlaceId, destinationPlaceId));
};

router.post('/', priceEstimate);

export { router };
export default priceEstimate;
