import express from 'express';
import router from './functions/priceEstimate';

const app = express();
const port = 3000;

app.use('/estimate', router);

app.listen(port, () => {
	console.log(`Functions server listening on port ${port}`);
});
