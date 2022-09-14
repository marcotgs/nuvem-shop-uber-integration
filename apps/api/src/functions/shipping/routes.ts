import { Router } from 'express';

const shippingRouter = Router();

shippingRouter.post('/estimate', require('./estimate').default);

export default shippingRouter;
