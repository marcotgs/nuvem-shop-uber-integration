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

export const findAccountByUserId = async (userId: string) => {
	const {
		docs: [doc],
	} = await getCollectionRef().where('userId', '==', userId).get();

	return doc?.ref;
};
