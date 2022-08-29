import express from 'express';
import { router } from './functions/price-estimate';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/estimate', router);

app.listen(port, () => {
	console.log(`Functions server listening on port ${port}`);
});
