import { initFirestore } from '../../init';
import { DBAccount } from './types';

const firestore = initFirestore();

const getCollectionRef = () => {
	const collectionName = 'accounts';
	return firestore.collection(collectionName);
};

export const addAccount = async (account: DBAccount) => {
	return await getCollectionRef().add(account);
};

export const findAccountByStoreId = async (storeId: string) => {
	const {
		docs: [doc],
	} = await getCollectionRef().where('storeId', '==', storeId).get();

	return doc?.ref;
};
