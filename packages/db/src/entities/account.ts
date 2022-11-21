import { addAccount, findAccountByStoreId, DBAccount } from '../collections/accounts';

const get = async (storeId: string) => {
	return await findAccountByStoreId(storeId);
};

const data = async (storeId: string) => {
	const accountRef = await findAccountByStoreId(storeId);
	const accountDoc = await accountRef.get();
	return accountDoc.data() as DBAccount;
};

const add = async (account: DBAccount) => {
	return addAccount(account);
};

const update = async (account: DBAccount) => {
	let accountDoc = await get(account.storeId);

	if (!accountDoc?.id) {
		console.warn(`[WARN]: Account with store Id ${account.storeId} was not found, adding...`);
		accountDoc = await add(account);
	} else {
		accountDoc.update({ ...account });
	}
};

export const account = { get, data, add, update };
