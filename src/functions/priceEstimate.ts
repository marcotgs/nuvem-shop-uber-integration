// import { uber } from '@core/uber/uber';
import { Router, Request, Response } from 'express';

const router = Router();

// interface PriceEstimation {
// 	destination: string;
// }

export const priceEstimate = async (req: Request, res: Response) => {
	// const { destination } = req.body as PriceEstimation;
	// console.log(destination);
	// await uber.calculatePriceEstimate(destination);
	res.send('Hello, World');
};

router.post('/', priceEstimate);

export default router;
