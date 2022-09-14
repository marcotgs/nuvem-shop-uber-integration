import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/shipping', require('functions/shipping/routes').default);
app.use('/auth', require('functions/auth/routes').default);

app.listen(port, () => {
	console.log(`Functions server listening on port ${port}`);
});
