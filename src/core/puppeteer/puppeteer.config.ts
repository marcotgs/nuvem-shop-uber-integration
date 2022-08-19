import puppeteer, { Browser, Page } from 'puppeteer';

export interface PuppeteerConnection {
	page?: Page;
	browser?: Browser;
}

const PUPPETEER_OPTIONS = {
	headless: true,
	args: ['--no-sandbox'],
};

const initPuppeteer = () => {
	const connectionData: PuppeteerConnection = {};

	return {
		open: async (): Promise<PuppeteerConnection> => {
			connectionData.browser = await puppeteer.launch(PUPPETEER_OPTIONS);
			connectionData.page = (await connectionData.browser.pages())[0];
			await connectionData.page.setRequestInterception(true);
			return connectionData;
		},

		close: async (): Promise<void> => {
			const { browser } = connectionData;
			await browser.close();
		},
	};
};

export const connection = initPuppeteer();
