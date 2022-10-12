import { addAccount, findAccountByUserId, DBAccount } from '../collections/accounts';

const get = async (userId: string) => {
	return await findAccountByUserId(userId);
};

const add = async (account: DBAccount) => {
	return addAccount(account);
};

const update = async (account: DBAccount) => {
	let accountDoc = await get(account.userId);

	if (!accountDoc?.id) {
		console.warn(`[WARN]: Account with user Id ${account.userId} was not found, adding...`);
		accountDoc = await add(account);
	} else {
		accountDoc.update({ ...account });
	}
};

export const account = { get, add, update };
