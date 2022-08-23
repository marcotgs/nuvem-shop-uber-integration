import { connection } from '@core/puppeteer';
import { Page } from 'puppeteer';

enum UberAddress {
	pickup = 'pickup',
	destination = 'destination',
}

export const getUberInstance = () => {
	const { open } = connection;
	let page: Page;

	const enterAddress = async (address: string, type: UberAddress) => {
		const $input = await page.$(`input[name='${type}']`);
		await $input?.type(address);
		await page.waitForXPath('//*[contains(@id,"suggestions-listbox")]');
		await $input?.press('Enter');
	};

	return {
		calculatePriceEstimate: async (destination: string) => {
			page = (await open()).page as Page;
			await page.goto('https://www.uber.com/global/pt-br/price-estimate', {
				waitUntil: 'networkidle0',
			});

			// if (!process.env.UBER_PICKUP_ADDRESS) {
			// 	console.error('UBER_PICKUP_ADDRESS is not set');
			// 	return;
			// }

			await enterAddress('Rua Ester de Lima, 104', UberAddress.pickup);
			await enterAddress(destination, UberAddress.destination);

			const test = await page.waitForResponse(
				'https://www.uber.com/api/loadFEEstimates?localeCode=pt-BR',
			);
			console.log(await test.json());

			// page.close();
		},
	};
};

export const uber = getUberInstance();
